"use server";

import { revalidatePath } from "next/cache";
import { getSql } from "@/lib/db";
import { profiliIm } from "@/lib/lejet";

type VeprimiResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function eshteIDUdhetimi(id: unknown): id is string {
  return typeof id === "string" && /^[\w-]{1,80}$/.test(id);
}

function rifreskoFaqet(id: string) {
  revalidatePath("/");
  revalidatePath(`/udhetimi/${id}`);
  revalidatePath(`/udhetimi/${id}/kerkesa`);
}

export async function dergoKerkesen(udhetimId: string): Promise<VeprimiResult> {
  if (!eshteIDUdhetimi(udhetimId)) {
    return { ok: false, message: "Udhëtimi nuk u gjet." };
  }

  let profil;
  try {
    profil = await profiliIm();
  } catch (error) {
    console.error("Sesioni i udhëtarit nuk mund të verifikohej.", error);
    return { ok: false, message: "Nuk u lidhëm me serverin. Provo përsëri." };
  }

  if (!profil) return { ok: false, message: "Hyr në llogari për të kërkuar një vend." };
  if (profil.roli !== "udhetar") {
    return { ok: false, message: "Vetëm udhëtari mund të dërgojë kërkesën." };
  }

  try {
    const sql = getSql();
    const inserted = await sql`
      INSERT INTO udhetim_kerkesat (udhetim_id, udhetar_id)
      SELECT id, ${profil.id}
      FROM udhetimet
      WHERE id = ${udhetimId} AND vende > 0
      ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING
      RETURNING id::text AS id
    `;

    if (inserted.length > 0) {
      rifreskoFaqet(udhetimId);
      return { ok: true, message: "Kërkesa u dërgua." };
    }

    const existing = await sql`
      SELECT kerkesa.id::text AS id, kerkesa.status
      FROM udhetim_kerkesat AS kerkesa
      WHERE kerkesa.udhetim_id = ${udhetimId}
        AND kerkesa.udhetar_id = ${profil.id}
    `;

    if (existing.length > 0) {
      const status = existing[0].status === "accepted" ? "U pranua" : "Në pritje";
      return { ok: true, message: `Kërkesa ekzistuese: ${status}.` };
    }

    const udhetimi = await sql`
      SELECT vende FROM udhetimet WHERE id = ${udhetimId}
    `;
    if (udhetimi.length === 0) return { ok: false, message: "Udhëtimi nuk u gjet." };
    if (Number(udhetimi[0].vende) <= 0) {
      return { ok: false, message: "Nuk ka vende të lira." };
    }

    return { ok: false, message: "Kërkesa nuk u ruajt. Rifresko dhe provo përsëri." };
  } catch (error) {
    console.error("Kërkesa e udhëtimit nuk mund të ruhej.", error);
    return { ok: false, message: "Nuk u ruajt. Provo përsëri." };
  }
}

export async function pranoKerkesen(kerkesaId: string): Promise<VeprimiResult> {
  if (typeof kerkesaId !== "string" || !/^[1-9]\d{0,18}$/.test(kerkesaId)) {
    return { ok: false, message: "Kërkesa nuk u gjet." };
  }

  let profil;
  try {
    profil = await profiliIm();
  } catch (error) {
    console.error("Sesioni i shoferit nuk mund të verifikohej.", error);
    return { ok: false, message: "Nuk u lidhëm me serverin. Provo përsëri." };
  }

  if (!profil) return { ok: false, message: "Hyr në llogari për të pranuar kërkesën." };
  if (profil.roli !== "shofer") {
    return { ok: false, message: "Vetëm shoferi mund të pranojë kërkesën." };
  }

  try {
    const sql = getSql();
    const results = await sql`
      SELECT rezultati, vende
      FROM prano_udhetim_kerkesen(${kerkesaId}::bigint, ${profil.id})
    `;
    const result = results[0]?.rezultati;

    if (result === "accepted") {
      rifreskoFaqet("/");
      return { ok: true, message: "Pranimi u ruajt." };
    }
    if (result === "already_accepted") {
      rifreskoFaqet("/");
      return { ok: true, message: "Kërkesa ishte pranuar tashmë." };
    }
    if (result === "no_seats") return { ok: false, message: "Nuk ka vende të lira." };
    return { ok: false, message: "Kërkesa nuk u gjet ose nuk i përket udhëtimit tënd." };
  } catch (error) {
    console.error("Pranimi i kërkesës nuk mund të ruhej.", error);
    return { ok: false, message: "Pranimi nuk u ruajt. Provo përsëri." };
  }
}
