import { Fragment, type ReactNode } from "react";
import { FlipLink } from "@/components/ui/FlipLink";

const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*/g;

// Shared with FlipLink's rendered links, since the underline/hover-color
// treatment is otherwise identical to a plain inline link.
const LINK_CLASS = "underline decoration-1 underline-offset-2 hover:text-headline";

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * Renders a small subset of inline markdown to React nodes:
 *   *italic*            → <em>
 *   [text](href)        → FlipLink (new tab for http(s) links)
 * No HTML is injected — tokens map to elements directly.
 */
export function renderInline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));

    const [, linkText, href, italic] = match;
    if (href) {
      const external = isExternal(href);
      out.push(
        <FlipLink key={key++} href={href} external={external} className={LINK_CLASS}>
          {linkText}
        </FlipLink>,
      );
    } else if (italic) {
      out.push(
        <em key={key++} className="italic">
          {italic}
        </em>,
      );
    }
    last = TOKEN.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));

  return <Fragment>{out}</Fragment>;
}
