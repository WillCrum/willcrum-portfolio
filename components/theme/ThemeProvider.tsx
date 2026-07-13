"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  DEFAULT_THEME,
  THEME_ICONS,
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
  // Always start from DEFAULT_THEME on both server and client. A lazy
  // initializer that read document.documentElement.dataset.theme directly
  // used to live here — that attribute is set by the inline <head> script
  // (see lib/theme.ts's themeInitScript) via the browser's native HTML
  // parser, BEFORE React runs, and by hydration time already reflects the
  // real localStorage preference. That meant the client's first render of
  // this state could legitimately differ from the server's (which has no
  // DOM/localStorage and always falls back to DEFAULT_THEME) — a genuine
  // hydration mismatch for every consumer of `theme` (ThemeToggle renders a
  // different icon/label depending on it). Starting both renders from the
  // same static default removes the mismatch at its root; the effect below
  // syncs to the real value immediately after mount instead.
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  // Post-mount sync: adopt whatever the inline script already applied to
  // <html>, now that hydration has completed without a mismatch. Only ever
  // actually updates state once — after that, `applied === theme` already
  // holds (setTheme below keeps the DOM attribute and this state in lockstep
  // on every subsequent change), so later re-runs are harmless no-ops.
  useEffect(() => {
    const applied = document.documentElement.dataset.theme;
    if (isTheme(applied) && applied !== theme) {
      // The rule below normally guards against effect-triggered cascading
      // renders, but that's exactly the (harmless, one-time) trade-off this
      // fix intentionally makes in exchange for removing the hydration
      // mismatch — see the comment on the useState above.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(applied);
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    // Swaps to the other theme's own favicon URL rather than mutating one
    // file's content — see THEME_ICONS' own comment for why that matters.
    const iconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (iconLink) iconLink.href = THEME_ICONS[next];
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
