"use client";

import { signIn, signOut } from "next-auth/react";

export default function Hyrja({
  brenda,
  oauthConfigured,
}: {
  brenda: boolean;
  oauthConfigured: boolean;
}) {
  if (!oauthConfigured) {
    return (
      <p className="auth-notice" role="alert">
        Hyrja me GitHub nuk është konfiguruar ende. Shtoni GITHUB_ID, GITHUB_SECRET
        dhe NEXTAUTH_SECRET në mjedisin lokal dhe Vercel.
      </p>
    );
  }

  return brenda ? (
    <button className="primary-action" onClick={() => signOut({ callbackUrl: "/panel" })}>
      Dil
    </button>
  ) : (
    <button className="primary-action" onClick={() => signIn("github", { callbackUrl: "/panel" })}>
      Hyr me GitHub
    </button>
  );
}