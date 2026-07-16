import type { ArchiveProject } from "@/content/types";
import { SKILL_TAGS } from "@/content/tags";

// Intro block at the top of the Archive page.
export const archiveIntro = {
  title: "Archive",
  description:
    "These projects are from my master’s thesis and other graduate school work.",
  skills: SKILL_TAGS,
};

// NOTE: hero photos + logos are pulled from the Figma file's Library page —
// "Logos/Desktop/SVA+MM&AI" and "Logos/Desktop/SVA+VA", both composites of
// the SVA NYC seal + a divider + the project's own wordmark, flattened into
// one file each since ProjectCard's logo slot expects a single image.
export const archiveProjects: ArchiveProject[] = [
  {
    slug: "thesis",
    category: "Thesis",
    company: "SVA NYC MM&AI",
    logo: "/images/archive-logo-thesis.svg",
    logoAlt: "SVA NYC | MM&AI",
    logoAspect: 162.461 / 38.2727,
    headline:
      "Me, Myself, & AI: How I learned to love the machine that took my job",
    body: "An overview of my master’s thesis: a year’s worth of research, interviews, ideation, and prototyping for an AI-empowered futures of work and leisure.",
    tags: ["AI/ML", "user research", "visual design"],
    hero: {
      alt: "Will Crum presenting his master’s thesis at a podium",
      src: "/images/archive-thesis-hero.png",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/thesis",
    },
  },
  {
    slug: "she-served",
    category: "Other",
    company: "SVA NYC",
    logo: "/images/archive-logo-she-served.svg",
    logoAlt: "SVA NYC | VA",
    logoAspect: 100.093 / 38.2727,
    headline: "She Served",
    body: "A storytelling campaign meant to raise awareness of and empathy for women veterans in the US, *She Served* was the culmination of a 4-month user research project in partnership with the NY Veterans Affairs office.",
    tags: ["user research"],
    hero: {
      alt: "The Game of Military Life, a board game created for She Served",
      src: "/images/archive-she-served-hero.png",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/she-served",
    },
  },
];
