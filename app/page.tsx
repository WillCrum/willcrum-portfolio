"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { HeroMessage } from "@/components/HeroMessage";
import { WorkIntro } from "@/components/WorkIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { RotateCcw } from "@/components/icons";
import { projects } from "@/content/projects";

export default function WorkPage() {
  const [showWorkAsActive, setShowWorkAsActive] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  function resetTags() {
    setSelectedTags(new Set());
  }

  const visibleProjects = useMemo(() => {
    if (selectedTags.size === 0) return projects;
    return projects.filter((project) =>
      [...selectedTags].every((tag) => project.tags.includes(tag)),
    );
  }, [selectedTags]);

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
        <WorkIntro
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
