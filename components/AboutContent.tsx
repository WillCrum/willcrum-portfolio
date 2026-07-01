import Image from "next/image";
import { FileText, LinkedIn, Mail } from "@/components/icons";
import { renderInline } from "@/lib/inline";
import { about } from "@/content/about";
import type { ProfileLinkKind } from "@/content/types";

const ICONS: Partial<Record<ProfileLinkKind, typeof Mail>> = {
  email: Mail,
  linkedin: LinkedIn,
  resume: FileText,
};

export function AboutContent() {
  return (
    <section className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      {/* Text */}
      <div className="order-2 flex max-w-[487px] flex-col md:order-1">
        <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.4px] text-headline">
          {about.headline}
        </h1>

        <div className="mt-8 flex flex-col gap-5 text-lg leading-[1.4] text-body">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{renderInline(paragraph)}</p>
          ))}
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          {about.links.map((link) => {
            const Icon = ICONS[link.kind];
            const external = /^https?:\/\//.test(link.href);
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-2 rounded-md border border-spacer px-3 py-2 text-base text-body transition-colors hover:border-focus hover:text-headline"
                >
                  {Icon ? <Icon className="size-4" /> : null}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Portrait */}
      <div className="relative order-1 aspect-[57/50] w-full overflow-hidden md:order-2">
        <Image
          src={about.portrait.src}
          alt={about.portrait.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 570px"
          className="object-cover"
        />
      </div>
    </section>
  );
}
