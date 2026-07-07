import { Tag } from "@/components/ui/Tag";
import { IconButton } from "@/components/ui/IconButton";
import { RotateCcw } from "@/components/icons";
import { renderInline } from "@/lib/inline";
import { workIntro } from "@/content/projects";

type WorkIntroProps = {
  selectedTags: Set<string>;
  onToggleTag: (tag: string) => void;
  onReset: () => void;
};

export function WorkIntro({ selectedTags, onToggleTag, onReset }: WorkIntroProps) {
  return (
    <section className="max-w-[783px]">
      <h1 className="text-2xl font-semibold tracking-[-0.2px] text-headline">
        {workIntro.title}
      </h1>
      <p className="mt-5 text-lg leading-[1.4] text-body">
        {renderInline(workIntro.description)}
      </p>
      <ul className="mt-5 flex flex-wrap items-center gap-2">
        {workIntro.skills.map((skill) => (
          <li key={skill}>
            <Tag onClick={() => onToggleTag(skill)} selected={selectedTags.has(skill)}>
              {skill}
            </Tag>
          </li>
        ))}
        {selectedTags.size > 0 && (
          <li>
            <IconButton onClick={onReset} aria-label="Reset filters" className="size-8">
              <RotateCcw className="size-4" />
            </IconButton>
          </li>
        )}
      </ul>
    </section>
  );
}
