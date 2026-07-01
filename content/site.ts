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
  // TODO: confirm final URLs for resume and instagram
  footerLinks: [
    { label: "email", href: "mailto:willacrum@gmail.com", kind: "email" },
    { label: "resume", href: "#", kind: "resume" },
    { label: "linkedin", href: "https://www.linkedin.com/in/willcrum/", kind: "linkedin" },
    { label: "insta", href: "#", kind: "instagram" },
  ] satisfies ProfileLink[],
};
