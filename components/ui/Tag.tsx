import type { ReactNode } from "react";

/**
 * Skill / category tag. Static (decorative) in V1 — the Library's hover/off
 * states are reserved for future filtering.
 */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-md bg-tag p-1.5 text-[13px] font-medium leading-[1.2] tracking-[0.26px] text-headline">
      {children}
    </span>
  );
}
