import Link from "next/link";
import { Vendtakimi } from "@/components/Vendtakimi";

export default function Java08Test() {
  return (
    <main className="site-shell subpage">
      <header className="topbar">
        <Link className="wordmark" href="/">
          <span className="wordmark-mark">R</span>
          <span>RideShare</span>
        </Link>
        <span className="topbar-location">PROVË LOKALE · JAVA 8</span>
      </header>
      <Link className="back-link" href="/">← <span>Kthehu te nisjet</span></Link>
      <section className="detail-heading">
        <p className="eyebrow"><span>ARTA</span> · UDHËTIMI I DRITONIT</p>
        <h1>Ferizaj<br /><span>→</span> AAB</h1>
      </section>
      <section className="detail-panel" aria-label="Prova e vendtakimit">
        <dl className="detail-grid">
          <div className="detail-item"><dt>Nisja</dt><dd>Ferizaj</dd></div>
          <div className="detail-item"><dt>Ora</dt><dd>08:15</dd></div>
          <div className="detail-item"><dt>Vendtakimi i shoferit</dt><dd>Te biblioteka</dd></div>
          <div className="detail-item"><dt>Prova</dt><dd>Të dhëna fiktive</dd></div>
        </dl>
        <Vendtakimi />
        <p className="detail-footnote">
          Kjo faqe përdor të dhëna lokale. Nuk kërkon hyrje, databazë ose shërbim të jashtëm.
        </p>
      </section>
      <footer className="page-footer">
        <span>RideShare <span className="footer-separator">/</span> Java 8</span>
        <span>PA REZERVIM REAL</span>
      </footer>
    </main>
  );
}
