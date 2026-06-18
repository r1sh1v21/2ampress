"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import FloatingBook from "@/components/FloatingBook";
import { flagship } from "@/lib/books";

/**
 * Full-viewport hero. Asymmetric: the floating book sits right-of-center, copy
 * runs down the left. A dim radial glow sits behind the book (palette only).
 */
export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 sm:px-8">
      {/* dim ambient glow behind the book */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 -z-10 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(61,42,65,0.55) 0%, rgba(22,16,25,0) 65%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* copy column */}
        <div className="order-2 max-w-xl lg:order-1">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="kicker"
          >
            02:00 — you&apos;re still awake.
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-5 text-[clamp(3rem,11vw,8.5rem)] leading-[0.9]"
          >
            100 things
            <br />
            to do after
            <br />a <span className="italic text-rose">breakup</span>.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-md text-lg text-bone/65"
          >
            You don&apos;t need a five-year plan at 2am. You need the next ten
            minutes. One small, doable thing at a time — until the days start to
            get lighter.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <Link
              href={`/read/${flagship.slug}`}
              className="group relative overflow-hidden rounded-full border border-bone px-7 py-3 text-sm font-medium text-ink"
            >
              <span className="absolute inset-0 bg-bone transition-transform duration-300" />
              <span className="absolute inset-0 origin-left scale-x-0 bg-rose transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative">Start reading</span>
            </Link>
            <Link
              href={`/book/${flagship.slug}`}
              className="text-sm text-bone/70 underline-offset-4 transition-colors hover:text-bone hover:underline"
            >
              Get the book — ${flagship.price}
            </Link>
          </motion.div>
        </div>

        {/* book column */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <FloatingBook book={flagship} size={300} />
        </motion.div>
      </div>

      {/* scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute bottom-7 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="kicker">scroll</span>
        </motion.div>
      )}
    </section>
  );
}
