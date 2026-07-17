"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "@/components/icons";

type LightboxImage = { src: string; alt: string };
type LightboxContextValue = { open: (src: string) => void };

const LightboxContext = createContext<LightboxContextValue | null>(null);

/** Full-screen image viewer, opened by any ClickableImage inside it. One
 * overlay shared per provider instance rather than per-image, so only ever
 * one is mounted regardless of how many images are on the page. `images`
 * is the full ordered list for this provider's page — once one is open,
 * ArrowLeft/ArrowRight (or the on-screen chevrons) step through that same
 * list in page order. */
export function LightboxProvider({
  images,
  children,
}: {
  images: LightboxImage[];
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex != null ? images[activeIndex] : null;

  function open(src: string) {
    const idx = images.findIndex((img) => img.src === src);
    setActiveIndex(idx === -1 ? null : idx);
  }
  function close() {
    setActiveIndex(null);
  }
  function goPrev() {
    setActiveIndex((i) => (i == null ? i : Math.max(0, i - 1)));
  }
  function goNext() {
    setActiveIndex((i) => (i == null ? i : Math.min(images.length - 1, i + 1)));
  }

  useEffect(() => {
    if (activeIndex == null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, images.length]);

  const atFirst = activeIndex === 0;
  const atLast = activeIndex === images.length - 1;

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black p-6"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
          >
            <X className="size-7" />
          </button>
          {!atFirst && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white"
            >
              <ChevronLeft className="size-9" />
            </button>
          )}
          {!atLast && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white"
            >
              <ChevronRight className="size-9" />
            </button>
          )}
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
