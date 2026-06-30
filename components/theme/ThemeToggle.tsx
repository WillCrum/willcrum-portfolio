"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

/**
 * Appearance / contrast glyph. A circle half-filled to read as "switch theme".
 * Placeholder until the exact Figma header glyph is wired in.
 */
function ContrastIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2a8 8 0 0 1 0 16V2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === "neon" ? "Forest" : "Neon";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-button-label transition-colors hover:bg-button-hover hover:text-button-label-hover active:bg-button-clicked"
    >
      <ContrastIcon className="size-5" />
    </button>
  );
}
