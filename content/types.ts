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

export type ProjectHero = {
  /** Image path under /public. Fills the hero panel (object-cover). */
  src: string;
  /** Optional Neon-theme variant; falls back to `src` when absent. */
  srcNeon?: string;
  alt: string;
};

export type Project = {
  slug: string;
  /** Brand shown as the card logo. */
  company: string;
  logo: string;
  logoAlt: string;
  headline: string;
  /** Inline markdown — supports *italic* and [text](href). */
  body: string;
  tags: string[];
  hero: ProjectHero;
  cta: CTA;
};

export type ProfileLinkKind = "email" | "linkedin" | "resume" | "external";

export type ProfileLink = {
  label: string;
  href: string;
  kind: ProfileLinkKind;
};
