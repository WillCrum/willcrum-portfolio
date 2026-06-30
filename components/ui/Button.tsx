import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md bg-button px-3 py-2.5 text-base font-medium tracking-[0.32px] text-button-label shadow-xs transition-colors hover:bg-button-hover hover:text-button-label-hover active:bg-button-clicked disabled:cursor-not-allowed disabled:bg-button-disabled disabled:text-button-label-disabled disabled:shadow-none";

type CommonProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

type LinkProps = CommonProps & { href: string; external?: boolean };
type ActionProps = CommonProps & {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

/** Primary text button. Renders an <a> when `href` is provided, else a <button>. */
export function Button(props: LinkProps | ActionProps) {
  if ("href" in props) {
    const { href, external, children, className, ...rest } = props;
    return (
      <a
        href={href}
        className={cn(base, className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  const { children, className, type = "button", ...rest } = props;
  return (
    <button type={type} className={cn(base, className)} {...rest}>
      {children}
    </button>
  );
}
