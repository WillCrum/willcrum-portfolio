"use client";

import Image from "next/image";
import { renderInline } from "@/lib/inline";
import { LightboxProvider, useLightbox } from "@/components/Lightbox";
import type { ArchiveBlock } from "@/content/types";

function ClickableImage({
  src,
  alt,
  width,
  height,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
}) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      onClick={() => open({ src, alt })}
      aria-label={`View full size: ${alt}`}
      className="block w-full cursor-zoom-in"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full rounded-[2px] bg-card"
        sizes={sizes}
      />
    </button>
  );
}

// Text-carrying blocks share a reading-column width; images/imagePairs are
// allowed to run the container's full width instead.
function Block({ block }: { block: ArchiveBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="max-w-[783px] text-2xl font-semibold tracking-[-0.2px] text-headline">
          {block.text}
        </h2>
      ) : (
        <h3 className="max-w-[783px] text-lg font-semibold text-headline">
          {block.text}
        </h3>
      );
    case "label":
      return (
        <p className="max-w-[783px] text-[16px] font-bold uppercase tracking-[0.48px] text-caption">
          {block.text}
        </p>
      );
    case "paragraph":
      return (
        <p className="max-w-[783px] text-lg leading-[1.4] text-body">
          {renderInline(block.text)}
        </p>
      );
    case "quote":
      return (
        <blockquote className="max-w-[783px] border-l-2 border-focus pl-5 text-xl italic leading-[1.4] text-headline">
          {block.text}
        </blockquote>
      );
    case "image":
      return (
        <figure className="flex flex-col gap-2">
          <ClickableImage
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(max-width: 768px) 100vw, 1164px"
          />
          {block.caption && (
            <figcaption className="max-w-[783px] text-sm text-caption">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "imagePair":
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {block.images.map((img) => (
            <ClickableImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 768px) 100vw, 582px"
            />
          ))}
        </div>
      );
  }
}

export function ArchiveBlocks({ blocks }: { blocks: ArchiveBlock[] }) {
  return (
    <LightboxProvider>
      <div className="flex flex-col gap-8">
        {blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </LightboxProvider>
  );
}
