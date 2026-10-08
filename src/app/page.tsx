import Link from "next/link";
import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { udhetimet } from "@/lib/udhetimet";

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="RideShare, faqja kryesore">
          <span className="wordmark-mark">R</span>
          <span>RideShare</span>
        </Link>
        <span className="topbar-location"><span className="location-dot" /> PRISHTINË · AAB</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow"><span>01</span> UDHËTIME TË PËRBASHKËTA</p>
          <h1 id="page-title">Gjej rrugën<br />për sot<span className="title-period">.</span></h1>
          <p className="intro-copy">Nisje të zgjedhura për në AAB.<br className="desktop-break" /> Zgjidh një udhëtim dhe kontrollo hollësitë.</p>
        </div>
        <div className="intro-stamp" aria-label="Tri udhëtime të planifikuara">
          <span className="stamp-number">03</span>
          <span className="stamp-label">NISJE<br />SOT</span>
          <span className="stamp-arrow" aria-hidden="true">↘</span>
        </div>
      </section>

      <section className="departures" aria-labelledby="departures-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>01—03</span> LINJAT E DISPONUESHME</p>
            <h2 id="departures-title">Zgjidh nisjen</h2>
          </div>
          <span className="date-chip">NISJET E SOTME <span>·</span> PRISHTINË</span>
        </div>
        <div className="trip-list">
          {udhetimet.map((udhetim) => (
            <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
          ))}
        </div>
      </section>

      <footer className="page-footer">
        <span>RideShare <span className="footer-separator">/</span> Udhëtime për AAB</span>
        <span className="demo-note"><span className="demo-dot" /> DEMO · PA REZERVIM REAL</span>
      </footer>
    </main>
  );
}