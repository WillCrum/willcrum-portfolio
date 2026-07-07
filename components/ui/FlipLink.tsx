import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const FLIP_DURATION = "400ms";

/**
 * Vertical 3D "flip" hover, rolling upward: two copies of the label sit on
 * the same box, one pinned at its own top edge and one at its own bottom
 * edge — front folds up and away (0deg → 90deg, hinged at its top) exactly
 * as the duplicate unfolds down into view (-90deg → 0deg, hinged at its
 * bottom), reading as one continuous roll rather than a cross-fade or swap.
 * Each face animates independently off its own edge rather than composing
 * through a shared parent rotation, so there's no ambiguity about where the
 * pivot sits — a parent-level rotation defaults to its own center, which
 * visibly splits the text through its middle instead of folding it cleanly
 * at the edge.
 *
 * The duplicate face is aria-hidden; the front face carries the real text.
 *
 * Underline is set directly on both faces rather than left to inherit from
 * the anchor: text-decoration only reliably paints across in-flow content,
 * and the duplicate face is absolutely positioned (out of flow) so it can
 * share the front face's box — without its own decoration it'd render
 * without an underline once revealed.
 */
export function FlipLink({
  href,
  external,
  children,
  className,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-block overflow-hidden align-bottom [perspective:400px]",
        className,
      )}
    >
      <span
        className="motion-safe-only relative block underline decoration-1 underline-offset-2 transition-transform ease-in-out [backface-visibility:hidden] [transform-origin:center_top] group-hover:[transform:rotateX(90deg)] group-focus-visible:[transform:rotateX(90deg)]"
        style={{ transitionDuration: FLIP_DURATION }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block underline decoration-1 underline-offset-2 transition-transform ease-in-out [backface-visibility:hidden] [transform-origin:center_bottom] [transform:rotateX(-90deg)] group-hover:[transform:rotateX(0deg)] group-focus-visible:[transform:rotateX(0deg)]"
        style={{ transitionDuration: FLIP_DURATION }}
      >
        {children}
      </span>
    </a>
  );
}
