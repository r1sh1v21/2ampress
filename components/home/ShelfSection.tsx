"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import BookCard from "@/components/BookCard";
import { books, flagship } from "@/lib/books";

/**
 * Section 4 — "the shelf". A preview of the other titles, leading to /shop.
 */
export default function ShelfSection() {
  const others = books.filter((b) => b.slug !== flagship.slug).slice(0, 3);

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-32 sm:px-8">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="kicker mb-6">the shelf</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]">
              More for the small hours.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden shrink-0 text-bone/70 underline-offset-4 transition-colors hover:text-rose hover:underline sm:inline"
          >
            All titles →
          </Link>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((b, i) => (
          <Reveal key={b.slug} delay={i * 0.08}>
            <BookCard book={b} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
