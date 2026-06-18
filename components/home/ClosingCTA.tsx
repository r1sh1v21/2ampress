"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { flagship } from "@/lib/books";

/**
 * Section 5 — closing CTA. Full-bleed, confident, a single line and a button.
 */
export default function ClosingCTA() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-32 text-center sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(61,42,65,0.5) 0%, rgba(22,16,25,0) 60%)",
        }}
      />
      <Reveal>
        <p className="kicker mb-8">02:00</p>
        <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.98]">
          Still awake? <span className="italic text-rose">Start</span> with one
          thing.
        </h2>
        <Link
          href={`/read/${flagship.slug}`}
          className="mt-12 inline-block rounded-full bg-bone px-9 py-4 font-medium text-ink transition-colors hover:bg-rose"
        >
          Open the book
        </Link>
      </Reveal>
    </section>
  );
}
