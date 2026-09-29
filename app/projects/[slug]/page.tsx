import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { ArchiveBlocks } from "@/components/ArchiveBlocks";
import { HeroVideo } from "@/components/HeroVideo";
import { ExternalLink, Undo2 } from "@/components/icons";
import { projects } from "@/content/projects";
import { projectDetails } from "@/content/projectDetails";
import { renderInline } from "@/lib/inline";

// Same Promise-wrapped params as app/archive/[slug]/page.tsx — this Next.js
// version requires awaiting params in both generateMetadata and the page.
type Params = Promise<{ slug: string }>;

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
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

/**
 * A Work-page project's own page — ported from the Figma "Page designs"
 * file: eyebrow, headline, tags, hero, body, then a CTA back to the
 * project's original external write-up, a divider, the long-form content
 * (when ported), a second divider, and a single "Work" back-nav button.
 * Every project gets the intro shell even without long-form content yet.
 */
export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const detail = projectDetails[slug];
  const pageHero = project.pageHero ?? project.hero;

  return (
    <Container className="flex flex-col gap-[65px] pt-3">
      <div className="flex flex-col gap-6">
        {project.eyebrow && (
          <p className="text-lg leading-[1.4] text-headline">{project.eyebrow}</p>
        )}
        <h1 className="text-[32px] font-semibold leading-[1.05] tracking-[-0.32px] text-headline sm:text-[48px]">
          {project.headline}
        </h1>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        {pageHero.video ? (
          <HeroVideo video={pageHero.video} alt={pageHero.alt} />
        ) : (
          pageHero.src &&
          (pageHero.width && pageHero.height ? (
            <Image
              src={pageHero.src}
              alt={pageHero.alt}
              width={pageHero.width}
              height={pageHero.height}
              quality={90}
              className="h-auto w-full rounded-[2px]"
              sizes="(max-width: 768px) 100vw, 1164px"
            />
          ) : (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px]">
              <Image
                src={pageHero.src}
                alt={pageHero.alt}
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1164px"
              />
            </div>
          ))
        )}
        {pageHero.caption && (
          <p className="text-sm leading-[1.4] text-caption">{renderInline(pageHero.caption)}</p>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-lg leading-[1.4] text-body">{renderInline(project.body)}</p>
        {project.caseStudyCta && (
          <div className="self-start">
            <Button href={project.caseStudyCta.href} external={project.caseStudyCta.external}>
              {project.caseStudyCta.label}
              <ExternalLink className="size-5" />
            </Button>
          </div>
        )}
      </div>

      {detail && (
        <>
          <Divider />
          <ArchiveBlocks blocks={detail.blocks} />
        </>
      )}

      <Divider />
      <div className="self-center">
        <Button href="/" variant="secondary">
          Work
          <Undo2 className="size-4" />
        </Button>
      </div>
    </Container>
  );
}
