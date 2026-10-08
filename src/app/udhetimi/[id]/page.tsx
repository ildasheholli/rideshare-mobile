import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin, udhetimet } from "@/lib/udhetimet";

export function generateStaticParams() {
  return udhetimet.map(({ id }) => ({ id }));
}

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
  const udhetim = gjejUdhetimin(id);

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
          <div className="detail-item"><dt>Vende të lira</dt><dd>{udhetim.vende}</dd></div>
        </dl>
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
        <p className="detail-footnote">Kërkesa është vetëm demonstrim. Nuk dërgohet asgjë te shoferi.</p>
      </section>
      <footer className="page-footer"><span>RideShare <span className="footer-separator">/</span> Demo mësimore</span><span>PA REZERVIM REAL</span></footer>
    </main>
  );
}