"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function NavToggle({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors",
        "hover:bg-button hover:text-button-label",
        "active:bg-button-clicked active:text-button-label",
        "focus-visible:bg-button focus-visible:text-button-label focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1",
        active
          ? "text-headline underline underline-offset-4 decoration-1"
          : "text-caption",
      )}
    >
      {label}
    </Link>
  );
}
