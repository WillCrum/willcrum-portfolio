import { Tag } from "@/components/ui/Tag";
import { IconButton } from "@/components/ui/IconButton";
import { RotateCcw } from "@/components/icons";
import { renderInline } from "@/lib/inline";
import { cn } from "@/lib/cn";

type PageIntroProps = {
  title: string;
  description: string;
  tags: string[];
  selectedTags: Set<string>;
  onToggleTag: (tag: string) => void;
  onReset: () => void;
  /** "sm" (default) matches the Work page's existing heading treatment.
   * "lg" matches the larger headline-style size/color the Archive page's
   * Figma spec uses instead — kept as an explicit opt-in per page rather
   * than unifying both pages' headings, which wasn't asked for. */
  size?: "sm" | "lg";
};

const TITLE_STYLES = {
  sm: "text-2xl tracking-[-0.2px] text-headline",
  lg: "text-[32px] leading-[1.05] tracking-[-0.32px] text-body",
};

/** Page-top intro: title + description + tag-filter pills. Shared by the
 * Work and Archive pages, each supplying their own copy/tags. */
export function PageIntro({
  title,
  description,
  tags,
  selectedTags,
  onToggleTag,
  onReset,
  size = "sm",
}: PageIntroProps) {
  return (
    <section className="max-w-[783px]">
      <h1 className={cn("font-semibold", TITLE_STYLES[size])}>{title}</h1>
      <p className="mt-5 text-lg leading-[1.4] text-body">
        {renderInline(description)}
      </p>
      {/* Every <li> gets the same explicit h-7 — Tag's own content-based
          height (~27.6px) and the reset IconButton's size-7 (28px) are
          close but not pixel-identical, and a flex-wrap row sizes itself
          to its tallest item, so without this, whichever row the reset
          button lands in (which changes based on how many tags wrap) grows
          by that sub-pixel difference and visibly shifts the rows below. */}
      <ul className="mt-5 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <li key={tag} className="flex h-7 items-center">
            <Tag onClick={() => onToggleTag(tag)} selected={selectedTags.has(tag)}>
              {tag}
            </Tag>
          </li>
        ))}
        {selectedTags.size > 0 && (
          <li className="flex h-7 items-center">
            <IconButton onClick={onReset} aria-label="Reset filters" className="size-7">
              <RotateCcw className="size-4" />
            </IconButton>
          </li>
        )}
      </ul>
    </section>
  );
}
