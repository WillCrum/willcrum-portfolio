export const THEMES = ["forest", "neon"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "forest";
export const THEME_STORAGE_KEY = "theme";

// Per-theme favicon, swapped live (no reload) as the active theme changes.
// Each theme gets its own static file/URL rather than one file whose
// content changes — the latter is what makes favicons notoriously sticky
// across browser caches; two distinct URLs sidestep that entirely, since
// the browser just fetches and caches each independently.
export const THEME_ICONS: Record<Theme, string> = {
  forest: "/favicon-forest.svg",
  neon: "/favicon-neon.svg",
};

/**
 * Inline script run before paint so `data-theme` (and the favicon, to match)
 * are set on <html>/<head> from the stored preference (or the Forest
 * default) with no flash of the wrong theme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="forest"&&t!=="neon"){t="${DEFAULT_THEME}";}document.documentElement.dataset.theme=t;var icons=${JSON.stringify(THEME_ICONS)};var link=document.querySelector('link[rel="icon"]');if(link)link.href=icons[t];}catch(e){document.documentElement.dataset.theme="${DEFAULT_THEME}";}})();`;
