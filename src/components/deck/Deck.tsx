import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Grid3x3, X } from "lucide-react";
import { slides } from "./slides";

export function Deck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = slides.length;

  const go = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(Math.max(0, Math.min(total - 1, next)));
  }, [index, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showGrid) {
        if (e.key === "Escape") setShowGrid(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); go(index + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(index - 1); }
      else if (e.key === "g" || e.key === "G") setShowGrid(true);
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total, showGrid]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const Current = slides[index].component;

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-cream">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 h-[3px] bg-ink/10">
        <motion.div
          className="h-full bg-gold"
          initial={false}
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Slide stage */}
      <div
        className="absolute inset-0"
        onClick={(e) => {
          const w = window.innerWidth;
          if (w < 768) return; // allow normal touch scrolling on mobile
          const x = e.clientX;
          if (x > w * 0.7) go(index + 1);
          else if (x < w * 0.3) go(index - 1);
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5">
        <div className="pointer-events-auto flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-soft">
          <span className="font-medium">Roomy's</span>
          <span className="text-ink/30">/</span>
          <span>Pitch Deck</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => go(index - 1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-cream/80 backdrop-blur transition hover:border-ink/40 hover:bg-cream"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="min-w-[64px] text-center text-xs uppercase tracking-[0.25em] text-ink-soft tabular-nums">
            {String(index + 1).padStart(2, "0")} <span className="text-ink/30">/</span> {String(total).padStart(2, "0")}
          </div>
          <button
            onClick={() => go(index + 1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-cream/80 backdrop-blur transition hover:border-ink/40 hover:bg-cream"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowGrid(true)}
            className="ml-2 grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-cream/80 backdrop-blur transition hover:border-ink/40 hover:bg-cream"
            aria-label="Overview"
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-cream/80 backdrop-blur transition hover:border-ink/40 hover:bg-cream"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Thumbnail overview */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 overflow-auto bg-ink/95 p-10 backdrop-blur"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.3em] text-cream/60">Slide overview</div>
              <button
                onClick={() => setShowGrid(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream transition hover:bg-cream/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {slides.map((s, i) => {
                const C = s.component;
                return (
                  <button
                    key={i}
                    onClick={() => { go(i); setShowGrid(false); }}
                    className={`group relative aspect-[16/10] overflow-hidden rounded-lg border-2 bg-cream text-left transition ${
                      i === index ? "border-gold" : "border-transparent hover:border-cream/30"
                    }`}
                  >
                    <div className="absolute inset-0 origin-top-left scale-[0.2] [width:500%] [height:500%] pointer-events-none">
                      <C />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-cream">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span className="truncate">{s.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
