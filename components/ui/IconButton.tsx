"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RadialReveal, trackPointer } from "@/components/ui/radialReveal";

const base =
  "group relative isolate overflow-hidden inline-flex shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1";

const variants = {
  primary: "text-button-label hover:text-button-label-hover",
  secondary: "text-button-label-secondary hover:text-button-label-hover",
  // Matches NavToggle's own inactive-link color, for icon buttons that sit
  // beside nav links and need to read as the same visual "weight".
  disabled: "text-button-label-disabled hover:text-button-label-hover",
};

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  children: ReactNode;
  "aria-label": string;
  variant?: "primary" | "secondary" | "disabled";
};

/** Square, icon-only button — same radial hover reveal as Button, in the
 * site's icon color treatments. Callers provide their own size (e.g.
 * `size-9`, `size-8`, or `p-2.5`) via className. */
export function IconButton({
  children,
  variant = "secondary",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      onPointerEnter={trackPointer}
      onPointerLeave={trackPointer}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      <RadialReveal />
      {children}
    </button>
  );
}
