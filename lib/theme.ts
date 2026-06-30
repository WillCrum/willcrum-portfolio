export const THEMES = ["forest", "neon"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "forest";
export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script run before paint so `data-theme` is set on <html> from the
 * stored preference (or the Forest default) with no flash of the wrong theme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="forest"&&t!=="neon"){t="${DEFAULT_THEME}";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="${DEFAULT_THEME}";}})();`;
