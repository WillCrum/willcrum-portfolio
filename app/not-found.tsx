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
    // A flat 64px gap on both sides, at both breakpoints, requires
    // asymmetric top/bottom offsets — the layout isn't symmetric above vs.
    // below this page: the header's own bottom margin (Container `my-12
    // md:my-16` in app/layout.tsx) is smaller than the footer's own top
    // margin (Footer.tsx's `mt-16 md:mt-24`), and at md:+ the footer's
    // margin (96px) already exceeds the 64px target on its own, so closing
    // that gap needs a negative margin, not just less padding:
    //   mobile:  48 (header's my-12)    + 16 (pt-4)     = 64  |  64 (footer's mt-16)   +   0 (mb-0)    = 64
    //   desktop: 64 (header's md:my-16) +  0 (md:pt-0)  = 64  |  96 (footer's md:mt-24) + -32 (md:-mb-8) = 64
    // If either margin above ever changes, update these to match.
    <Container className="flex flex-1 flex-col pt-4 md:pt-0 md:-mb-8">
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
