import { Tag } from "@/components/ui/Tag";
import { renderInline } from "@/lib/inline";
import { workIntro } from "@/content/projects";

export function WorkIntro() {
  return (
    <section className="max-w-[783px]">
      <h1 className="text-2xl font-semibold tracking-[-0.2px] text-headline">
        {workIntro.title}
      </h1>
      <p className="mt-5 text-lg leading-[1.4] text-body">
        {renderInline(workIntro.description)}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {workIntro.skills.map((skill) => (
          <li key={skill}>
            <Tag>{skill}</Tag>
          </li>
        ))}
      </ul>
    </section>
  );
}
