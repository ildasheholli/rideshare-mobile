import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GjendjaUdhetimit } from "@/components/GjendjaUdhetimit";
import { Vendtakimi } from "@/components/Vendtakimi";
import { gjejUdhetimin } from "@/lib/udhetimet";

type DetajetProps = {
  params: Promise<{ id: string }>;
};

export default function Detajet({ params }: DetajetProps) {
  return (
    <Suspense fallback={<main className="site-shell subpage" aria-busy="true">Po hapen detajet…</main>}>
      <DetajetContent params={params} />
    </Suspense>
  );
}

async function DetajetContent({ params }: DetajetProps) {
  const { id } = await params;
  let udhetim;
  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main className="site-shell subpage">
        <header className="topbar">
          <Link className="wordmark" href="/">
            <span className="wordmark-mark">R</span>
            <span>RideShare</span>
          </Link>
          <span className="topbar-location">DETAJET E UDHËTIMIT</span>
        </header>
        <section className="state-panel" role="alert">
          <h1>RideShare</h1>
          <p>
            {process.env.DATABASE_URL || process.env.STORAGE_POSTGRES_URL
              ? "Nuk u lidhëm me databazën. Kontrollo lidhjen dhe ekzekuto schema.sql, schema-java05.sql dhe schema-java10.sql në Neon."
              : "Mungon DATABASE_URL. Vendos lidhjen e Neon në .env.local dhe rinis serverin."}
          </p>
          <Link className="primary-action" href="/">Kthehu te lista</Link>
        </section>
      </main>
    );
  }

  if (!udhetim) notFound();

  return (
    <main className="site-shell subpage">
      <header className="topbar">
        <Link className="wordmark" href="/">
          <span className="wordmark-mark">R</span>
          <span>RideShare</span>
        </Link>
        <span className="topbar-location">DETAJET E UDHËTIMIT</span>
      </header>
      <Link className="back-link" href="/">← <span>Kthehu te nisjet</span></Link>
      <section className="detail-heading">
        <p className="eyebrow"><span>UDHËTIMI 0{udhetim.id}</span> · DREJT AAB</p>
        <h1>{udhetim.nisja}<br /><span>→</span> {udhetim.destinacioni}</h1>
      </section>
      <section className="detail-panel" aria-label="Detajet e udhëtimit">
        <dl className="detail-grid">
          <div className="detail-item"><dt>Nisja</dt><dd>{udhetim.nisja}</dd></div>
          <div className="detail-item"><dt>Ora</dt><dd>{udhetim.ora}</dd></div>
          <div className="detail-item"><dt>Vendtakimi</dt><dd>{udhetim.vendtakimi}</dd></div>
        </dl>
        <GjendjaUdhetimit
          lejoKerkesen={false}
          udhetimFillestar={{
            id: udhetim.id,
            nisja: udhetim.nisja,
            destinacioni: udhetim.destinacioni,
            ora: udhetim.ora,
            vende: udhetim.vende,
          }}
        />
        <Vendtakimi />
        <div className="detail-actions">
          {udhetim.vende > 0 ? (
            <Link className="primary-action" href={`/udhetimi/${id}/kerkesa`}>
              Kërko vend <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <button className="disabled-action" disabled>Nuk ka vende të lira</button>
          )}
          <Link className="secondary-action" href="/">Kthehu te lista</Link>
        </div>
        <p className="detail-footnote">Kërkesa ruhet në server; vendi konfirmohet vetëm pasi shoferi e pranon.</p>
      </section>
      <footer className="page-footer"><span>RideShare <span className="footer-separator">/</span> Demo mësimore</span><span>PA REZERVIM REAL</span></footer>
    </main>
  );
}