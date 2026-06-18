"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Book } from "@/lib/books";
import BookCover from "./BookCover";

/**
 * Gallery card for the shop. Cover lifts and tilts slightly on hover; the
 * spine-edge shadow deepens. Sizes vary by caller (featured vs standard).
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
        whileHover={reduce ? undefined : { y: -10, rotateZ: -1.2 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="relative"
        style={{ perspective: 1000 }}
      >
        <div
          className="overflow-hidden rounded-[4px] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)] ring-1 ring-bone/5 transition-shadow duration-300 group-hover:shadow-[0_40px_70px_-28px_rgba(0,0,0,0.9)]"
          style={{ aspectRatio: featured ? "3 / 4" : "2 / 3" }}
        >
          <BookCover book={book} />
        </div>
      </motion.div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <span className="kicker">{book.mood}</span>
          <h3 className="mt-1 font-display text-2xl leading-tight text-bone group-hover:text-rose">
            {book.title}
          </h3>
          <p className="mt-1 max-w-sm text-sm text-bone/55">{book.hook}</p>
        </div>
        <span className="shrink-0 font-mono text-sm text-bone/70">
          ${book.price}
        </span>
      </div>
    </Link>
  );
}
