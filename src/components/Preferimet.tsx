"use client";

import Link from "next/link";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { ruajPreferimin } from "@/app/preferimet/actions";

type PreferimetContextValue = {
  teRuajturat: Set<string>;
  nePritje: Set<string>;
  mesazhet: Record<string, { gjendja: "saving" | "saved" | "error"; tekst: string }>;
  iKycur: boolean;
  ruaj: (udhetimId: string) => Promise<void>;
};

const PreferimetContext = createContext<PreferimetContextValue | null>(null);

export function PreferimetProvider({
  children,
  initialIds,
  iKycur,
}: {
  children: ReactNode;
  initialIds: string[];
  iKycur: boolean;
}) {
  const [teRuajturat, setTeRuajturat] = useState(() => new Set(initialIds));
  const [nePritje, setNePritje] = useState(() => new Set<string>());
  const [mesazhet, setMesazhet] = useState<
    Record<string, { gjendja: "saving" | "saved" | "error"; tekst: string }>
  >(() =>
    Object.fromEntries(
      initialIds.map((id) => [id, { gjendja: "saved", tekst: "Preferimet u lexuan nga serveri." }]),
    ),
  );
  const kerkesatAktive = useRef(new Set<string>());

  async function ruaj(udhetimId: string) {
    if (!iKycur || teRuajturat.has(udhetimId) || kerkesatAktive.current.has(udhetimId)) return;

    kerkesatAktive.current.add(udhetimId);
    setTeRuajturat((aktuale) => new Set(aktuale).add(udhetimId));
    setNePritje((aktuale) => new Set(aktuale).add(udhetimId));
    setMesazhet((aktuale) => ({
      ...aktuale,
      [udhetimId]: { gjendja: "saving", tekst: "Po ruhet…" },
    }));

    try {
      const rezultati = await ruajPreferimin(udhetimId);
      if (rezultati.ok) {
        setMesazhet((aktuale) => ({
          ...aktuale,
          [udhetimId]: { gjendja: "saved", tekst: rezultati.message },
        }));
      } else {
        setTeRuajturat((aktuale) => {
          const teRinjt = new Set(aktuale);
          teRinjt.delete(udhetimId);
          return teRinjt;
        });
        setMesazhet((aktuale) => ({
          ...aktuale,
          [udhetimId]: { gjendja: "error", tekst: rezultati.message },
        }));
      }
    } catch {
      setTeRuajturat((aktuale) => {
        const teRinjt = new Set(aktuale);
        teRinjt.delete(udhetimId);
        return teRinjt;
      });
      setMesazhet((aktuale) => ({
        ...aktuale,
        [udhetimId]: { gjendja: "error", tekst: "Nuk u ruajt. Provo përsëri." },
      }));
    } finally {
      kerkesatAktive.current.delete(udhetimId);
      setNePritje((aktuale) => {
        const teRinjt = new Set(aktuale);
        teRinjt.delete(udhetimId);
        return teRinjt;
      });
    }
  }

  return (
    <PreferimetContext.Provider value={{ teRuajturat, nePritje, mesazhet, iKycur, ruaj }}>
      <p className="favorite-summary" aria-live="polite">
        Të preferuarat <strong>{teRuajturat.size}</strong>
        <span>Preferim personal · jo rezervim</span>
      </p>
      {children}
    </PreferimetContext.Provider>
  );
}

export function ButoniPreferimi({ udhetimId }: { udhetimId: string }) {
  const preferimet = useContext(PreferimetContext);
  if (!preferimet) throw new Error("Butoni i preferimit duhet të jetë brenda PreferimetProvider.");

  if (!preferimet.iKycur) {
    return (
      <div className="favorite-control">
        <Link className="favorite-login" href="/panel">Hyr për të ruajtur udhëtimin</Link>
        <p className="favorite-status">Preferimet lidhen me llogarinë tënde.</p>
      </div>
    );
  }

  const eshteRuajtur = preferimet.teRuajturat.has(udhetimId);
  const nePritje = preferimet.nePritje.has(udhetimId);
  const mesazhi = preferimet.mesazhet[udhetimId];

  return (
    <div className="favorite-control">
      <button
        className={`favorite-button${eshteRuajtur ? " favorite-button-saved" : ""}`}
        type="button"
        aria-pressed={eshteRuajtur}
        disabled={eshteRuajtur || nePritje}
        onClick={() => void preferimet.ruaj(udhetimId)}
      >
        <span aria-hidden="true">{eshteRuajtur ? "★" : "☆"}</span>{" "}
        {nePritje ? "Po ruhet…" : eshteRuajtur ? "I ruajtur" : mesazhi?.gjendja === "error" ? "Provo përsëri" : "Ruaj udhëtimin"}
      </button>
      <p className="favorite-status" role="status" aria-live="polite">
        {mesazhi?.tekst ?? "Nuk është te të preferuarat."}
      </p>
    </div>
  );
}
