import { Button } from "@/components/ui/Button";
import { Undo2 } from "@/components/icons";

/** "Archive" + "Work" back-navigation pair — shown at the bottom of the
 * thesis page's sub-project list and at the end of every archive detail
 * page. Side-by-side with a 16px gap; stacks on mobile. */
export function ArchiveNavButtons() {
  return (
    <div className="flex flex-col gap-4 self-center sm:flex-row">
      <Button href="/archive" variant="secondary">
        Archive
        <Undo2 className="size-4" />
      </Button>
      <Button href="/" variant="secondary">
        Work
        <Undo2 className="size-4" />
      </Button>
    </div>
  );
}
