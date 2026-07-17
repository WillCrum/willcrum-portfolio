import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Divider } from "@/components/ui/Divider";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchiveBlocks } from "@/components/ArchiveBlocks";
import { Award, Newspaper } from "@/components/icons";
import { archiveProjects } from "@/content/archive";
import { archiveDetails } from "@/content/archiveDetails";
import { renderInline } from "@/lib/inline";
import type { ArchiveRecognition } from "@/content/types";

// This project's first dynamic route — params is a Promise in this Next.js
// version (confirmed against this repo's own vendored docs, not assumed),
// so both generateMetadata and the page itself must await it.
type Params = Promise<{ slug: string }>;

function findProject(slug: string) {
  return archiveProjects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  return {
    title: project.headline,
    description: project.body.replace(/\*/g, ""),
  };
}

const RECOGNITION_ICONS = { award: Award, newspaper: Newspaper };

function RecognitionItem({ item }: { item: ArchiveRecognition }) {
  const Icon = RECOGNITION_ICONS[item.icon];
  return (
    <li className="flex items-center gap-2">
      <Icon className="size-4 shrink-0 text-caption" />
      <span>
        {renderInline(`[${item.label}](${item.href})`)}
        {item.detail ? ` — ${item.detail}` : ""}
      </span>
    </li>
  );
}

/**
 * An archived project's own page. Every project gets the same intro shell —
 * headline, hero image, body copy as a subhead, tags, then a divider —
 * regardless of whether its long-form content has been ported yet. Projects
 * with a `content/archiveDetails.ts` entry get their full scraped content
 * below that divider; others simply have nothing further there until their
 * content is ported in a follow-up pass.
 */
export default async function ArchiveProjectPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const detail = archiveDetails[slug];
  const pageHero = project.pageHero ?? project.hero;

  return (
    <Container className="flex flex-col gap-8 pt-3">
      <h1 className="text-[32px] font-semibold leading-[1.05] tracking-[-0.32px] text-headline">
        {project.headline}
      </h1>

      {pageHero.src && (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-card">
          <Image
            src={pageHero.src}
            alt={pageHero.alt}
            fill
            quality={90}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1164px"
          />
        </div>
      )}

      <div className="flex max-w-[783px] flex-col gap-4">
        <p className="text-lg leading-[1.4] text-body">{renderInline(project.body)}</p>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        {/* Awards/press — moved up here from the source page's footer, per
            an explicit content-porting request. */}
        {detail && detail.recognition.length > 0 && (
          <ul className="flex flex-col gap-1.5 text-sm text-caption">
            {detail.recognition.map((r) => (
              <RecognitionItem key={r.href} item={r} />
            ))}
          </ul>
        )}
      </div>

      <Divider />

      {detail && (
        <>
          <ArchiveBlocks blocks={detail.blocks} />
          {detail.subProjects && detail.subProjects.length > 0 && (
            <div className="flex flex-col gap-10">
              {detail.subProjects.map((sub) => (
                <ProjectCard key={sub.slug} project={sub} />
              ))}
            </div>
          )}
          {detail.closingBlocks && (
            <>
              <Divider />
              <ArchiveBlocks blocks={detail.closingBlocks} />
            </>
          )}
          {detail.sourceLink && (
            <p className="max-w-[783px] text-lg leading-[1.4] text-body">
              {renderInline(
                `To read more about the project, check out [${detail.sourceLink.label}](${detail.sourceLink.href}).`,
              )}
            </p>
          )}
        </>
      )}
    </Container>
  );
}
