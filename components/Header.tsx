import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NavToggle } from "@/components/ui/NavToggle";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { site } from "@/content/site";

export function Header() {
  return (
    <Container
      as="header"
      className="flex flex-col gap-4 pt-6 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
    >
      <div className="flex flex-col">
        <Link
          href="/"
          className="text-[28px] font-bold leading-none tracking-[-0.5px] text-headline transition-colors hover:text-subhead"
        >
          {site.name}
        </Link>
        <span className="mt-1.5 text-base text-caption">{site.role}</span>
      </div>

      <nav
        aria-label="Primary"
        className="flex shrink-0 items-center gap-5 sm:pt-1"
      >
        {site.nav.map((item) => (
          <NavToggle key={item.href} href={item.href} label={item.label} />
        ))}
        <ThemeToggle />
      </nav>
    </Container>
  );
}
