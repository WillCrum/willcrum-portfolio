"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeft, ChevronRight } from "@/components/icons";

// Bundler-resolved URL so the worker asset stays in lockstep with whatever
// pdfjs-dist version react-pdf pulls in — no manual copy-into-/public step
// to remember on upgrade.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const MAX_WIDTH = 480;

export function PdfReader({ url, caption }: { url: string; caption?: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(MAX_WIDTH);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(Math.min(entry.contentRect.width, MAX_WIDTH));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-[480px] overflow-hidden rounded-[2px] bg-card"
      >
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={() => setFailed(true)}
          loading={
            <div className="flex aspect-[3/4] items-center justify-center text-sm text-caption">
              Loading book…
            </div>
          }
          error={
            <div className="flex aspect-[3/4] items-center justify-center text-sm text-caption">
              Couldn’t load the PDF.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {numPages && !failed && (
        <div className="flex items-center justify-center gap-4">
          <IconButton
            aria-label="Previous page"
            variant={pageNumber <= 1 ? "disabled" : "secondary"}
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => p - 1)}
            className="size-9"
          >
            <ChevronLeft className="size-5" />
          </IconButton>
          <span className="text-sm text-caption">
            Page {pageNumber} of {numPages}
          </span>
          <IconButton
            aria-label="Next page"
            variant={pageNumber >= numPages ? "disabled" : "secondary"}
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((p) => p + 1)}
            className="size-9"
          >
            <ChevronRight className="size-5" />
          </IconButton>
        </div>
      )}

      {caption && <p className="max-w-[783px] text-sm text-caption">{caption}</p>}
    </div>
  );
}
