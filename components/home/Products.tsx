"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import BookCard from "@/components/BookCard";
import { books } from "@/lib/books";

/**
 * The products section the user scrolls down into — the full shelf as a quiet
 * gallery grid. Each card opens its book page. Premium, restrained, generous
 * spacing.
 */
export default function Products() {
  return (
    <section id="archive" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8">
      <Reveal>
        <div className="flex items-end justify-between border-b border-plum pb-6">
          <div>
            <p className="kicker mb-4">the archive</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-none text-bone">
              Everything we&apos;ve made.
            </h2>
          </div>
          <Link
            href="/archive"
            className="link-underline hidden text-sm text-bone/70 hover:text-bone sm:inline"
          >
            View all
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((b, i) => (
          <Reveal key={b.slug} delay={(i % 3) * 0.08}>
            <BookCard book={b} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
