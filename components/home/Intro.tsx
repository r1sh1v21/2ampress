"use client";

import { motion, useReducedMotion } from "motion/react";
import FloatingBook from "@/components/FloatingBook";
import { flagship } from "@/lib/books";

/**
 * Home hero — a simple "about us" statement set in quiet serif, with the
 * floating book alongside. Premium and spare: lots of black, one moment of
 * motion, a gentle line-by-line settle on the copy.
 */
export default function Intro() {
  const reduce = useReducedMotion();

  const line = (text: string, i: number, cls = "") => (
    <span className="block overflow-hidden">
      <motion.span
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`block ${cls}`}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section className="relative flex min-h-[100svh] items-center px-5 pt-28 sm:px-8">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* about copy */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="kicker mb-8"
          >
            2 AM Press — est. for the still-awake
          </motion.p>

          <h1 className="font-display text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[1.05] text-bone">
            {line("We make small, honest", 0)}
            {line("books for the hours", 1)}
            {line("after midnight —", 2)}
            {line("read one thing,", 3, "text-fog")}
            {line("feel a little lighter.", 4, "text-fog")}
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 flex items-center gap-5"
          >
            <a
              href="#archive"
              className="group flex items-center gap-3 text-sm text-bone/80 transition-colors hover:text-bone"
            >
              <span className="link-underline">Browse the books</span>
              <span className="transition-transform duration-500 group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </motion.div>
        </div>

        {/* floating book */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <FloatingBook book={flagship} size={300} />
        </motion.div>
      </div>
    </section>
  );
}
