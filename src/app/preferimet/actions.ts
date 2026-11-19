"use server";

import { revalidatePath } from "next/cache";
import { isGitHubOAuthConfigured } from "@/lib/auth";
import { profiliIm } from "@/lib/lejet";
import { shtoPreferimin } from "@/lib/preferimet";

export async function ruajPreferimin(udhetimId: string) {
  if (typeof udhetimId !== "string" || !/^[\w-]{1,80}$/.test(udhetimId)) {
    return { ok: false, message: "Udhëtimi nuk u gjet. Rifresko listën." };
  }
  if (!isGitHubOAuthConfigured()) {
    return { ok: false, message: "Hyrja me GitHub nuk është konfiguruar ende." };
  }

  try {
    const profil = await profiliIm();
    if (!profil) {
      return { ok: false, message: "Hyr në llogari për të ruajtur udhëtime." };
    }

    await shtoPreferimin(profil.id, udhetimId);
  } catch (error) {
    console.error("Preferimi i udhëtimit nuk mund të ruhej.", error);
    return { ok: false, message: "Nuk u ruajt. Provo përsëri." };
  }

  revalidatePath("/");
  return { ok: true, message: "U ruajt te të preferuarat." };
}
