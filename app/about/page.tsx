import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Will Crum is a Brooklyn-based product designer and strategist. Human-centered, tech-agnostic, at his best making the complex clear.",
};

export default function AboutPage() {
  return (
    <Container>
      <AboutContent />
    </Container>
  );
}
