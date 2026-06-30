import type { NavItem } from "@/content/types";

export const site = {
  name: "will crum",
  role: "product designer @ Brooklyn",
  email: "willacrum@gmail.com",
  /** © year is rendered from this so it stays current. */
  copyrightHolder: "will crum",
  nav: [
    { label: "Work", href: "/" },
    { label: "About", href: "/about" },
  ] satisfies NavItem[],
};
