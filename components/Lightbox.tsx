"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { X } from "@/components/icons";

type LightboxImage = { src: string; alt: string };
type LightboxContextValue = { open: (image: LightboxImage) => void };

const LightboxContext = createContext<LightboxContextValue | null>(null);

/** Full-screen image viewer, opened by any ClickableImage inside it. One
 * overlay shared per provider instance rather than per-image, so only ever
 * one is mounted regardless of how many images are on the page. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <LightboxContext.Provider value={{ open: setActive }}>
      {children}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black p-6"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
          >
            <X className="size-7" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- full-size
              original, deliberately bypassing next/image's fixed size set */}
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
}
