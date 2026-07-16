"use client";

import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/PageIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { RotateCcw } from "@/components/icons";
import { archiveIntro, archiveProjects } from "@/content/archive";
import { useTagFilter } from "@/lib/useTagFilter";

export function ArchiveContent() {
  const { selectedTags, toggleTag, resetTags, visibleItems: visibleProjects } =
    useTagFilter(archiveProjects);

  // Category eyebrow label only renders once per group, right before that
  // group's first card — in data order (not alphabetized), so new
  // categories can be added anywhere later without a display-order rule.
  let lastCategory: string | null = null;

  return (
    <>
      <Container className="flex flex-col gap-10 pt-3">
        <PageIntro
          title={archiveIntro.title}
          description={archiveIntro.description}
          tags={archiveIntro.skills}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          onReset={resetTags}
          size="lg"
        />
        {visibleProjects.length === 0 ? (
          // Sized to match a single ProjectCard — see app/page.tsx's own
          // empty state for why (keeps the page from shrinking/scrolling
          // back up when a filter combination matches nothing).
          <div className="flex h-[780px] flex-col items-center justify-center gap-3 text-center md:h-[577px]">
            <p className="text-2xl font-semibold tracking-[-0.2px] text-subhead">
              No matching projects found
            </p>
            <Button variant="secondary" onClick={resetTags}>
              <RotateCcw className="size-4" />
              Reset filters
            </Button>
          </div>
        ) : (
          visibleProjects.map((project) => {
            const showLabel = project.category !== lastCategory;
            lastCategory = project.category;
            return (
              <Fragment key={project.slug}>
                {showLabel && (
                  <p className="text-[16px] font-bold uppercase tracking-[0.48px] text-caption">
                    {project.category}
                  </p>
                )}
                <ProjectCard project={project} />
              </Fragment>
            );
          })
        )}
      </Container>
      <BackToTopButton />
    </>
  );
}
