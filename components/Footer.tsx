import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Container as="footer" className="mt-16 md:mt-24">
      <Divider />
      <div className="flex flex-col gap-3 py-8 text-base text-caption sm:flex-row sm:items-center sm:justify-between">
        <CopyEmailButton email={site.email} />
        <span>
          {site.copyrightHolder} © {year}
        </span>
      </div>
    </Container>
  );
}
