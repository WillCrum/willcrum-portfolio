"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RadialReveal, trackPointer } from "@/components/ui/radialReveal";

const base =
  "group relative isolate overflow-hidden inline-flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-base font-medium tracking-[0.32px] transition-colors";

const variants = {
  primary:
    "bg-button text-button-label shadow-xs hover:text-button-label-hover active:text-button-label-hover disabled:cursor-not-allowed disabled:bg-button-disabled disabled:text-button-label-disabled disabled:shadow-none",
  secondary:
    "text-button-label-secondary hover:text-button-label-hover focus-visible:outline-none focus-visible:text-button-label-hover focus-visible:ring-2 focus-visible:ring-focus",
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  variant?: "primary" | "secondary";
};

type LinkProps = CommonProps & { href: string; external?: boolean };
type ActionProps = CommonProps & {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

/** Text button. Renders an <a> when `href` is provided, else a <button>. */
export function Button(props: LinkProps | ActionProps) {
  if ("href" in props) {
    const { href, external, children, className, variant = "primary", ...rest } = props;
    return (
      <a
        href={href}
        onPointerEnter={trackPointer}
        onPointerLeave={trackPointer}
        className={cn(base, variants[variant], className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        <RadialReveal />
        {children}
      </a>
    );
  }
  const { children, className, variant = "primary", type = "button", ...rest } = props;
  return (
    <button
      type={type}
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
