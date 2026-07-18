import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { Undo2 } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    // flex-1 opts this page's root into filling <main>'s own flex-1 height
    // (set in the root layout), and flex-1 on the box below makes its
    // height track whatever's left of the viewport, so the footer stays
    // pinned to the bottom instead of trailing after a fixed-height box.
    //
    // pt-12/pb-8 (not a symmetric py) is deliberate, not a typo: the layout
    // already isn't symmetric above vs. below this page — the header's own
    // bottom margin (Container `my-12 md:my-16` in app/layout.tsx) is
    // smaller than the footer's own top margin (Footer.tsx's `mt-16
    // md:mt-24`). This box's own top/bottom padding is chosen to cancel
    // that gap exactly, so the box reads as equidistant from both:
    //   mobile:  48 (header's my-12)  + 48 (pt-12) = 32 (pb-8) + 64 (footer's mt-16)  = 96
    //   desktop: 64 (header's md:my-16) + 64 (md:pt-16) = 32 (pb-8) + 96 (footer's md:mt-24) = 128
    // If either margin above ever changes, update these to match.
    <Container className="flex flex-1 flex-col pt-12 pb-8 md:pt-16">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-spacer text-center">
        <p className="text-8xl font-bold leading-none tracking-[-2px] text-focus">
          404
        </p>
        <p className="text-lg text-focus">ceci n’est pas une page.</p>
        <Divider className="my-3 w-32" />
        <Button href="/" variant="primary">
          Return home
          <Undo2 className="size-4" />
        </Button>
      </div>
    </Container>
  );
}
