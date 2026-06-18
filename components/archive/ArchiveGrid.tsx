"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { books } from "@/lib/books";
import BookCard from "@/components/BookCard";

/**
 * Archive grid with a quiet browse-by-mood filter. The flagship spans wider so
 * the layout breathes unevenly rather than reading as a uniform grid.
 */
export default function ArchiveGrid() {
  const moods = useMemo(
    () => ["all", ...Array.from(new Set(books.map((b) => b.mood)))],
    []
  );
  const [mood, setMood] = useState("all");

  const shown = books.filter((b) => mood === "all" || b.mood === mood);

  return (
    <div>
      <div className="mb-14 flex flex-wrap gap-x-6 gap-y-3">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            data-active={mood === m}
            className={`link-underline font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
              mood === m ? "text-bone" : "text-fog hover:text-bone"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((b) => (
            <motion.div
              key={b.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
