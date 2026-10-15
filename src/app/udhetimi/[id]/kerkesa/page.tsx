import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

type KerkesaProps = {
  params: Promise<{ id: string }>;
};

export default function Kerkesa({ params }: KerkesaProps) {
  return (
    <Suspense fallback={<main className="site-shell subpage" aria-busy="true">Po përpunohet kërkesa…</main>}>
      <KerkesaContent params={params} />
    </Suspense>
  );
}

async function KerkesaContent({ params }: KerkesaProps) {
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
          <span className="topbar-location">KËRKESË DEMO</span>
        </header>
        <section className="state-panel" role="alert">
          <h1>RideShare</h1>
          <p>
            {process.env.DATABASE_URL
              ? "Nuk u lidhëm me databazën. Kontrollo DATABASE_URL dhe ekzekuto schema.sql në Neon."
              : "Mungon DATABASE_URL. Vendos lidhjen e Neon në .env.local dhe rinis serverin."}
          </p>
          <Link className="primary-action" href={`/udhetimi/${id}`}>Kthehu te detajet</Link>
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
        <span className="topbar-location">KËRKESË DEMO</span>
      </header>
      <Link className="back-link" href={`/udhetimi/${id}`}>← <span>Kthehu te detajet</span></Link>
      {udhetim.vende > 0 ? (
        <section className="state-panel" aria-labelledby="request-title">
          <p className="eyebrow"><span>HAPI 03</span> · KËRKESË E SIMULUAR</p>
          <div className="status-mark" aria-hidden="true">…</div>
          <h1 id="request-title">Simulim:<br />Në pritje</h1>
          <p>Kërkesa për udhëtimin nga {udhetim.nisja} nuk është dërguar te shoferi.</p>
          <div className="request-summary"><span>{udhetim.nisja} → {udhetim.destinacioni} · {udhetim.ora}</span><span className="request-status">Në pritje</span></div>
          <p>Asgjë nuk ruhet apo dërgohet. Konfirmimet reale nuk janë pjesë e këtij demonstrimi.</p>
          <Link className="primary-action" href={`/udhetimi/${id}`}>Kthehu te udhëtimi</Link>
        </section>
      ) : (
        <section className="state-panel">
          <p className="eyebrow"><span>STATUSI</span> · UDHËTIMI I PLOTË</p>
          <h1>Nuk ka vende të lira.</h1>
          <p>Zgjidh një nisje tjetër nga lista e udhëtimeve.</p>
          <Link className="primary-action" href="/">Kthehu te lista</Link>
        </section>
      )}
      <footer className="page-footer"><span>RideShare <span className="footer-separator">/</span> Demo mësimore</span><span>PA REZERVIM REAL</span></footer>
    </main>
  );
}