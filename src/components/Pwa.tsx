"use client";

import { useEffect } from "react";

export default function Pwa() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let cancelled = false;

    async function warmSnapshot() {
      if (cancelled || !navigator.serviceWorker.controller) return;

      try {
        const response = await fetch("/api/udhetimet", { cache: "no-store" });
        if (!response.ok) {
          console.warn("Lista offline nuk u përditësua.", response.status);
        }
      } catch (error) {
        if (navigator.onLine) {
          console.error("Lista offline nuk mund të kërkohet.", error);
        }
      }
    }

    function handleControllerChange() {
      void warmSnapshot();
    }

    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(() => navigator.serviceWorker.ready)
      .then(warmSnapshot)
      .catch((error: unknown) => {
        console.error("Service worker-i nuk mund të regjistrohet.", error);
      });

    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, []);

  return (
    <aside className="pwa-note" aria-label="Lexim offline">
      <a href="/offline.html">Lista për lexim pa internet</a>
      <span>Kopja mund të jetë e vjetër; këtu nuk konfirmohen rezervime.</span>
    </aside>
  );
}
