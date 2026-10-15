import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import Hyrja from "@/components/Hyrja";
import { profiliIm } from "@/lib/lejet";
import { ruajOren } from "./actions";

const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.",
  fushe: "Shkruaj një orë të vlefshme. ID-ja duhet të jetë 1, 2 ose 3.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listën dhe detajet.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

type PanelProps = {
  searchParams: Promise<{ m?: string | string[] }>;
};

export default function Panel({ searchParams }: PanelProps) {
  return (
    <Suspense fallback={<main className="site-shell subpage" aria-busy="true">Po hapet paneli…</main>}>
      <PanelContent searchParams={searchParams} />
    </Suspense>
  );
}

async function PanelContent({ searchParams }: PanelProps) {
  await connection();
  const params = await searchParams;
  const mesazh = Array.isArray(params.m) ? params.m[0] : params.m;

  let profil;
  try {
    profil = await profiliIm();
  } catch {
    return (
      <main className="site-shell subpage">
        <header className="topbar">
          <Link className="wordmark" href="/">
            <span className="wordmark-mark">R</span>
            <span>RideShare</span>
          </Link>
          <Link className="panel-nav-link" href="/">Udhëtimet</Link>
        </header>
        <section className="state-panel" role="alert">
          <h1>Paneli im</h1>
          <p>{mesazhet.databaza}</p>
          <Link className="primary-action" href="/panel">Provo përsëri</Link>
        </section>
      </main>
    );
  }

  const oauthConfigured = Boolean(
    process.env.GITHUB_ID && process.env.GITHUB_SECRET && process.env.NEXTAUTH_SECRET,
  );

  return (
    <main className="site-shell subpage">
      <header className="topbar">
        <Link className="wordmark" href="/">
          <span className="wordmark-mark">R</span>
          <span>RideShare</span>
        </Link>
        <Link className="panel-nav-link" href="/">Udhëtimet</Link>
      </header>
      <section className="state-panel panel-content" aria-labelledby="panel-title">
        <p className="eyebrow"><span>JAVA 5</span> · HYRJA DHE LEJET</p>
        <h1 id="panel-title">Paneli im</h1>
        {mesazh && mesazhet[mesazh] && <p role="status">{mesazhet[mesazh]}</p>}
        {profil ? (
          <>
            <p>Përshëndetje, {profil.emri}. Roli yt është <strong>{profil.roli}</strong>.</p>
            <Hyrja brenda oauthConfigured={oauthConfigured} />
            {profil.roli === "shofer" ? (
              <form className="panel-form" action={ruajOren}>
                <h2>Ndrysho orën e udhëtimit tënd</h2>
                <input type="hidden" name="id" value="2" />
                <label htmlFor="ora">Ora e re për udhëtimin 2</label>
                <input id="ora" name="ora" type="time" defaultValue="08:15" required />
                <button className="primary-action" type="submit">Ruaj orën</button>
                <p>Pronësia verifikohet në server; ndryshimi i formularit nuk jep leje.</p>
              </form>
            ) : (
              <p>Si udhëtar mund të shohësh udhëtimet, por nuk mund të ndryshosh orën e shoferit.</p>
            )}
          </>
        ) : (
          <>
            <p>Hyr me GitHub për të parë profilin tënd. Hyrja nuk të jep automatikisht rolin shofer.</p>
            <Hyrja brenda={false} oauthConfigured={oauthConfigured} />
          </>
        )}
        <p>Kërkesa për vend mbetet simulim; nuk ruhet rezervim real.</p>
      </section>
    </main>
  );
}