"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { RadialReveal, trackPointer } from "@/components/ui/radialReveal";

export function NavToggle({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const [workShowActive, setWorkShowActive] = useState(false);

  // On home page, only show WORK as active when projects section is visible
  useEffect(() => {
    if (href !== "/") return;

    const checkScrollState = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isActive = (window as any).__workPageShowActive ?? false;
      setWorkShowActive(isActive);
    };

    checkScrollState();
    window.addEventListener("scroll", checkScrollState);
    return () => window.removeEventListener("scroll", checkScrollState);
  }, [href]);

  const active =
    href === "/"
      ? pathname === "/" && workShowActive
      : pathname.startsWith(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If WORK link is clicked and we're on home page, scroll to projects instead of navigating
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      const projectsSection = document.getElementById("projects-section");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onPointerEnter={trackPointer}
      onPointerLeave={trackPointer}
      aria-current={active ? "page" : undefined}
      className={cn(
        // group/relative/isolate/overflow-hidden required by RadialReveal
        // below. Fixed h-9 + flex centering matches IconButton's own size-9
        // square exactly, so the hover-fill background is the same height
        // and vertical position as the view-mode toggle button beside it —
        // rather than the old p-2.5 (auto height from content), which
        // produced a slightly different box.
        "group relative isolate flex h-9 items-center justify-center overflow-hidden rounded-md px-2.5 transition-colors",
        // Default text colour — cascades to children
        active ? "text-button-label" : "text-button-label-disabled",
        // Hover/focus: brighter text (fill itself comes from RadialReveal)
        "hover:text-button-label-hover",
        "focus-visible:outline-none focus-visible:text-button-label-hover focus-visible:ring-2 focus-visible:ring-focus",
      )}
    >
      <RadialReveal />
      {/* 2 px gap between label and underline indicator, per design.
          inline-flex + w-fit keeps this shrink-wrapped to the text so the
          underline never exceeds the label's rendered width. Flex-centering
          this [label, gap, underline] stack as a whole within the h-9
          button leaves the LABEL sitting above the button's true center
          (the underline's own height below it pulls the stack's midpoint
          down, but the stack's midpoint isn't the label's midpoint) —
          translate-y-[1.5px] nudges the whole stack down so the label
          itself (not the decorative underline) reads as optically
          centered — measured directly (label's own bounding-box center vs
          the button's), not eyeballed. */}
      <span className="inline-flex w-fit translate-y-[1.5px] flex-col items-start gap-[2px]">
        <span className="text-[13px] font-medium leading-[1.2] tracking-[0.26px] uppercase">
          {label}
        </span>
        {/* Underline: occupies space in all states, only visible when active */}
        <span
          className={cn(
            "h-px w-full bg-current",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      </span>
    </Link>
  );
}
