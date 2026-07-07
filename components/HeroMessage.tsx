"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUp } from "@/components/icons";
import { IconButton } from "@/components/ui/IconButton";

// Hero reveal — "Making the complex" types in as a single left-to-right
// wipe (steps count below is derived from its own length, so it stays
// correct if this copy ever changes), then a brief hesitation before
// "clear." focuses into view (see .hero-focus-in in globals.css).
const TYPE_PHRASE = "Making the complex";
const TYPE_DURATION_MS = 600;
const FOCUS_HESITATION_MS = 50;
const FOCUS_DELAY_MS = TYPE_DURATION_MS + FOCUS_HESITATION_MS;

export function HeroMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  // SSR/first-paint fallback only — corrected pre-paint by the layout effect below.
  const [minHeight, setMinHeight] = useState<string>("100dvh");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateHeight = () => {
      setMinHeight(`calc(100dvh - ${section.offsetTop}px)`);
    };

    updateHeight();

    // window resize covers real browser window resizes (guaranteed to fire).
    // ResizeObserver on body covers content-driven reflows not tied to a window
    // resize — e.g. next/font's display:"swap" swapping in the real Inter font
    // after the fallback, which can shift Header's wrapped height.
    window.addEventListener("resize", updateHeight);
    const observer = new ResizeObserver(updateHeight);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      // Scroll to put projects section at top of viewport
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full grid grid-rows-[1fr_auto] gap-8 px-6 py-12"
      style={{ minHeight }}
    >
      {/* Centered headline — takes flexible space */}
      <div className="flex items-center justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-[48px] font-semibold leading-[1.1] tracking-[-0.48px] text-headline">
            <span
              className="hero-reveal-type"
              style={{
                animationDuration: `${TYPE_DURATION_MS}ms`,
                animationTimingFunction: `steps(${TYPE_PHRASE.length}, end)`,
              }}
            >
              {TYPE_PHRASE}
            </span>{" "}
            <span
              className="hero-focus-in"
              style={{ animationDelay: `${FOCUS_DELAY_MS}ms` }}
            >
              clear.
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll indicator arrow at bottom */}
      <div className="flex items-center justify-center pb-8">
        <IconButton
          onClick={scrollToProjects}
          aria-label="Scroll to projects"
          variant="primary"
          className="p-2.5"
        >
          <ArrowUp className="size-5 rotate-180" />
        </IconButton>
      </div>
    </section>
  );
}
