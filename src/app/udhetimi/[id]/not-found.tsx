import Link from "next/link";

export default function UdhetimiNukUGjet() {
  return (
    <main className="site-shell subpage">
      <header className="topbar">
        <Link className="wordmark" href="/">
          <span className="wordmark-mark">R</span>
          <span>RideShare</span>
        </Link>
        <span className="topbar-location">ADRESË E PAVLEFSHME</span>
      </header>
      <section className="state-panel">
        <p className="eyebrow"><span>404</span> · RRUGË E PANJOHUR</p>
        <p className="not-found-code">UDHËTIMI NUK U GJET</p>
        <h1>Ky udhëtim s&apos;është në hartë.</h1>
        <p>Kjo adresë nuk përputhet me asnjë udhëtim në listën tonë.</p>
        <Link className="primary-action" href="/">Kthehu te lista <span aria-hidden="true">↗</span></Link>
      </section>
      <footer className="page-footer"><span>RideShare <span className="footer-separator">/</span> Demo mësimore</span><span>PA REZERVIM REAL</span></footer>
    </main>
  );
}