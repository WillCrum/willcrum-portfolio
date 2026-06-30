import type { ProfileLink } from "@/content/types";

export const about = {
  headline: "Hey, stranger. I’m Will.",
  // Each entry is one paragraph; inline markdown (*italic*, [text](href)) is supported.
  paragraphs: [
    "I’m a product designer and strategist based in Brooklyn NY.",
    "I spent 7+ years turning complex AI/ML capabilities into intuitive interfaces as the founding designer and then design team lead at Pienso. Now I’m freelance, helping people and organizations reframe their questions and develop solutions.",
    "Away from work, you can find me in my kitchen, weeding my garden, or on the soccer pitch.",
    "My approach is human-centered and tech-agnostic. I’m at my best when I’m solving real problems, empowering real people, and making the complex clear.",
    "If you’re pursuing the same, [let’s link](mailto:willacrum@gmail.com).",
  ],
  portrait: {
    src: "/images/portrait.jpg",
    alt: "Will Crum",
  },
  // TODO: confirm final URLs with Will (LinkedIn handle, résumé link).
  links: [
    { label: "Email", href: "mailto:willacrum@gmail.com", kind: "email" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", kind: "linkedin" },
    { label: "Résumé", href: "#", kind: "resume" },
  ] satisfies ProfileLink[],
};
