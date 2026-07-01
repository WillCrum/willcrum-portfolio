"use client";

import { Trees, Lightbulb } from "@/components/icons";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isForest = theme === "forest";
  const nextLabel = isForest ? "Neon" : "Forest";
  const Icon = isForest ? Trees : Lightbulb;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-button-label transition-colors hover:bg-button-hover hover:text-button-label-hover active:bg-button-clicked focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1"
    >
      <Icon className="size-5" />
    </button>
  );
}
