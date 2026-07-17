import type { ArchiveProject } from "@/content/types";
import { ARCHIVE_TAGS } from "@/content/tags";

// Intro block at the top of the Archive page.
export const archiveIntro = {
  title: "Archive",
  description:
    "These projects are from my master’s thesis and other graduate school work.",
  skills: ARCHIVE_TAGS,
};

// NOTE: hero photos + logos are pulled from the Figma file's Library page —
// "Logos/Desktop/SVA+MM&AI", "Logos/Desktop/SVA+VA", and
// "Logos/Desktop/SVA+PoD" (node 380:1869) — each a composite of the SVA NYC
// seal + the project's own wordmark, flattened into one file since
// ProjectCard's logo slot expects a single image.
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
    body: "An overview of my master’s thesis: a year’s worth of research, interviews, ideation, and prototyping for an AI-empowered future of work and leisure.",
    tags: ["AI/ML", "user research", "visual design", "writing", "speculative design"],
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
    slug: "babi",
    category: "Thesis",
    company: "Me, Myself & A.I.",
    logo: "/images/archive-logo-thesis.svg",
    logoAlt: "SVA NYC | MM&AI",
    logoAspect: 162.461 / 38.2727,
    headline: "Babi: An AI assistant with an anthropomorphic makeover",
    body: "*Babi* hails from an AI-governed speculative future where constant data collection is still the norm. What if our in-home AI assistant told you what it’s learning?",
    tags: ["writing", "speculative design", "industrial design", "visual design", "AI/ML"],
    hero: {
      alt: "Babi, a speculative anthropomorphic AI home assistant",
      src: "/images/archive-babi-hero.webp",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/babi",
    },
  },
  {
    slug: "human-resourcing-dept",
    category: "Thesis",
    company: "Me, Myself & A.I.",
    logo: "/images/archive-logo-thesis.svg",
    logoAlt: "SVA NYC | MM&AI",
    logoAspect: 162.461 / 38.2727,
    headline: "The Human Resourcing Dept: Inside the staffing agency of the future",
    body: "It’s 2088, and your old job has been automated. But an AI named PETAR is here to sort you into a future job based on the human attributes we still need: critical thinking, creative thinking, and emotional intuition. This immersive performance tested people’s reactions to a sudden loss of agency.",
    tags: ["writing", "speculative design", "visual design", "experiential design", "service design", "AI/ML"],
    hero: {
      alt: "A performer in an immersive Human Resourcing Dept. staffing interview",
      src: "/images/archive-human-resourcing-dept-hero.webp",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/human-resourcing-dept",
    },
  },
  {
    slug: "jade",
    category: "Thesis",
    company: "Me, Myself & A.I.",
    logo: "/images/archive-logo-thesis.svg",
    logoAlt: "SVA NYC | MM&AI",
    logoAspect: 162.461 / 38.2727,
    headline: "Jade: Wearable autonomy that preserves elderly independence",
    body: "When *Jade* notices that its wearer makes a worrisome deviation from their routine, it rings and vibrates. If they don’t squeeze it to show they’re okay, it calls for help.",
    tags: ["speculative design", "industrial design", "service design", "UI", "UX", "AI/ML"],
    hero: {
      alt: "Jade, a wearable device for preserving elderly independence",
      src: "/images/archive-jade-hero.webp",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/jade",
    },
  },
  {
    slug: "classmates",
    category: "Thesis",
    company: "Me, Myself & A.I.",
    logo: "/images/archive-logo-thesis.svg",
    logoAlt: "SVA NYC | MM&AI",
    logoAspect: 162.461 / 38.2727,
    headline: "Classmates: An AI assistant for career-changers",
    body: "*Classmates* is a chatbot that guides career transitioners to their next role based on their preferences and personality, points them to learning resources, and connects them to their newfound peers.",
    tags: ["speculative design", "user research", "UI", "UX", "service design", "AI/ML"],
    hero: {
      alt: "Classmates, a chatbot app for career-changers, shown in hand",
      src: "/images/archive-classmates-hero.webp",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/classmates",
    },
  },
  {
    slug: "staygo",
    category: "Thesis",
    company: "Me, Myself & A.I.",
    logo: "/images/archive-logo-thesis.svg",
    logoAlt: "SVA NYC | MM&AI",
    logoAspect: 162.461 / 38.2727,
    headline: "Staygo: On-the-road learning for truckers in the semi-autonomous era",
    body: "*StayGo* is a service that transforms semi-autonomous truck cabs into mobile offices, allowing truckers to begin their transition to a job in the AI economy while their truck drives itself.",
    tags: ["speculative design", "service design", "AI/ML"],
    hero: {
      alt: "A semi-autonomous truck cab reimagined as a mobile office for StayGo",
      src: "/images/archive-staygo-hero.webp",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/staygo",
    },
  },
  {
    slug: "water-token",
    category: "Thesis",
    company: "Me, Myself & A.I.",
    logo: "/images/archive-logo-thesis.svg",
    logoAlt: "SVA NYC | MM&AI",
    logoAspect: 162.461 / 38.2727,
    headline: "Water Token: cap-and-trade water governance as basic income",
    body: "California is a notoriously problematic and overextended watershed. *The Water Token Project* is a speculative policy proposal that uses NOAA data to algorithmically price and allocate water every month using “water tokens,” tradable by corporations and citizens alike.",
    tags: ["speculative design", "service design", "policy design", "AI/ML"],
    hero: {
      alt: "A speculative advertisement for the Water Token Project",
      src: "/images/archive-water-token-hero.webp",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/water-token",
    },
  },
  {
    slug: "xharo",
    category: "Thesis",
    company: "Me, Myself & A.I.",
    logo: "/images/archive-logo-thesis.svg",
    logoAlt: "SVA NYC | MM&AI",
    logoAspect: 162.461 / 38.2727,
    headline: "Xharo: Bridging communities through randomized gift exchange",
    body: "*Xharo* is a speculative service to build bridging social capital by matching unconnected strangers and prompting them to get each other a gift.",
    tags: ["speculative design", "UI", "UX", "service design", "visual design", "AI/ML"],
    hero: {
      alt: "A display from the Xharo gift exchange project",
      src: "/images/archive-xharo-hero.webp",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/xharo",
    },
  },
  {
    slug: "move",
    category: "Other",
    company: "SVA Products of Design",
    logo: "/images/archive-logo-move.svg",
    logoAlt: "SVA NYC | Products of Design",
    logoAspect: 140.117 / 32,
    headline: "MOVE: Customizable signage to amplify grassroots voices",
    body: "*MOVE* empowers organizers and activists to make their message heard by offering customizable flat-pack signage that comes to you.",
    tags: ["service design", "experiential design", "visual design"],
    hero: {
      alt: "Customizable flat-pack signage deployed by MOVE",
      src: "/images/archive-move-hero.webp",
      fit: "cover",
    },
    cta: {
      label: "Read more",
      href: "/archive/move",
    },
  },
  {
    slug: "she-served",
    category: "Other",
    company: "SVA NYC",
    logo: "/images/archive-logo-she-served.svg",
    logoAlt: "SVA NYC | VA",
    logoAspect: 100.093 / 38.2727,
    headline: "She Served: Building understanding for women veterans",
    body: "A boardgame and storytelling campaign designed to create empathy for women veterans in the US, *She Served* was the culmination of a 4-month user research project with the NY Veterans Affairs office.",
    tags: ["user research", "service design", "experiential design", "visual design"],
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
