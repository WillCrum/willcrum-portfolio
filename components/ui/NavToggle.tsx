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
        "text-sm font-medium uppercase tracking-wider underline-offset-4 transition-colors",
        active
          ? "text-headline underline decoration-1"
          : "text-caption hover:text-subhead",
      )}
    >
      {label}
    </Link>
  );
}
