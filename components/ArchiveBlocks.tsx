"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { renderInline } from "@/lib/inline";
import { LightboxProvider, useLightbox } from "@/components/Lightbox";
import type { ArchiveBlock } from "@/content/types";

// react-pdf touches canvas/DOM APIs that don't exist during SSR.
const PdfReader = dynamic(
  () => import("@/components/PdfReader").then((mod) => mod.PdfReader),
  { ssr: false },
);

function ClickableImage({
  src,
  alt,
  width,
  height,
  sizes,
  square,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  /** Renders inside a fixed 1:1 cell (for grid layouts) with the image
   * cropped to fill via object-cover, rather than scaled to its own
   * intrinsic aspect ratio — so a grid of mixed-orientation photos still
   * lines up. */
  square?: boolean;
}) {
  const { open } = useLightbox();
  if (square) {
    return (
      <button
        type="button"
        onClick={() => open(src)}
        aria-label={`View full size: ${alt}`}
        className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[2px] bg-card"
      >
        <Image src={src} alt={alt} fill quality={90} className="object-cover" sizes={sizes} />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => open(src)}
      aria-label={`View full size: ${alt}`}
      className="block w-full cursor-zoom-in"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
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
          {renderInline(block.text)}
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
    case "imageGrid": {
      // 4-wide grids break straight to 2x2 (no single-column mobile stack) —
      // a 2-up phone layout reads better than a long single-file scroll for
      // an even set of images. 2/3-wide grids keep the single-column mobile
      // fallback, since an odd/small column count doesn't halve as cleanly.
      const colClasses = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-2 lg:grid-cols-4",
      } as const;
      const sizes = {
        2: "(max-width: 640px) 100vw, 582px",
        3: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 388px",
        4: "(max-width: 1024px) 50vw, 291px",
      } as const;
      return (
        <div className={cn("grid gap-4", colClasses[block.columns])}>
          {block.images.map((img) => (
            <ClickableImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              square
              sizes={sizes[block.columns]}
            />
          ))}
        </div>
      );
    }
    case "video":
      return (
        <div className="flex flex-col gap-2">
          <div className="aspect-video w-full overflow-hidden rounded-[2px] bg-card">
            {block.provider === "vimeo" ? (
              <iframe
                src={`https://player.vimeo.com/video/${block.id}`}
                className="size-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                title={block.caption ?? "Video"}
              />
            ) : (
              <video src={block.url} className="size-full" controls />
            )}
          </div>
          {block.caption && (
            <p className="max-w-[783px] text-sm text-caption">{block.caption}</p>
          )}
        </div>
      );
    case "pdf":
      return (
        <PdfReader url={block.url} previewUrl={block.previewUrl} caption={block.caption} />
      );
  }
}

// Flat, page-order list of every image across all blocks — lets the
// lightbox step through Left/Right regardless of which block (single
// image, pair, or grid) an image came from.
function collectImages(blocks: ArchiveBlock[]): { src: string; alt: string }[] {
  const images: { src: string; alt: string }[] = [];
  for (const block of blocks) {
    if (block.type === "image") {
      images.push({ src: block.src, alt: block.alt });
    } else if (block.type === "imagePair" || block.type === "imageGrid") {
      for (const img of block.images) images.push({ src: img.src, alt: img.alt });
    }
  }
  return images;
}

export function ArchiveBlocks({ blocks }: { blocks: ArchiveBlock[] }) {
  return (
    <LightboxProvider images={collectImages(blocks)}>
      <div className="flex flex-col gap-8">
        {blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </LightboxProvider>
  );
}
