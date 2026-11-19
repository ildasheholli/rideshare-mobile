import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GjendjaUdhetimit } from "@/components/GjendjaUdhetimit";
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
          <span className="topbar-location">KËRKESË · JAVA 10</span>
        </header>
        <section className="state-panel" role="alert">
          <h1>RideShare</h1>
          <p>
            {process.env.DATABASE_URL || process.env.STORAGE_POSTGRES_URL
              ? "Nuk u lidhëm me databazën. Kontrollo lidhjen dhe ekzekuto schema.sql, schema-java05.sql dhe schema-java10.sql në Neon."
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
        <span className="topbar-location">KËRKESË · JAVA 10</span>
      </header>
      <Link className="back-link" href={`/udhetimi/${id}`}>← <span>Kthehu te detajet</span></Link>
      <section className="state-panel live-request-page" aria-labelledby="request-title">
        <p className="eyebrow"><span>JAVA 10</span> · KËRKESË E RUAJTUR</p>
        <h1 id="request-title">Kërkesa për udhëtim</h1>
        <p>{udhetim.nisja} → {udhetim.destinacioni} · nisja {udhetim.ora}</p>
        <GjendjaUdhetimit
          udhetimFillestar={{
            id: udhetim.id,
            nisja: udhetim.nisja,
            destinacioni: udhetim.destinacioni,
            ora: udhetim.ora,
            vende: udhetim.vende,
          }}
        />
      </section>
      <footer className="page-footer"><span>RideShare <span className="footer-separator">/</span> Demo mësimore</span><span>PA REZERVIM REAL</span></footer>
    </main>
  );
}