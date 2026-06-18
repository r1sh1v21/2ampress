"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import FloatingBook from "@/components/FloatingBook";
import { flagship } from "@/lib/books";

/**
 * Brutalist hero. Black canvas, hard-left giant condensed type that bleeds the
 * edge, an index-style metadata row at the foot, and the book floating off to
 * the right. No centered column, no soft fade choreography — the title is
 * unmasked with a single mechanical clip wipe.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  const line = (text: string, accent = false) => (
    <span className="block overflow-hidden">
      <motion.span
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
        className={`block ${accent ? "text-rose" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-4 pt-28 sm:px-6">
      {/* book — floats top-right, partially behind the type */}
      <div className="pointer-events-none absolute right-[2%] top-[14%] z-0 hidden opacity-90 lg:block xl:right-[6%]">
        <div className="pointer-events-auto">
          <FloatingBook book={flagship} size={260} />
        </div>
      </div>

      {/* top index bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-plum pb-3">
        <span className="kicker">№ 001 — the flagship</span>
        <span className="kicker">02:00 // still awake</span>
      </div>

      {/* the slab */}
      <h1 className="font-display relative z-10 mt-[8vh] text-[clamp(3.5rem,16vw,13rem)]">
        {line("100 things")}
        {line("to do after")}
        {line("a breakup", true)}
      </h1>

      <div className="relative z-10 mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-bone/60">
          You don&apos;t need a five-year plan at 2am. You need the next ten
          minutes. One small, doable thing at a time — until the days start to
          get lighter.
        </p>

        <div className="flex flex-wrap gap-px bg-plum">
          <Link
            href={`/read/${flagship.slug}`}
            className="bg-rose px-7 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-bone"
          >
            Start reading →
          </Link>
          <Link
            href={`/book/${flagship.slug}`}
            className="bg-coal px-7 py-4 text-sm font-bold uppercase tracking-wider text-bone transition-colors hover:bg-ink-soft"
          >
            Get it / ${flagship.price}
          </Link>
        </div>
      </div>

      {/* foot metadata index */}
      <dl className="relative z-10 mt-[8vh] grid grid-cols-2 border-t border-plum text-xs sm:grid-cols-4">
        {[
          ["format", "one thing / page"],
          ["pages", "100 total"],
          ["sample", "10 free"],
          ["price", `$${flagship.price}`],
        ].map(([k, v]) => (
          <div key={k} className="border-r border-plum px-1 py-4 last:border-r-0">
            <dt className="kicker mb-2">{k}</dt>
            <dd className="font-mono text-bone/80">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
