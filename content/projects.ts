import type { Project } from "@/content/types";

// Intro block at the top of the Work page.
export const workIntro = {
  title: "Skills and projects",
  // *Design* is italicised inline.
  description:
    "*Design* is a multidisciplinary means of wielding creativity to solve problems. Here are some of the skills, frameworks, and modalities I regularly use to put my approach into practice.",
  skills: [
    "UI",
    "UX",
    "agentic dev",
    "design systems",
    "user research",
    "visual design",
    "AI/ML",
    "0→1",
  ],
};

// NOTE: CTA `href`s are placeholders ("#"). Real destinations (live links vs.
// future case-study pages) are pending Will's input — see docs/design-system or
// the plan's "open input" list.
export const projects: Project[] = [
  {
    slug: "my-transit-dashboard",
    company: "My /spec",
    logo: "/images/logo-myspec.svg",
    logoAlt: "My /spec",
    headline: "Live schedules for any MTA station at a single URL",
    body: "Built with Claude Code, *My Transit Dashboard* is a customizable dashboard for MTA train and bus times that makes checking my closest stations a one-step action.",
    tags: ["agentic dev", "UX", "0→1"],
    hero: {
      src: "/images/mta-spec-hero.png",
      alt: "My Transit Dashboard showing live MTA train and bus arrivals",
    },
    cta: { label: "Read more", href: "#", external: true },
  },
  {
    slug: "metamorph",
    company: "Pienso",
    logo: "/images/logo-pienso.svg",
    logoAlt: "Pienso",
    headline: "Automated deep-learning training that informs and delights",
    body: "Metamorph is deep learning training interface that tracks model quality in real time so users can spot issues early and take corrective action.",
    tags: ["UI", "UX", "AI/ML", "0→1"],
    hero: {
      src: "/images/metamorph-hero-forest.png",
      srcNeon: "/images/metamorph-hero-neon.png",
      alt: "Metamorph deep-learning training interface with live model scoring",
    },
    cta: { label: "Read more", href: "#", external: true },
  },
  {
    slug: "match",
    company: "Pienso",
    logo: "/images/logo-pienso.svg",
    logoAlt: "Pienso",
    headline: "Powerful text search that matches meaning, not just key words",
    body: "*Match* is a semantic search tool that gives users close control for finding sentences and documents with similar meaning.",
    tags: ["UI", "UX", "AI/ML", "0→1"],
    hero: {
      src: "/images/match-hero-forest.png",
      srcNeon: "/images/match-hero-neon.png",
      alt: "Match semantic search interface with example phrases and documents",
    },
    cta: { label: "Read more", href: "#", external: true },
  },
  {
    slug: "extraction-demo",
    company: "Pienso",
    logo: "/images/logo-pienso.svg",
    logoAlt: "Pienso",
    headline: "Rapidly unblocking channel sales to unlock the IDP market",
    body: "We designed a demo tool to show off Pienso’s new invoice extraction capabilities — in under a week.",
    tags: ["UX", "0→1", "design sprint", "leadership"],
    hero: {
      src: "/images/extraction-hero-forest.png",
      srcNeon: "/images/extraction-hero-neon.png",
      alt: "Invoice documents with automatically extracted fields",
    },
    cta: { label: "Read more", href: "#", external: true },
  },
  {
    slug: "platform-reskin",
    company: "Pienso",
    logo: "/images/logo-pienso.svg",
    logoAlt: "Pienso",
    headline: "A comprehensive platform reskin that’s more than skin-deep",
    body: "Pienso had grown into a sprawling platform without establishing a formal design system. We needed one, and to clean up a lot of UX debt along the way.",
    tags: ["UX", "design systems", "leadership"],
    hero: {
      src: "/images/reskin-hero-forest.png",
      srcNeon: "/images/reskin-hero-neon.png",
      alt: "Pienso platform reskin and design-system work in Figma",
    },
    cta: { label: "Read more", href: "#", external: true },
  },
  {
    slug: "wifc-kits",
    company: "WIFC",
    logo: "/images/logo-wifc.svg",
    logoAlt: "WIFC",
    headline: "Soccer uniforms that 140+ teammates can all agree on",
    body: "My amateur club had 5 teams, an established brand identity, and some worn-out kits. As a senior player and designer, I was excited to develop new home and away concepts.",
    tags: ["visual design", "side projects"],
    hero: {
      src: "/images/wifc-hero-forest.png",
      srcNeon: "/images/wifc-hero-neon.png",
      alt: "WIFC home and away soccer kit concepts",
    },
    cta: { label: "Read more", href: "#", external: true },
  },
];
