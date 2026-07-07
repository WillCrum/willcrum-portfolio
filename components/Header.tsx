"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NavToggle } from "@/components/ui/NavToggle";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { IconButton } from "@/components/ui/IconButton";
import { Menu, X } from "@/components/icons";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If already on home page, scroll to top (hero message) instead of navigating
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Natural scrolling dismisses the open mobile menu (per spec — selecting a
  // nav item does NOT auto-close it; only the X button or a scroll does).
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [menuOpen]);

  // The dropdown pushes page content down, changing how much space is above
  // the hero. Dispatch once immediately (covers reduced-motion, where the
  // row-height transition is disabled and no transitionend would ever fire)
  // and once more when the expand/collapse animation actually finishes (see
  // onTransitionEnd below) — the immediate dispatch alone would fire
  // mid-animation, before the layout has settled, giving HeroMessage's
  // height recalculation a stale intermediate value.
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [menuOpen]);

  const handleMenuTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "grid-template-rows") return;
    window.dispatchEvent(new Event("resize"));
  };

  return (
    <Container
      as="header"
      className="relative flex flex-wrap items-start justify-between gap-4 pt-6 pb-5 sm:gap-6"
    >
      <div className="flex flex-col">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="text-[28px] font-bold leading-none tracking-[-0.5px] text-headline transition-colors hover:text-subhead"
        >
          {site.name}
        </Link>
        {/* Caption hidden below sm: to keep the mobile header to a single row */}
        <span className="mt-1.5 hidden text-base text-caption sm:block">
          {site.role}
        </span>
      </div>

      {/* Desktop nav — unchanged, hidden below sm: */}
      <nav
        aria-label="Primary"
        className="hidden shrink-0 items-center gap-0.5 sm:flex sm:pt-1"
      >
        {site.nav.map((item) => (
          <NavToggle key={item.href} href={item.href} label={item.label} />
        ))}
        <ThemeToggle />
      </nav>

      {/* Mobile trigger row — theme toggle + hamburger/close, hidden at sm:+ */}
      <div className="flex shrink-0 items-center gap-2 sm:hidden">
        <ThemeToggle />
        <IconButton
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="size-9"
        >
          {menuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </IconButton>
      </div>

      {/* Mobile dropdown — in-flow (w-full forces it to wrap onto its own
          row within this flex-wrap header), so it pushes page content down
          rather than overlaying it. The hero section reacts via the resize
          dispatch above once the expand/collapse settles.

          Stays mounted at all times; the grid-template-rows 0fr/1fr trick
          (+ overflow-hidden on the row) animates to the nav's natural height
          with no JS measurement needed. `inert` removes it from the tab
          order and from assistive tech while collapsed, since it's still in
          the DOM (just visually collapsed) rather than unmounted. */}
      <div
        className={cn(
          "motion-safe-only grid w-full overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out sm:hidden",
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        onTransitionEnd={handleMenuTransitionEnd}
      >
        <nav
          aria-label="Primary"
          inert={!menuOpen}
          className="mt-2 flex flex-col gap-1 overflow-hidden rounded-md bg-card p-2"
        >
          {site.nav.map((item) => (
            <NavToggle key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
      </div>
    </Container>
  );
}
