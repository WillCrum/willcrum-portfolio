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
    <Container>
      <div className="flex h-[500px] flex-col items-center justify-center gap-3 rounded-xl border border-spacer text-center">
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
