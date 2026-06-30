"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/icons";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="transition-colors hover:text-body"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="inline-flex size-6 items-center justify-center rounded-sm text-caption transition-colors hover:text-body"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </span>
  );
}
