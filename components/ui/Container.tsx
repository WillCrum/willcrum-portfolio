import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Centered content column. Caps inner content at --container-content (1164px)
 * with 24px gutters that engage on narrower viewports.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "header" | "footer" | "section" | "main";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[calc(var(--container-content)+3rem)] px-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
