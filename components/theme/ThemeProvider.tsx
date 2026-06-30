"use client";

import { createContext, useCallback, useContext, useState } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEMES,
  type Theme,
} from "@/lib/theme";

export type { Theme };
export { THEMES, DEFAULT_THEME, THEME_STORAGE_KEY };

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer reads the data-theme the inline <head> script already set,
  // avoiding a setState-in-effect and the extra render it would cause.
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === "undefined") return DEFAULT_THEME;
    const applied = document.documentElement.dataset.theme;
    return isTheme(applied) ? applied : DEFAULT_THEME;
  });

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode) — keep in-memory state only */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(
      (document.documentElement.dataset.theme as Theme) === "neon"
        ? "forest"
        : "neon",
    );
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
