"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { HeroMessage } from "@/components/HeroMessage";
import { PageIntro } from "@/components/PageIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { RotateCcw } from "@/components/icons";
import { workIntro, projects } from "@/content/projects";
import { useTagFilter } from "@/lib/useTagFilter";

export default function WorkPage() {
  const [showWorkAsActive, setShowWorkAsActive] = useState(false);
  const { selectedTags, toggleTag, resetTags, visibleItems: visibleProjects } =
    useTagFilter(projects);

  useEffect(() => {
    // Track scroll position to determine when "Work" nav toggle should show as active
    const projectsSection = document.getElementById("projects-section");
    if (!projectsSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowWorkAsActive(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    observer.observe(projectsSection);
    return () => observer.disconnect();
  }, []);

  // Store scroll state in window for nav toggle to access
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__workPageShowActive = showWorkAsActive;
  }, [showWorkAsActive]);

  return (
    <>
      <HeroMessage />
      <Container className="flex flex-col gap-10 pt-3" id="projects-section">
        <PageIntro
          title={workIntro.title}
          description={workIntro.description}
          tags={workIntro.skills}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          onReset={resetTags}
        />
        {visibleProjects.length === 0 ? (
          // Sized to match a single ProjectCard (577px at md:+, matching its
          // fixed column height; ~780px below md, the average of real
          // mobile-card heights, which vary slightly by project copy length)
          // so the empty state doesn't shrink the page and scroll it back up.
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
          visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        )}
      </Container>
      <BackToTopButton />
    </>
  );
}
