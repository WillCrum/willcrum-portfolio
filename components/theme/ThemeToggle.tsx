"use client";

import { Trees, Lightbulb } from "@/components/icons";
import { useTheme } from "@/components/theme/ThemeProvider";
import { IconButton } from "@/components/ui/IconButton";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isForest = theme === "forest";
  const nextLabel = isForest ? "Neon" : "Forest";
  const Icon = isForest ? Trees : Lightbulb;

  return (
    <IconButton
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
      variant="disabled"
      className="size-9"
    >
      <Icon className="size-5" />
    </IconButton>
  );
}
