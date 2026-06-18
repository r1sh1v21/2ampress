"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Book } from "@/lib/books";
import BookCover from "./BookCover";

/**
 * Gallery card. The cover lifts a touch on hover and a hairline "view" cue
 * slides in — quiet, premium, no tilt or bounce. Clicking opens the book page.
 */
export default function BookCard({
  book,
  featured = false,
}: {
  book: Book;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <Link href={`/book/${book.slug}`} className="group block">
      <motion.div
        whileHover={reduce ? undefined : { y: -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-plum transition-shadow duration-500 group-hover:ring-bone/25"
        style={{ aspectRatio: featured ? "3 / 4" : "2 / 3" }}
      >
        <BookCover book={book} />
      </motion.div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl leading-tight text-bone transition-colors group-hover:text-rose">
            {book.title}
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-fog">{book.hook}</p>
        </div>
        <span className="shrink-0 font-mono text-sm text-bone/70">
          ${book.price}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-fog">
        <span className="h-px w-0 bg-rose transition-all duration-500 group-hover:w-6" />
        <span className="kicker opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          View
        </span>
      </div>
    </Link>
  );
}
