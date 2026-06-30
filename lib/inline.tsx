import { Fragment, type ReactNode } from "react";

const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*/g;

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * Renders a small subset of inline markdown to React nodes:
 *   *italic*            → <em>
 *   [text](href)        → <a> (new tab for http(s) links)
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
        <a
          key={key++}
          href={href}
          className="underline decoration-1 underline-offset-2 transition-colors hover:text-headline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {linkText}
        </a>,
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
