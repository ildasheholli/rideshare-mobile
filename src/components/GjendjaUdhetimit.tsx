"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { dergoKerkesen, pranoKerkesen } from "@/app/udhetimi/[id]/actions";
import type { GjendjaUdhetimit as Snapshot, UdhPerGjendjen } from "@/lib/gjendja-udhetimit";

type GjendjaLidhjes = "loading" | "online" | "offline" | "login" | "forbidden" | "missing";

export function GjendjaUdhetimit({
  udhetimFillestar,
  lejoKerkesen = true,
}: {
  udhetimFillestar: UdhPerGjendjen;
  lejoKerkesen?: boolean;
}) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [lidhja, setLidhja] = useState<GjendjaLidhjes>("loading");
  const [veprimiNePritje, setVeprimiNePritje] = useState<string | null>(null);
  const [mesazhiVeprimit, setMesazhiVeprimit] = useState("");
  const refreshRef = useRef<() => void>(() => {});

  useEffect(() => {
    let disposed = false;
    let inFlight = false;
    let stopPolling = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;

    async function readState() {
      if (disposed || inFlight || stopPolling) return;
      inFlight = true;
      controller = new AbortController();

      try {
        const response = await fetch(
          `/api/udhetimet/${encodeURIComponent(udhetimFillestar.id)}/gjendja`,
          { cache: "no-store", signal: controller.signal },
        );

        if (response.status === 401) {
          stopPolling = true;
          if (!disposed) setLidhja("login");
        } else if (response.status === 403) {
          stopPolling = true;
          if (!disposed) setLidhja("forbidden");
        } else if (response.status === 404) {
          stopPolling = true;
          if (!disposed) setLidhja("missing");
        } else if (!response.ok) {
          throw new Error("Gjendja nuk u lexua.");
        } else {
          const nextSnapshot = (await response.json()) as Snapshot;
          if (!disposed) {
            setSnapshot(nextSnapshot);
            setLidhja("online");
          }
        }
      } catch {
        if (!disposed && !controller?.signal.aborted) setLidhja("offline");
      } finally {
        inFlight = false;
        if (!disposed && !stopPolling) timer = setTimeout(readState, 5000);
      }
    }

    function refreshNow() {
      if (timer) clearTimeout(timer);
      void readState();
    }

    function handleOffline() {
      if (!disposed) setLidhja("offline");
    }

    refreshRef.current = refreshNow;
    window.addEventListener("online", refreshNow);
    window.addEventListener("offline", handleOffline);
    void readState();

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      controller?.abort();
      window.removeEventListener("online", refreshNow);
      window.removeEventListener("offline", handleOffline);
      refreshRef.current = () => {};
    };
  }, [udhetimFillestar.id]);

  async function dergoKerkese() {
    if (lidhja !== "online" || snapshot?.roli !== "udhetar" || veprimiNePritje) return;
    setVeprimiNePritje("request");
    setMesazhiVeprimit("");
    try {
      const result = await dergoKerkesen(udhetimFillestar.id);
      setMesazhiVeprimit(result.message);
      if (result.ok) refreshRef.current();
    } catch {
      setMesazhiVeprimit("Kërkesa nuk u dërgua. Provo përsëri.");
    } finally {
      setVeprimiNePritje(null);
    }
  }

  async function prano(kerkesaId: string) {
    if (lidhja !== "online" || snapshot?.roli !== "shofer" || veprimiNePritje) return;
    setVeprimiNePritje(kerkesaId);
    setMesazhiVeprimit("");
    try {
      const result = await pranoKerkesen(kerkesaId);
      setMesazhiVeprimit(result.message);
      if (result.ok) refreshRef.current();
    } catch {
      setMesazhiVeprimit("Pranimi nuk u ruajt. Provo përsëri.");
    } finally {
      setVeprimiNePritje(null);
    }
  }

  const teDhena = snapshot?.udhetim ?? udhetimFillestar;
  const mundTeVeproje = lidhja === "online" && veprimiNePritje === null;

  return (
    <section className="live-trip" aria-labelledby="live-trip-title">
      <div className="live-trip-summary">
        <h2 id="live-trip-title">Gjendja e udhëtimit</h2>
        <dl className="live-trip-grid">
          <div><dt>Vende të lira</dt><dd>{teDhena.vende}</dd></div>
          <div><dt>Statusi</dt><dd>{teDhena.vende > 0 ? "Aktiv" : "I plotë"}</dd></div>
        </dl>
      </div>

      {lidhja === "offline" ? (
        <p className="live-warning" role="alert">
          Po rilidhemi · të dhënat mund të jenë të vjetra. Veprimet që kërkojnë rrjet janë të bllokuara.
        </p>
      ) : lidhja === "online" ? (
        <p className="live-connection" role="status">Gjendja u lexua nga serveri · përditësim automatik çdo 5 sekonda.</p>
      ) : lidhja === "loading" ? (
        <p className="live-connection" role="status">Po lexohet gjendja nga serveri…</p>
      ) : null}

      {lidhja === "login" && (
        <p role="alert">
          Hyr në RideShare për të parë ose dërguar kërkesë. <Link href="/panel">Hyr në llogari</Link>
        </p>
      )}
      {lidhja === "forbidden" && (
        <p role="alert">Ky udhëtim nuk është i lidhur me rolin tënd.</p>
      )}
      {lidhja === "missing" && <p role="alert">Udhëtimi nuk u gjet.</p>}

      {snapshot?.roli === "udhetar" && (
        <div className="live-request-panel">
          <p className="eyebrow"><span>KËRKESA IME</span></p>
          {snapshot.kerkesa ? (
            <>
              <strong>{snapshot.kerkesa.status === "accepted" ? "U pranua" : "Në pritje"}</strong>
              <p>{snapshot.kerkesa.status === "accepted" ? "Vendi u konfirmua." : "Kërkesa u dërgua."}</p>
            </>
          ) : teDhena.vende > 0 ? (
            <>
              <strong>Pa kërkesë</strong>
              {lejoKerkesen ? (
                <>
                  <p>Kërko një vend në këtë udhëtim.</p>
                  <button
                    className="primary-action"
                    type="button"
                    disabled={!mundTeVeproje}
                    onClick={() => void dergoKerkese()}
                  >
                    {veprimiNePritje === "request" ? "Po dërgohet…" : "Kërko një vend"}
                  </button>
                </>
              ) : (
                <p>Kërko një vend nga ekrani i kërkesës.</p>
              )}
            </>
          ) : (
            <>
              <strong>Pa kërkesë</strong>
              <p>Nuk ka vende të lira.</p>
            </>
          )}
        </div>
      )}

      {snapshot?.roli === "shofer" && (
        <div className="live-request-panel">
          <p className="eyebrow"><span>KËRKESAT E UDHËTIMIT</span></p>
          {snapshot.kerkesat.length === 0 ? (
            <>
              <strong>Pa kërkesë</strong>
              <p>Ende pa kërkesë.</p>
            </>
          ) : (
            <ul className="live-request-list">
              {snapshot.kerkesat.map((kerkesa) => (
                <li key={kerkesa.id}>
                  <span>{kerkesa.udhetari} · {kerkesa.status === "accepted" ? "U pranua" : "Në pritje"}</span>
                  {kerkesa.status === "pending" && (
                    <button
                      className="primary-action"
                      type="button"
                      disabled={!mundTeVeproje || teDhena.vende <= 0}
                      onClick={() => void prano(kerkesa.id)}
                    >
                      {veprimiNePritje === kerkesa.id ? "Po pranohet…" : "Prano kërkesën"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {mesazhiVeprimit && <p className="live-action-message" role="status">{mesazhiVeprimit}</p>}
    </section>
  );
}
