"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { books } from "@/lib/books";
import BookCard from "@/components/BookCard";

/**
 * Gallery catalog with a browse-by-mood filter. Layout is intentionally
 * uneven — the flagship spans wider, the rest fall into a varied masonry-ish
 * grid — so it never reads as a row of identical cards.
 */
export default function ShopGrid() {
  const moods = useMemo(
    () => ["all", ...Array.from(new Set(books.map((b) => b.mood)))],
    []
  );
  const [mood, setMood] = useState("all");

  const shown = books.filter((b) => mood === "all" || b.mood === mood);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-2">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
              mood === m
                ? "border-bone bg-bone text-ink"
                : "border-plum/60 text-bone/60 hover:border-bone hover:text-bone"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((b) => (
            <motion.div
              key={b.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={b.flagship ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <BookCard book={b} featured={b.flagship} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
