"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";

const STEPS = [
  { n: "01", t: "Open to any page", b: "There's no order to follow, no chapter one. Land on whatever you land on." },
  { n: "02", t: "Do the one thing", b: "Small enough to actually finish tonight. Big enough to feel a little different." },
  { n: "03", t: "Close it", b: "That's the whole assignment. Come back tomorrow, or in an hour, or next week." },
];

/**
 * Section 2 — "what this is". A horizontal-drifting strip of step cards driven
 * by vertical scroll, explaining the one-thing-at-a-time format.
 */
export default function FormatSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  return (
    <section ref={ref} className="overflow-hidden py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-6">the format</p>
          <h2 className="font-display max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]">
            One small thing at a time. That&apos;s the entire method.
          </h2>
        </Reveal>
      </div>

      <motion.div
        style={{ x: reduce ? 0 : x }}
        className="mt-16 flex gap-6 px-5 sm:px-8"
      >
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="w-[78vw] shrink-0 rounded-xl border border-plum/60 bg-plum/20 p-8 sm:w-[360px]"
          >
            <span className="font-mono text-sm text-rose">{s.n}</span>
            <h3 className="font-display mt-6 text-3xl">{s.t}</h3>
            <p className="mt-3 text-bone/60">{s.b}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
