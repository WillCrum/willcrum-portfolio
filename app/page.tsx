import { Container } from "@/components/ui/Container";
import { WorkIntro } from "@/components/WorkIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export default function WorkPage() {
  return (
    <Container className="flex flex-col gap-10">
      <WorkIntro />
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </Container>
  );
}
