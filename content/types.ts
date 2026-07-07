// Content model. Kept plain + serializable so a CMS can later supply the same
// shapes without touching components.

export type NavItem = {
  label: string;
  href: string;
};

export type CTA = {
  label: string;
  href: string;
  /** Opens in a new tab (external link or future case-study page). */
  external?: boolean;
};

export type ArtworkCard = {
  /** Image path under /public — a single rotated card/screenshot, no baked background. */
  src: string;
  /** The image's true width/height ratio. The box is always sized from this
   * (one dominant dimension + this ratio) so it can never mismatch the
   * source and force an internal crop — only the outer frame's overflow
   * clips the composition, never an individual piece. */
  aspect: number;
  /** Card height, as a percentage of the hero frame's height (the frame's
   * stable dimension at md:+, since height is fixed and width can vary in
   * the tablet range). Width is derived from aspect × this — never set
   * independently. */
  height: string;
  /** Position of the card's own top-left corner (pre-rotation), as a
   * percentage of the frame's height (top) and width (left). */
  top: string;
  left: string;
  rotate: number;
  shadow?: string;
  rounded?: string;
  /** Skips Next.js image re-encoding and serves the source file as-is —
   * for dense screenshots where any re-compression is visibly softer. */
  unoptimized?: boolean;
};

/** Either one config used at every breakpoint, or distinct desktop/tablet
 * (md:+) vs. mobile (<md) configs when the intended crop/anchor genuinely
 * differs — not just scales — between them. */
export type ArtworkConfig = ArtworkCard[] | { desktop: ArtworkCard[]; mobile: ArtworkCard[] };

export type ProjectHero = {
  /** Image path under /public. Fills the hero panel (object-cover). */
  src?: string;
  /** Optional Neon-theme variant; falls back to `src` when absent. */
  srcNeon?: string;
  alt: string;
  /** "cover" (default) crops a full-bleed photo to fill the frame. "contain"
   * is for a single transparent-background artwork image that should never
   * be cropped — the live card background shows through its own transparent
   * margins, so it's correct in any theme with one asset. */
  fit?: "cover" | "contain";
  /** Bespoke multi-layer composition (rotated cards + shadows), rendered as
   * live CSS directly over the card's own background — used instead of
   * src/fit for heroes whose visual is a floating-card collage rather than
   * a single flattened image. */
  artwork?: ArtworkConfig;
};

export type Project = {
  slug: string;
  /** Brand shown as the card logo. */
  company: string;
  logo: string;
  logoAlt: string;
  /** Logo's intrinsic width/height ratio (from its SVG viewBox) — sizes the
   * mask since a masked element has no natural intrinsic aspect ratio. */
  logoAspect: number;
  headline: string;
  /** Inline markdown — supports *italic* and [text](href). */
  body: string;
  tags: string[];
  hero: ProjectHero;
  cta: CTA;
};

export type ProfileLinkKind = "email" | "linkedin" | "resume" | "instagram" | "external";

export type ProfileLink = {
  label: string;
  href: string;
  kind: ProfileLinkKind;
};
