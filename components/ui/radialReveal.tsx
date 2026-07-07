"use client";

import type { CSSProperties, PointerEvent } from "react";
import { cn } from "@/lib/cn";

/** CSS custom properties aren't part of React's CSSProperties type. */
type CSSVars = CSSProperties & Record<`--${string}`, string>;

// Radial reveal size/speed — the two values to tune if the fill should
// grow faster/slower or not fully cover a wide button's corners.
const REVEAL_SIZE = "140%";
const REVEAL_DURATION = "300ms";

/** Sets --x/--y to the pointer's position as a percentage of the element's
 * own box, so the radial reveal below originates from the actual point of
 * contact rather than a fixed corner. */
export function trackPointer(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty("--x", `${x}%`);
  e.currentTarget.style.setProperty("--y", `${y}%`);
}

/** The hover-color fill itself: an absolutely-positioned layer clipped to a
 * circle at --x/--y, growing on hover/focus via `group-hover`/
 * `group-focus-visible` (pure CSS — no state needed for the grow/shrink,
 * only the position is set imperatively via trackPointer). The parent must
 * carry `group relative isolate overflow-hidden`. Active/pressed swaps this
 * layer's own color rather than the parent's background, since by the time
 * it's fully grown it visually IS the button's background. */
export function RadialReveal() {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-button-hover transition-[clip-path]",
        "group-active:bg-button-clicked",
        "[clip-path:circle(0%_at_var(--x,50%)_var(--y,50%))]",
        "group-hover:[clip-path:circle(var(--reveal-size)_at_var(--x,50%)_var(--y,50%))]",
        "group-focus-visible:[clip-path:circle(var(--reveal-size)_at_var(--x,50%)_var(--y,50%))]",
      )}
      style={{
        transitionDuration: REVEAL_DURATION,
        transitionTimingFunction: "ease",
        "--reveal-size": REVEAL_SIZE,
      } as CSSVars}
    />
  );
}
