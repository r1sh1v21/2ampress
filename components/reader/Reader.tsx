"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import type { Entry } from "@/lib/reader";
import type { Book } from "@/lib/books";
import ReaderControls from "./ReaderControls";

const SAVED_KEY = (slug: string) => `2am-saved-${slug}`;
const SIZE_KEY = "2am-reader-size";

/**
 * The reading interface. One entry per screen, navigated page-by-page with a
 * physical horizontal transition. Keyboard (←/→), on-screen prev/next, and
 * swipe on touch. Plus focus mode, text sizing, ambient-sound toggle, and a
 * localStorage bookmark — the "save this one" state is the only rose accent.
 */
export default function Reader({
  entries,
  book,
}: {
  entries: Entry[];
  book: Book;
}) {
  const reduce = useReducedMotion();
  const [[index, dir], setPage] = useState<[number, number]>([0, 0]);
  const [focus, setFocus] = useState(false); // "dim the lights"
  const [size, setSize] = useState(1); // text scale 0.85–1.25
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [ambient, setAmbient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const entry = entries[index];
  const total = entries.length;

  // ---- persistence -------------------------------------------------------
  // Hydrate from localStorage on mount — it's unavailable during SSR, so this
  // can't be a lazy initializer. Syncing external (browser) state into React
  // is exactly what an effect is for.
  useEffect(() => {
    try {
      const s = localStorage.getItem(SAVED_KEY(book.slug));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (s) setSaved(new Set(JSON.parse(s)));
      const sz = localStorage.getItem(SIZE_KEY);
      if (sz) setSize(parseFloat(sz));
    } catch {
      /* ignore */
    }
  }, [book.slug]);

  const persistSaved = (next: Set<number>) => {
    setSaved(next);
    try {
      localStorage.setItem(SAVED_KEY(book.slug), JSON.stringify([...next]));
    } catch {
      /* ignore */
    }
  };

  // ---- navigation --------------------------------------------------------
  const paginate = useCallback(
    (delta: number) => {
      setPage(([i]) => {
        const next = Math.min(total - 1, Math.max(0, i + delta));
        return [next, Math.sign(delta) || 0];
      });
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key.toLowerCase() === "f") setFocus((f) => !f);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) paginate(1);
    else if (info.offset.x > 80) paginate(-1);
  };

  // ---- text size ---------------------------------------------------------
  const changeSize = (d: number) => {
    setSize((s) => {
      const next = Math.min(1.25, Math.max(0.85, +(s + d).toFixed(2)));
      try {
        localStorage.setItem(SIZE_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  // ---- bookmark ----------------------------------------------------------
  const toggleSaved = () => {
    const next = new Set(saved);
    if (next.has(entry.number)) next.delete(entry.number);
    else next.add(entry.number);
    persistSaved(next);
  };

  // ---- ambient sound (placeholder file, fail silently) -------------------
  const toggleAmbient = () => {
    const a = audioRef.current;
    if (!a) return;
    if (ambient) {
      a.pause();
      setAmbient(false);
    } else {
      a.volume = 0.4;
      a.play().then(
        () => setAmbient(true),
        () => setAmbient(false) // no file / blocked — keep UI honest
      );
    }
  };

  // slide transition variants
  const variants = {
    enter: (d: number) => ({
      x: reduce ? 0 : d >= 0 ? "60%" : "-60%",
      opacity: 0,
      rotateY: reduce ? 0 : d >= 0 ? -8 : 8,
    }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (d: number) => ({
      x: reduce ? 0 : d >= 0 ? "-60%" : "60%",
      opacity: 0,
      rotateY: reduce ? 0 : d >= 0 ? 8 : -8,
    }),
  };

  const progress = total > 1 ? index / (total - 1) : 1;

  return (
    <div
      className={`relative flex min-h-[100svh] flex-col transition-colors duration-700 ${
        focus ? "bg-black" : "bg-ink"
      }`}
    >
      <audio ref={audioRef} src="/ambient.mp3" loop preload="none" />

      {/* top bar — fades away in focus mode */}
      <motion.header
        animate={{ opacity: focus ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-between px-5 pt-24 sm:px-10"
      >
        <Link
          href={`/book/${book.slug}`}
          className="kicker transition-colors hover:text-bone"
        >
          ← {book.title}
        </Link>
        <span className="font-mono text-xs text-bone/50">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </motion.header>

      {/* the page */}
      <div
        className="relative flex flex-1 items-center justify-center px-6 py-10"
        style={{ perspective: 1600 }}
      >
        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.article
            key={entry.number}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="w-full max-w-[640px] cursor-grab active:cursor-grabbing"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display block text-rose/90 text-[clamp(2.5rem,9vw,5rem)] leading-none">
                № {String(entry.number).padStart(2, "0")}
              </span>
              <h1
                className="font-display mt-6 leading-[1.04]"
                style={{ fontSize: `calc(${size} * clamp(2rem,6vw,3.4rem))` }}
              >
                {entry.title}
              </h1>
              <p
                className="font-read mx-auto mt-8 text-bone/70"
                style={{
                  fontSize: `calc(${size} * 1.15rem)`,
                  lineHeight: 1.75,
                  maxWidth: "62ch",
                }}
              >
                {entry.body}
              </p>
            </motion.div>
          </motion.article>
        </AnimatePresence>

        {/* edge nav buttons (desktop) */}
        <button
          onClick={() => paginate(-1)}
          disabled={index === 0}
          aria-label="Previous"
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-plum/60 p-3 text-bone/60 transition-all hover:border-bone hover:text-bone disabled:pointer-events-none disabled:opacity-20 md:block"
        >
          ←
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={index === total - 1}
          aria-label="Next"
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-plum/60 p-3 text-bone/60 transition-all hover:border-bone hover:text-bone disabled:pointer-events-none disabled:opacity-20 md:block"
        >
          →
        </button>
      </div>

      <ReaderControls
        progress={progress}
        focus={focus}
        saved={saved.has(entry.number)}
        ambient={ambient}
        onPrev={() => paginate(-1)}
        onNext={() => paginate(1)}
        onFocus={() => setFocus((f) => !f)}
        onSave={toggleSaved}
        onAmbient={toggleAmbient}
        onSizeUp={() => changeSize(0.1)}
        onSizeDown={() => changeSize(-0.1)}
        atStart={index === 0}
        atEnd={index === total - 1}
      />
    </div>
  );
}
