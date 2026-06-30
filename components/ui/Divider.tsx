import { cn } from "@/lib/cn";

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("h-px border-0 bg-spacer", className)} />;
}
