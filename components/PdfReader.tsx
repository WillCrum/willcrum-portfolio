"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
} from "@/components/icons";
import type { PageCallback } from "react-pdf/dist/shared/types.js";

// Bundler-resolved URL so the worker asset stays in lockstep with whatever
// pdfjs-dist version react-pdf pulls in — no manual copy-into-/public step
// to remember on upgrade.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const NORMAL_MAX_WIDTH = 720;
const FULLSCREEN_MAX_WIDTH = 1400;
const GAP = 8;
// Used only until the first page reports its real size, so the reserved
// box has a sane shape to render before that's known.
const FALLBACK_BOX_ASPECT = 1.5;

/** Front cover and back cover render alone; every page between them pairs
 * up into a left+right spread, matching the book's actual print layout. */
function buildSpreads(numPages: number): number[][] {
  if (numPages <= 2) {
    return Array.from({ length: numPages }, (_, i) => [i + 1]);
  }
  const spreads: number[][] = [[1]];
  for (let p = 2; p <= numPages - 1; p += 2) {
    spreads.push(p + 1 <= numPages - 1 ? [p, p + 1] : [p]);
  }
  spreads.push([numPages]);
  return spreads;
}

export function PdfReader({ url, caption }: { url: string; caption?: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [pageAspect, setPageAspect] = useState<number>();
  const [boxWidth, setBoxWidth] = useState(NORMAL_MAX_WIDTH);
  const [fullscreenWidthCap, setFullscreenWidthCap] = useState(FULLSCREEN_MAX_WIDTH);
  const [failed, setFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [editValue, setEditValue] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const spreads = useMemo(() => buildSpreads(numPages ?? 0), [numPages]);
  const currentSpread = spreads[spreadIndex] ?? [];

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setBoxWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Cap the box by whichever runs out first — viewport width, or the height
  // left over after the surrounding padding/nav row — so a tall spread never
  // overflows a short viewport.
  useEffect(() => {
    if (!isFullscreen) return;
    const shapeAspect = pageAspect ? pageAspect * 2 : FALLBACK_BOX_ASPECT;
    const RESERVED_VERTICAL = 220;
    function recompute() {
      const availableWidth = window.innerWidth - 48;
      const availableHeight = window.innerHeight - RESERVED_VERTICAL;
      const heightBasedWidth = availableHeight * shapeAspect;
      setFullscreenWidthCap(
        Math.max(200, Math.min(FULLSCREEN_MAX_WIDTH, availableWidth, heightBasedWidth)),
      );
    }
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [isFullscreen, pageAspect]);

  function handlePageLoadSuccess(page: PageCallback) {
    setPageAspect((current) => current ?? page.originalWidth / page.originalHeight);
  }

  function goToSpread(index: number) {
    setSpreadIndex(Math.max(0, Math.min(index, spreads.length - 1)));
  }

  function startEditing() {
    setEditValue(String(currentSpread[0] ?? 1));
    setIsEditingPage(true);
  }

  const trimmedEdit = editValue.trim();
  const isDigitsOnly = /^\d+$/.test(trimmedEdit);
  const editValueNum = isDigitsOnly ? Number(trimmedEdit) : NaN;
  const editInvalid =
    trimmedEdit !== "" &&
    (!isDigitsOnly || editValueNum < 1 || (numPages != null && editValueNum > numPages));

  function handleEditKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!editInvalid && isDigitsOnly) {
        const idx = spreads.findIndex((s) => s.includes(editValueNum));
        if (idx !== -1) setSpreadIndex(idx);
        setIsEditingPage(false);
      }
    } else if (e.key === "Escape") {
      setIsEditingPage(false);
    }
  }

  const pageWidth = Math.max(0, (boxWidth - GAP) / 2);
  const pageHeight = pageAspect ? pageWidth / pageAspect : undefined;
  const boxAspect = pageHeight ? boxWidth / pageHeight : FALLBACK_BOX_ASPECT;

  const atFirst = spreadIndex <= 0;
  const atLast = spreadIndex >= spreads.length - 1;
  const navStyle = (disabled: boolean) =>
    isFullscreen
      ? { color: disabled ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.85)" }
      : undefined;

  const displayLabel =
    currentSpread.length === 2
      ? `Pages ${currentSpread[0]}–${currentSpread[1]}`
      : `Page ${currentSpread[0] ?? "–"}`;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isFullscreen && "fixed inset-0 z-50 items-center justify-center p-6",
      )}
      style={isFullscreen ? { backgroundColor: "#000" } : undefined}
    >
      <div
        className="mx-auto w-full"
        style={{
          position: "relative",
          maxWidth: isFullscreen ? fullscreenWidthCap : NORMAL_MAX_WIDTH,
        }}
      >
        <div
          ref={boxRef}
          className="mx-auto w-full overflow-hidden rounded-xl bg-card"
          style={{ aspectRatio: boxAspect }}
        >
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={() => setFailed(true)}
            loading={
              <div className="flex h-full items-center justify-center text-sm text-caption">
                Loading book…
              </div>
            }
            error={
              <div className="flex h-full items-center justify-center text-sm text-caption">
                Couldn’t load the PDF.
              </div>
            }
          >
            <div className="flex h-full items-center justify-center" style={{ gap: GAP }}>
              {currentSpread.map((p) => (
                <Page
                  key={p}
                  pageNumber={p}
                  width={pageWidth}
                  loading={null}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onLoadSuccess={handlePageLoadSuccess}
                />
              ))}
            </div>
          </Document>
        </div>

        <IconButton
          aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
          onClick={() => setIsFullscreen((v) => !v)}
          className="size-8 rounded-md"
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            color: "rgba(255,255,255,0.85)",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
        </IconButton>
      </div>

      {numPages && !failed && (
        <div className="flex items-center justify-center gap-3">
          <IconButton
            aria-label="First page"
            variant={atFirst ? "disabled" : "secondary"}
            disabled={atFirst}
            onClick={() => goToSpread(0)}
            className="size-8"
            style={navStyle(atFirst)}
          >
            <ChevronFirst className="size-4" />
          </IconButton>
          <IconButton
            aria-label="Previous page"
            variant={atFirst ? "disabled" : "secondary"}
            disabled={atFirst}
            onClick={() => goToSpread(spreadIndex - 1)}
            className="size-9"
            style={navStyle(atFirst)}
          >
            <ChevronLeft className="size-5" />
          </IconButton>

          <div
            className="flex min-w-[110px] items-center justify-center text-sm"
            style={isFullscreen ? { color: "rgba(255,255,255,0.85)" } : undefined}
          >
            {isEditingPage ? (
              <input
                autoFocus
                inputMode="numeric"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleEditKeyDown}
                onBlur={() => setIsEditingPage(false)}
                className={cn(
                  "w-14 border-b border-dashed bg-transparent text-center outline-none",
                  !editInvalid && "border-caption/50 text-caption",
                )}
                style={editInvalid ? { borderColor: "#ef4444", color: "#ef4444" } : undefined}
              />
            ) : (
              <button
                type="button"
                onClick={startEditing}
                className={cn(!isFullscreen && "text-caption", "underline-offset-2 hover:underline")}
              >
                {displayLabel} of {numPages}
              </button>
            )}
          </div>

          <IconButton
            aria-label="Next page"
            variant={atLast ? "disabled" : "secondary"}
            disabled={atLast}
            onClick={() => goToSpread(spreadIndex + 1)}
            className="size-9"
            style={navStyle(atLast)}
          >
            <ChevronRight className="size-5" />
          </IconButton>
          <IconButton
            aria-label="Last page"
            variant={atLast ? "disabled" : "secondary"}
            disabled={atLast}
            onClick={() => goToSpread(spreads.length - 1)}
            className="size-8"
            style={navStyle(atLast)}
          >
            <ChevronLast className="size-4" />
          </IconButton>
        </div>
      )}

      {caption && !isFullscreen && (
        <p className="max-w-[783px] text-sm text-caption">{caption}</p>
      )}
    </div>
  );
}
