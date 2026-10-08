import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  const kaVende = udhetim.vende > 0;

  return (
    <article className={`trip-card${kaVende ? "" : " trip-card-full"}`}>
      <div className="trip-card-topline">
        <span className="route-index">0{udhetim.id}</span>
        <span className={`availability${kaVende ? "" : " availability-full"}`}>
          <span className="availability-dot" />
          {kaVende
            ? `${udhetim.vende} ${udhetim.vende === 1 ? "vend i lirë" : "vende të lira"}`
            : "I plotë"}
        </span>
      </div>
      <div className="trip-route">
        <div className="route-stops">
          <span className="route-origin-dot" />
          <span className="route-line" />
          <span className="route-destination-dot" />
        </div>
        <div className="route-names">
          <h2>{udhetim.nisja}</h2>
          <p>{udhetim.destinacioni}</p>
        </div>
        <p className="trip-time">
          <span>NISJA</span>
          <strong>{udhetim.ora}</strong>
        </p>
      </div>
      <div className="trip-card-footer">
        <span className="trip-destination-label">DREJT AAB · {udhetim.vendtakimi}</span>
        <Link className="card-link" href={`/udhetimi/${udhetim.id}`} aria-label={`Shiko detajet për udhëtimin nga ${udhetim.nisja}`}>
          <span>{kaVende ? "Detajet" : "Shiko"}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}