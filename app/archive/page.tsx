import type { Metadata } from "next";
import { ArchiveContent } from "@/components/ArchiveContent";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Older projects from Will Crum’s master’s thesis and other graduate school work.",
};

export default function ArchivePage() {
  return <ArchiveContent />;
}
