"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Instagram,
  LinkedIn,
  Mail,
} from "@/components/icons";
import { site } from "@/content/site";
import type { ProfileLinkKind } from "@/content/types";
import { cn } from "@/lib/cn";
import type { SVGProps, ReactElement } from "react";

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;

const ICONS: Partial<Record<ProfileLinkKind, IconComponent>> = {
  email: Mail,
  linkedin: LinkedIn,
  resume: FileText,
  instagram: Instagram,
};

const secondaryBtn =
  "inline-flex items-center gap-1.5 rounded-md border border-spacer px-3 py-1.5 text-sm text-caption transition-colors hover:border-focus hover:text-headline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

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

  const Icon = ICONS.email!;
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      className={secondaryBtn}
    >
      <Icon className="size-3.5" />
      {label}
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Container as="footer" className="mt-16 md:mt-24">
      <Divider />
      <div className="flex items-center justify-between py-6">
        <ul className="flex items-center gap-2">
          {site.footerLinks.map((link) => {
            if (link.kind === "email") {
              return (
                <li key={link.label}>
                  <EmailCopyButton label={link.label} />
                </li>
              );
            }
            const Icon = ICONS[link.kind];
            const isExternal = /^https?:\/\//.test(link.href);
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(secondaryBtn)}
                >
                  {Icon ? <Icon className="size-3.5" /> : null}
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
