"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { RadialReveal, trackPointer } from "@/components/ui/radialReveal";
import { ArrowUpRight, Check, Copy } from "@/components/icons";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

// Secondary button: no fill, no border — text + padding + rounded, per Figma Library.
// `group relative isolate overflow-hidden` is required by RadialReveal below.
const secondaryBtn =
  "group relative isolate overflow-hidden inline-flex items-center gap-1.5 rounded-md p-2.5 text-[13px] font-medium leading-[1.2] tracking-[0.26px] text-button-label-secondary transition-colors hover:text-button-label-hover focus-visible:outline-none focus-visible:text-button-label-hover focus-visible:ring-2 focus-visible:ring-focus";

function EmailCopyButton({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        onPointerEnter={trackPointer}
        onPointerLeave={trackPointer}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className={secondaryBtn}
      >
        <RadialReveal />
        {label}
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
      {copied ? (
        <span
          role="status"
          className="absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs text-headline shadow-elevated"
        >
          Copied
        </span>
      ) : null}
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Container as="footer" className="mt-16 md:mt-24">
      <Divider />
      <div className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <ul className="flex flex-col items-start gap-1 sm:flex-row sm:items-center">
          {site.footerLinks.map((link) => {
            if (link.kind === "email") {
              return (
                <li key={link.label}>
                  <EmailCopyButton label={link.label} />
                </li>
              );
            }
            const isExternal = /^https?:\/\//.test(link.href);
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onPointerEnter={trackPointer}
                  onPointerLeave={trackPointer}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(secondaryBtn)}
                >
                  <RadialReveal />
                  {link.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            );
          })}
        </ul>

        <span className="text-sm text-focus">
          {site.copyrightHolder} © {year}
        </span>
      </div>
    </Container>
  );
}
