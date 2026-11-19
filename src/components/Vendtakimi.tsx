"use client";

import { useState } from "react";

type LocationState =
  | "idle"
  | "loading"
  | "success"
  | "denied"
  | "timeout"
  | "unavailable"
  | "error";

export function Vendtakimi() {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [gabimi, setGabimi] = useState("");
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [locationMessage, setLocationMessage] = useState("");
  const [accuracy, setAccuracy] = useState<number | null>(null);

  function konfirmoVendtakimin() {
    const vendtakimIPastruar = teksti.trim();
    if (!vendtakimIPastruar) {
      setGabimi("Shkruaj vendtakimin përpara se ta konfirmosh.");
      return;
    }

    setVendtakimi(vendtakimIPastruar);
    setGabimi("");
  }

  function perdorVendndodhjen() {
    setAccuracy(null);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationState("unavailable");
      setLocationMessage("Vendndodhja nuk mbështetet. Shkruaj vendtakimin vetë.");
      return;
    }

    setLocationState("loading");
    setLocationMessage("Po kërkojmë vendndodhjen…");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setAccuracy(position.coords.accuracy);
        setLocationState("success");
        setLocationMessage("Pozicioni u mor.");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationState("denied");
          setLocationMessage("Leja u refuzua. Shkruaj vendtakimin vetë.");
        } else if (error.code === error.TIMEOUT) {
          setLocationState("timeout");
          setLocationMessage("Koha mbaroi. Provo sërish ose shkruaj vendtakimin.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationState("error");
          setLocationMessage("Pozicioni nuk është i disponueshëm. Shkruaj vendtakimin vetë.");
        } else {
          setLocationState("error");
          setLocationMessage("Leximi dështoi. Provo sërish ose shkruaj vendtakimin.");
        }
      },
      { timeout: 10000 },
    );
  }

  return (
    <section className="meeting-picker" aria-labelledby="meeting-title">
      <h2 id="meeting-title">Vendtakimi i Artës</h2>
      <p className="meeting-description">
        Zgjidhja ruhet vetëm në këtë ekran; koordinatat nuk ruhen dhe nuk dërgohen te shoferi.
      </p>
      <label htmlFor="meeting-input">Shkruaj vendtakimin</label>
      <input
        id="meeting-input"
        data-testid="meeting-input"
        type="text"
        value={teksti}
        onChange={(event) => setTeksti(event.target.value)}
      />
      <p className="meeting-error" data-testid="meeting-error" role="alert">
        {gabimi}
      </p>
      <div className="meeting-actions">
        <button
          className="primary-action"
          data-testid="confirm-meeting"
          type="button"
          onClick={konfirmoVendtakimin}
        >
          Konfirmo në telefon
        </button>
        <button
          className="secondary-action"
          data-testid="locate-me"
          type="button"
          onClick={perdorVendndodhjen}
          disabled={locationState === "loading"}
        >
          Përdor vendndodhjen time
        </button>
      </div>
      <p className="confirmed-meeting">
        Vendtakimi i konfirmuar:{" "}
        <strong data-testid="confirmed-meeting">
          {vendtakimi || "Asnjë vendtakim i konfirmuar"}
        </strong>
      </p>
      <p
        className="location-status"
        data-testid="location-status"
        data-state={locationState}
        role="status"
      >
        {locationMessage}
      </p>
      <p className="location-accuracy" data-testid="location-accuracy">
        {accuracy === null ? "" : `Saktësia: ${accuracy} m`}
      </p>
    </section>
  );
}
