import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  /** Omit for static/decorative usage (e.g. ProjectCard's own tag list) —
   * renders a plain, non-interactive span. Provide onClick to render an
   * interactive filter chip instead. */
  onClick?: () => void;
  /** Only meaningful when onClick is provided. Active-on vs inactive-off styling. */
  selected?: boolean;
};

/** This component's own tracking-[0.26px] below is non-zero letter-spacing,
 * which disables Inter's "->" contextual-alternate ligature (browsers turn
 * off ligature shaping whenever letter-spacing isn't the font's default) —
 * confirmed directly in-browser, not assumed. Wrapping just the "->"
 * substring in a letter-spacing: normal span restores the ligature for it
 * while the rest of the label keeps this component's normal tracking. */
function renderLabel(children: ReactNode): ReactNode {
  if (typeof children !== "string" || !children.includes("->")) return children;
  return children.split("->").map((part, i) =>
    i === 0 ? (
      part
    ) : (
      <span key={i}>
        <span className="tracking-normal">-&gt;</span>
        {part}
      </span>
    ),
  );
}

/** Skill / category tag. Static by default; becomes an interactive filter
 * chip when `onClick` is provided. */
export function Tag({ children, onClick, selected = true }: TagProps) {
  const classes = cn(
    "inline-flex items-center whitespace-nowrap rounded-md p-1.5 text-[13px] font-medium leading-[1.2] tracking-[0.26px] text-headline transition-colors",
    selected ? "bg-tag" : "bg-tag-off",
    onClick &&
      "hover:bg-tag-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
  );
  const label = renderLabel(children);

  if (!onClick) {
    return <span className={classes}>{label}</span>;
  }

  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={classes}>
      {label}
    </button>
  );
}
