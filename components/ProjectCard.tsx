"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight } from "@/components/icons";
import { renderInline } from "@/lib/inline";
import { cn } from "@/lib/cn";
import type { ArtworkCard, Project } from "@/content/types";

// Hover tilt/shadow — the values to tune for a stronger/subtler wobble.
const MAX_TILT_DEG = 2;
const PERSPECTIVE_PX = 1500;
const HOVER_SCALE = 1.01;
const SHADOW_MAX_OFFSET_PX = 16;
const SHADOW_MAX_EXTRA_BLUR_PX = 20;
const RESET_TRANSITION_MS = 400;
// Matches --shadow-xs (0 2px 4px rgb(0 0 0 / 0.2)) — the resting shadow this
// tilt shifts away from, and back to on mouse-leave.
const SHADOW_BASE = { offsetY: 2, blur: 4, alpha: 0.2 };

function resetCardTilt(card: HTMLElement) {
  card.style.transition = `transform ${RESET_TRANSITION_MS}ms ease-out, box-shadow ${RESET_TRANSITION_MS}ms ease-out`;
  card.style.transform = `perspective(${PERSPECTIVE_PX}px) rotateX(0deg) rotateY(0deg) scale(1)`;
  card.style.boxShadow = `0 ${SHADOW_BASE.offsetY}px ${SHADOW_BASE.blur}px rgb(0 0 0 / ${SHADOW_BASE.alpha})`;
}

/** Tilts the card toward the cursor and shifts its shadow to the opposite
 * side, simulating the near corner lifting toward the viewer while the far
 * corner presses down toward the page. No transition while active — it
 * should track the cursor immediately; `resetCardTilt` above adds one back
 * for a smooth settle on mouse-leave. Skipped entirely under
 * prefers-reduced-motion. */
function handleCardMouseMove(e: MouseEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1..1

  const rotateY = x * MAX_TILT_DEG;
  const rotateX = -y * MAX_TILT_DEG;
  const tiltMagnitude = Math.min(1, Math.hypot(x, y));

  card.style.transition = "none";
  card.style.transform = `perspective(${PERSPECTIVE_PX}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${HOVER_SCALE})`;
  card.style.boxShadow = `${-x * SHADOW_MAX_OFFSET_PX}px ${SHADOW_BASE.offsetY - y * SHADOW_MAX_OFFSET_PX}px ${SHADOW_BASE.blur + tiltMagnitude * SHADOW_MAX_EXTRA_BLUR_PX}px rgb(0 0 0 / ${SHADOW_BASE.alpha})`;
}

function handleCardMouseLeave(e: MouseEvent<HTMLElement>) {
  resetCardTilt(e.currentTarget);
}

/** One rotated, shadowed piece of a floating-card hero. The box is always
 * sized from the image's own aspect ratio (height % + aspect-ratio, never an
 * independent width %), so the image can never be internally cropped as the
 * frame reshapes across breakpoints — only the outer frame's overflow clips
 * the overall composition. */
function ArtworkCardImage({ card, alt }: { card: ArtworkCard; alt: string }) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        top: card.top,
        left: card.left,
        height: card.height,
        aspectRatio: card.aspect,
        transform: `rotate(${card.rotate}deg)`,
        transformOrigin: "top left",
        borderRadius: card.rounded,
        boxShadow: card.shadow,
      }}
    >
      <Image
        src={card.src}
        alt={alt}
        aria-hidden={!alt}
        fill
        quality={90}
        unoptimized={card.unoptimized}
        sizes="(max-width: 768px) 100vw, 572px"
        className="object-contain"
      />
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { logo, logoAlt, logoAspect, headline, body, tags, hero, cta } =
    project;

  return (
    <article
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      className="motion-safe-only overflow-hidden rounded-xl bg-card shadow-xs"
    >
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-5">
        {/* Content column */}
        <div className="flex flex-col gap-8 p-6 md:order-1 md:h-[577px] md:justify-between">
          {/* Logo rendered as a CSS mask (not <img>) so its color tracks the
              theme: an externally-referenced SVG's own fill is isolated from
              the page and can't respond to data-theme, but mask-image only
              uses the file's alpha/shape — the visible color comes from this
              element's own bg-headline, which does re-bind per theme. */}
          <span
            role="img"
            aria-label={logoAlt}
            className="block h-8 self-start bg-headline opacity-50"
            style={{
              aspectRatio: logoAspect,
              WebkitMaskImage: `url(${logo})`,
              maskImage: `url(${logo})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
            }}
          />

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

        {/* Hero column. Three modes:
            - artwork: a bespoke collage of rotated, shadowed card images with
              no baked background — sits directly over this wrapper's own
              bg-card, so it's correct in any theme with no per-theme asset.
            - fit "contain": a single transparent-background image, never
              cropped, same reasoning as artwork.
            - default "cover": a full-bleed photo (Forest + optional Neon
              variant, swapped by active theme). */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-card md:order-2 md:aspect-auto md:h-[577px]">
          {hero.artwork ? (
            Array.isArray(hero.artwork) ? (
              // Single config used at every breakpoint.
              hero.artwork.map((card, i) => (
                <ArtworkCardImage
                  key={i}
                  card={card}
                  alt={i === 0 ? hero.alt : ""}
                />
              ))
            ) : (
              // Distinct mobile vs. desktop/tablet configs.
              <>
                <div className="absolute inset-0 hidden md:block">
                  {hero.artwork.desktop.map((card, i) => (
                    <ArtworkCardImage
                      key={i}
                      card={card}
                      alt={i === 0 ? hero.alt : ""}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 md:hidden">
                  {hero.artwork.mobile.map((card, i) => (
                    <ArtworkCardImage
                      key={i}
                      card={card}
                      alt={i === 0 ? hero.alt : ""}
                    />
                  ))}
                </div>
              </>
            )
          ) : hero.fit === "contain" ? (
            <Image
              src={hero.src!}
              alt={hero.alt}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 572px"
              className="object-contain p-8"
            />
          ) : (
            <>
              <Image
                src={hero.src!}
                alt={hero.alt}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 572px"
                className={cn("object-cover", hero.srcNeon && "neon:hidden")}
              />
              {hero.srcNeon ? (
                <Image
                  src={hero.srcNeon}
                  alt=""
                  aria-hidden
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 572px"
                  className="object-cover forest:hidden"
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
