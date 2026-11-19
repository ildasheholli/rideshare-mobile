import { connection } from "next/server";
import { getSql } from "@/lib/db";
import { profiliIm } from "@/lib/lejet";
import type { StatusKerkese, UdhPerGjendjen } from "@/lib/gjendja-udhetimit";

type RouteProps = {
  params: Promise<{ id: string }>;
};

const noStoreHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  Vary: "Cookie",
};

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: noStoreHeaders });
}

export async function GET(_request: Request, { params }: RouteProps) {
  await connection();
  const { id } = await params;
  if (!/^[\w-]{1,80}$/.test(id)) return json({ error: "ID e pavlefshme." }, 400);

  try {
    const profil = await profiliIm();
    if (!profil) return json({ error: "Hyr në llogari për të parë gjendjen." }, 401);

    const sql = getSql();
    const udhetimet = await sql`
      SELECT id, nisja, destinacioni, ora, vende, shofer_id
      FROM udhetimet
      WHERE id = ${id}
    `;
    if (udhetimet.length === 0) return json({ error: "Udhëtimi nuk u gjet." }, 404);

    const row = udhetimet[0];
    const udhetim: UdhPerGjendjen = {
      id: String(row.id),
      nisja: String(row.nisja),
      destinacioni: String(row.destinacioni),
      ora: String(row.ora),
      vende: Number(row.vende),
    };

    if (profil.roli === "shofer") {
      if (row.shofer_id !== profil.id) {
        return json({ error: "Nuk ke leje për të parë kërkesat e këtij udhëtimi." }, 403);
      }

      const kerkesat = await sql`
        SELECT kerkesa.id::text AS id, kerkesa.status, profile.emri AS udhetari
        FROM udhetim_kerkesat AS kerkesa
        JOIN profilet AS profile ON profile.github_id = kerkesa.udhetar_id
        WHERE kerkesa.udhetim_id = ${id}
        ORDER BY kerkesa.created_at, kerkesa.id
      `;

      return json({
        roli: "shofer",
        udhetim,
        kerkesat: kerkesat.map((kerkesa) => ({
          id: String(kerkesa.id),
          udhetari: String(kerkesa.udhetari),
          status: (kerkesa.status === "accepted" ? "accepted" : "pending") as StatusKerkese,
        })),
      });
    }

    const kerkesat = await sql`
      SELECT id::text AS id, status
      FROM udhetim_kerkesat
      WHERE udhetim_id = ${id}
        AND udhetar_id = ${profil.id}
    `;
    const kerkesa = kerkesat[0];

    return json({
      roli: "udhetar",
      udhetim,
      kerkesa: kerkesa
        ? {
            id: String(kerkesa.id),
            status: (kerkesa.status === "accepted" ? "accepted" : "pending") as StatusKerkese,
          }
        : null,
    });
  } catch (error) {
    console.error("Gjendja e udhëtimit nuk mund të lexohej.", error);
    return json({ error: "Gjendja nuk mund të lexohet tani." }, 503);
  }
}
