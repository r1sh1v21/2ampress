"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Big editorial line whose words brighten from muted to full as the block
 * passes through the viewport — a scroll-linked reveal, not a fade-on-load.
 * The text stays legible at all times (we lerp opacity between 0.18 and 1).
 */
export default function ScrollText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  if (reduce) {
    return (
      <p ref={ref} className={`font-display ${className}`}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={`font-display ${className}`}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          range={[i / words.length, (i + 1.4) / words.length]}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="inline-block">
      <motion.span style={{ opacity }}>{word}</motion.span>
      {" "}
    </span>
  );
}
