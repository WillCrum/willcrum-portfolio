"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { ArrowUp } from "@/components/icons";
import { cn } from "@/lib/cn";

/** Pinned lower-right, appears once the user has scrolled past a full
 * viewport's worth of content (i.e. below the hero "fold"). `inert` (not
 * just opacity/pointer-events) while hidden, so it's unreachable by
 * keyboard/assistive tech at all times it isn't visibly present. */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > window.innerHeight);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  return (
    // Positioning lives on this wrapper rather than IconButton itself:
    // IconButton's own base class already sets position:relative (its
    // RadialReveal child anchors against it), and cn() is a plain string
    // joiner rather than a Tailwind-merge — two classes setting the same
    // `position` property don't override by className order, only by
    // Tailwind's internal stylesheet order, which silently broke `fixed`
    // here (rendered in normal flow instead of pinned to the viewport).
    <div
      className={cn(
        "motion-safe-only fixed right-6 bottom-6 z-20 transition-[opacity,transform] duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      <IconButton
        onClick={scrollToTop}
        aria-label="Return to top"
        variant="primary"
        inert={!visible}
        className="size-11 bg-button shadow-xs"
      >
        <ArrowUp className="size-5" />
      </IconButton>
    </div>
  );
}
