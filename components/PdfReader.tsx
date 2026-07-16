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
  ZoomIn,
  ZoomOut,
} from "@/components/icons";
import type { PageCallback } from "react-pdf/dist/shared/types.js";

// Bundler-resolved URL so the worker asset stays in lockstep with whatever
// pdfjs-dist version react-pdf pulls in — no manual copy-into-/public step
// to remember on upgrade.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const FIXED_PAGE_WIDTH = 340;
const FULLSCREEN_BASE_MAX = 700;
const FULLSCREEN_MARGIN = 32;
const GAP = 8;
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2.4;
const ZOOM_STEP = 0.2;
// Used only until the first page reports its real size, so the reserved
// height is sane before that's known.
const FALLBACK_PAGE_ASPECT = 0.75;
const CONTROLS_HIDE_DELAY = 2500;

/** Every page pairs into a left+right spread, including the cover — only a
 * trailing odd page (if numPages is odd) ever renders alone. */
function buildSpreads(numPages: number): number[][] {
  const spreads: number[][] = [];
  for (let p = 1; p <= numPages; p += 2) {
    spreads.push(p + 1 <= numPages ? [p, p + 1] : [p]);
  }
  return spreads;
}

export function PdfReader({
  url,
  previewUrl,
  caption,
}: {
  url: string;
  previewUrl?: string;
  caption?: string;
}) {
  const [numPages, setNumPages] = useState<number>();
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [pageAspect, setPageAspect] = useState<number>();
  const [cardInnerWidth, setCardInnerWidth] = useState(FIXED_PAGE_WIDTH * 2 + GAP);
  const [fullscreenPageCap, setFullscreenPageCap] = useState(FULLSCREEN_BASE_MAX);
  const [zoom, setZoom] = useState(1);
  const [failed, setFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [controlsVisible, setControlsVisible] = useState(true);
  // Starts on the small preview (if given) so a casual page view never
  // pulls the full file — the first interaction with any control upgrades
  // to the full document in the background.
  const [useFullDoc, setUseFullDoc] = useState(!previewUrl);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const documentUrl = useFullDoc || !previewUrl ? url : previewUrl;
  const spreads = useMemo(() => buildSpreads(numPages ?? 0), [numPages]);
  const currentSpread = spreads[spreadIndex] ?? [];

  function loadFullDoc() {
    if (!useFullDoc) setUseFullDoc(true);
  }

  useEffect(() => {
    const el = cardContentRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setCardInnerWidth(entry.contentRect.width);
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

  // Per-page width cap for fullscreen — whichever runs out first, viewport
  // width or height, so a tall spread never overflows a short viewport.
  useEffect(() => {
    if (!isFullscreen) return;
    function recompute() {
      const availableWidth = window.innerWidth - FULLSCREEN_MARGIN * 2;
      const availableHeight = window.innerHeight - FULLSCREEN_MARGIN * 2;
      const perPageFromWidth = (availableWidth - GAP) / 2;
      const perPageFromHeight = availableHeight * (pageAspect ?? FALLBACK_PAGE_ASPECT);
      setFullscreenPageCap(
        Math.max(100, Math.min(FULLSCREEN_BASE_MAX, perPageFromWidth, perPageFromHeight)),
      );
    }
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [isFullscreen, pageAspect]);

  // Fullscreen-only: controls float over the page and fade out once the
  // cursor stops moving, reappearing on the next movement.
  useEffect(() => {
    if (!isFullscreen) return;
    function scheduleHide() {
      clearTimeout(hideTimerRef.current);
      if (isEditingPage) return;
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_DELAY);
    }
    function handleActivity() {
      setControlsVisible(true);
      scheduleHide();
    }
    handleActivity();
    window.addEventListener("mousemove", handleActivity);
    return () => {
      clearTimeout(hideTimerRef.current);
      window.removeEventListener("mousemove", handleActivity);
    };
  }, [isFullscreen, isEditingPage]);

  function handlePageLoadSuccess(page: PageCallback) {
    setPageAspect((current) => current ?? page.originalWidth / page.originalHeight);
  }

  function goToSpread(index: number) {
    loadFullDoc();
    setSpreadIndex(Math.max(0, Math.min(index, spreads.length - 1)));
  }

  function startEditing() {
    loadFullDoc();
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

  const basePageWidth = isFullscreen
    ? fullscreenPageCap
    : Math.min(FIXED_PAGE_WIDTH, Math.max(0, (cardInnerWidth - GAP) / 2));
  const pageWidth = basePageWidth * zoom;
  const pageHeight = pageWidth / (pageAspect ?? FALLBACK_PAGE_ASPECT);

  const atFirst = spreadIndex <= 0;
  const atLast = spreadIndex >= spreads.length - 1;
  const atMinZoom = zoom <= MIN_ZOOM;
  const atMaxZoom = zoom >= MAX_ZOOM;
  const navStyle = (disabled: boolean) =>
    isFullscreen
      ? { color: disabled ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.85)" }
      : undefined;

  const displayLabel =
    currentSpread.length === 2
      ? `Pages ${currentSpread[0]}–${currentSpread[1]}`
      : `Page ${currentSpread[0] ?? "–"}`;
  const showControls = !isFullscreen || controlsVisible;
  // Fullscreen controls default to half-visible against arbitrary page
  // content, and light up (opacity + a legible backdrop chip) on hover —
  // only for enabled controls; disabled ones keep their static dim color.
  const fsBtnClass = (disabled: boolean) => isFullscreen && !disabled && "pdfr-fs-btn";

  function pauseHideTimer() {
    if (isFullscreen) clearTimeout(hideTimerRef.current);
  }
  function resumeHideTimer() {
    if (isFullscreen && !isEditingPage) {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_DELAY);
    }
  }

  const zoomGroup = (
    <div className="flex items-center gap-1">
      <IconButton
        aria-label="Zoom out"
        variant={atMinZoom ? "disabled" : "secondary"}
        disabled={atMinZoom}
        onClick={() => {
          loadFullDoc();
          setZoom((z) => Math.max(MIN_ZOOM, Math.round((z - ZOOM_STEP) * 100) / 100));
        }}
        className={cn("size-8", fsBtnClass(atMinZoom))}
        style={navStyle(atMinZoom)}
      >
        <ZoomOut className="size-4" />
      </IconButton>
      <IconButton
        aria-label="Zoom in"
        variant={atMaxZoom ? "disabled" : "secondary"}
        disabled={atMaxZoom}
        onClick={() => {
          loadFullDoc();
          setZoom((z) => Math.min(MAX_ZOOM, Math.round((z + ZOOM_STEP) * 100) / 100));
        }}
        className={cn("size-8", fsBtnClass(atMaxZoom))}
        style={navStyle(atMaxZoom)}
      >
        <ZoomIn className="size-4" />
      </IconButton>
    </div>
  );

  const paginationGroup = (
    <div className="flex items-center gap-3">
      <IconButton
        aria-label="First page"
        variant={atFirst ? "disabled" : "secondary"}
        disabled={atFirst}
        onClick={() => goToSpread(0)}
        className={cn("size-8", fsBtnClass(atFirst))}
        style={navStyle(atFirst)}
      >
        <ChevronFirst className="size-4" />
      </IconButton>
      <IconButton
        aria-label="Previous page"
        variant={atFirst ? "disabled" : "secondary"}
        disabled={atFirst}
        onClick={() => goToSpread(spreadIndex - 1)}
        className={cn("size-9", fsBtnClass(atFirst))}
        style={navStyle(atFirst)}
      >
        <ChevronLeft className="size-5" />
      </IconButton>

      <div
        className={cn(
          "flex min-w-[110px] items-center justify-center text-sm",
          isFullscreen && "px-2 py-1",
          fsBtnClass(false),
          isFullscreen && isEditingPage && "pdfr-fs-active",
        )}
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
        className={cn("size-9", fsBtnClass(atLast))}
        style={navStyle(atLast)}
      >
        <ChevronRight className="size-5" />
      </IconButton>
      <IconButton
        aria-label="Last page"
        variant={atLast ? "disabled" : "secondary"}
        disabled={atLast}
        onClick={() => goToSpread(spreads.length - 1)}
        className={cn("size-8", fsBtnClass(atLast))}
        style={navStyle(atLast)}
      >
        <ChevronLast className="size-4" />
      </IconButton>
    </div>
  );

  const maximizeButton = (
    <IconButton
      aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
      onClick={() => {
        loadFullDoc();
        setIsFullscreen((v) => !v);
      }}
      className={cn("size-8", fsBtnClass(false))}
      style={navStyle(false)}
    >
      {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
    </IconButton>
  );

  return (
    <div className="flex flex-col gap-3">
      <style>{`
        .pdfr-fs-btn {
          opacity: 0.5;
          border-radius: 8px;
          transition: opacity 200ms ease, background-color 200ms ease;
        }
        .pdfr-fs-btn:hover,
        .pdfr-fs-btn.pdfr-fs-active {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
      <div
        className={cn(
          "w-full",
          isFullscreen ? "fixed inset-0 z-50" : "rounded-xl bg-card p-6 sm:p-8",
        )}
        style={isFullscreen ? { backgroundColor: "#000" } : undefined}
      >
        <div
          className={cn("flex flex-col gap-4", isFullscreen && "h-full justify-center")}
        >
          <div ref={cardContentRef} className="w-full overflow-x-auto">
            <Document
              file={documentUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={() => setFailed(true)}
              loading={
                <div
                  className="mx-auto flex items-center justify-center text-sm text-caption"
                  style={{ width: pageWidth, height: pageHeight }}
                >
                  Loading book…
                </div>
              }
              error={
                <div
                  className="mx-auto flex items-center justify-center text-sm text-caption"
                  style={{ width: pageWidth, height: pageHeight }}
                >
                  Couldn’t load the PDF.
                </div>
              }
            >
              <div
                className="mx-auto flex items-center justify-center"
                style={{ gap: GAP, height: pageHeight, width: "fit-content" }}
              >
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

          {numPages && !failed && !isFullscreen && (
            <div className="flex w-full items-center justify-between">
              {zoomGroup}
              {paginationGroup}
              {maximizeButton}
            </div>
          )}

          {numPages && !failed && isFullscreen && (
            <>
              <div
                className="grid w-full grid-cols-3 items-center"
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  bottom: 24,
                  opacity: showControls ? 1 : 0,
                  pointerEvents: showControls ? "auto" : "none",
                  transition: "opacity 300ms",
                }}
                onMouseEnter={pauseHideTimer}
                onMouseLeave={resumeHideTimer}
              >
                <div className="justify-self-start">{zoomGroup}</div>
                <div className="justify-self-center">{paginationGroup}</div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  opacity: showControls ? 1 : 0,
                  pointerEvents: showControls ? "auto" : "none",
                  transition: "opacity 300ms",
                }}
                onMouseEnter={pauseHideTimer}
                onMouseLeave={resumeHideTimer}
              >
                {maximizeButton}
              </div>
            </>
          )}
        </div>
      </div>

      {caption && !isFullscreen && (
        <p className="max-w-[783px] text-sm text-caption">{caption}</p>
      )}
    </div>
  );
}
