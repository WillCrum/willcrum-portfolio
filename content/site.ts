import type { NavItem, ProfileLink } from "@/content/types";

export const site = {
  name: "will crum",
  role: "product designer @ Brooklyn",
  email: "willacrum@gmail.com",
  copyrightHolder: "will crum",
  nav: [
    { label: "Work", href: "/" },
    { label: "About", href: "/about" },
  ] satisfies NavItem[],
  footerLinks: [
    { label: "email", href: "mailto:willacrum@gmail.com", kind: "email" },
    {
      label: "resume",
      href: "https://docs.google.com/document/d/1QObNSFO9JiwB7h2TIGgN3K6g_GJVUfE1O68s8SP4DuA/edit?usp=sharing",
      kind: "resume",
    },
    {
      label: "linkedin",
      // NOTE: exact profile — other "Will Crum"s exist on LinkedIn, don't swap for a handle-based URL.
      href: "https://www.linkedin.com/in/will-crum-41009545/",
      kind: "linkedin",
    },
    {
      label: "insta",
      href: "https://www.instagram.com/crumblebrag/",
      kind: "instagram",
    },
    {
      label: "blog",
      href: "https://substack.com/@willcrum",
      kind: "external",
    },
  ] satisfies ProfileLink[],
};
