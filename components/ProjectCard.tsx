import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight } from "@/components/icons";
import { renderInline } from "@/lib/inline";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  const { logo, logoAlt, headline, body, tags, hero, cta } = project;

  return (
    <article className="overflow-hidden rounded-xl bg-card shadow-xs">
      <div className="grid md:grid-cols-2 md:gap-x-5">
        {/* Content column */}
        <div className="order-2 flex flex-col gap-8 p-6 md:order-1 md:h-[577px] md:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={logoAlt} className="h-8 w-auto self-start" />

          <div className="flex flex-col gap-[22px]">
            <h2 className="text-[32px] font-semibold leading-[1.05] tracking-[-0.32px] text-headline">
              {headline}
            </h2>
            <p className="text-lg leading-[1.4] text-body">{renderInline(body)}</p>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <Button
            href={cta.href}
            external={cta.external}
            aria-label={`${cta.label}: ${headline}`}
            className="self-start"
          >
            {cta.label}
            <ArrowRight className="size-5" />
          </Button>
        </div>

        {/* Hero column — Forest + optional Neon variant, swapped by active theme */}
        <div className="relative order-1 aspect-[4/3] w-full md:order-2 md:aspect-auto md:h-[577px]">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(max-width: 768px) 100vw, 572px"
            className={cn("object-cover", hero.srcNeon && "neon:hidden")}
          />
          {hero.srcNeon ? (
            <Image
              src={hero.srcNeon}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 100vw, 572px"
              className="object-cover forest:hidden"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
