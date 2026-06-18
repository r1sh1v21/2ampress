"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Book } from "@/lib/books";
import BookCover from "./BookCover";

/**
 * A book rendered as a faux-3D object: a cover face with a real spine and a
 * stack of page edges built from layered divs (preserve-3d), not a flat image.
 *
 * Behaviour:
 *  - idle float forever (gentle vertical bob + a few degrees of X/Y rotation)
 *  - tilts toward the cursor (damped parallax) on pointer-capable devices
 *  - soft shadow beneath that reacts to the float
 *  - reduced-motion: holds still, no idle loop, no cursor tilt
 *  - touch: no cursor tilt (no pointer); idle float remains
 */
export default function FloatingBook({
  book,
  size = 320,
}: {
  book: Book;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Pointer position, normalized to [-0.5, 0.5], smoothed by a spring.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  // Map cursor → rotation. Limited to a few degrees so it stays elegant.
  const rotY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const rotX = useTransform(sy, [-0.5, 0.5], [12, -12]);

  function handleMove(e: React.PointerEvent) {
    if (reduce || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  const depth = Math.round(size * 0.085); // spine / page-stack thickness
  const height = Math.round(size * 1.5); // book aspect ~2:3

  // Idle loop disabled under reduced motion.
  const idle = reduce
    ? {}
    : {
        y: [0, -14, 0],
        rotateZ: [-1.2, 1.2, -1.2],
        transition: {
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="relative select-none"
      style={{ width: size, height, perspective: 1400 }}
    >
      {/* responsive soft shadow */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute left-1/2 -z-10 rounded-[50%]"
          style={{
            bottom: -28,
            width: size * 0.72,
            height: 26,
            x: "-50%",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(6px)",
          }}
          animate={{ scaleX: [1, 0.86, 1], opacity: [0.55, 0.38, 0.55] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* outer wrapper carries the idle float */}
      <motion.div
        className="h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={idle}
      >
        {/* inner wrapper carries the cursor tilt */}
        <motion.div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            rotateX: rotX,
            rotateY: rotY,
          }}
        >
          {/* page edges — a stack on the right, pushed back in Z */}
          <div
            aria-hidden
            className="absolute right-0 top-[1.5%] h-[97%]"
            style={{
              width: depth,
              transform: `rotateY(90deg) translateZ(${size - depth / 2}px)`,
              transformOrigin: "right center",
              background:
                "repeating-linear-gradient(90deg, #ebdbe0 0px, #ebdbe0 1px, #cdb9c0 1px, #cdb9c0 3px)",
            }}
          />
          {/* spine — on the left, the binding */}
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full"
            style={{
              width: depth,
              transform: `rotateY(-90deg) translateZ(${depth / 2}px)`,
              transformOrigin: "left center",
              background: `linear-gradient(${book.cover.base}, #161019)`,
              boxShadow: "inset -6px 0 10px rgba(0,0,0,0.5)",
            }}
          />
          {/* front cover face */}
          <div
            className="absolute inset-0 overflow-hidden rounded-r-[3px] rounded-l-[1px]"
            style={{
              transform: `translateZ(${depth / 2}px)`,
              boxShadow:
                "0 30px 60px -20px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(235,219,224,0.06)",
            }}
          >
            <BookCover book={book} />
            {/* glossy light sweep */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(235,219,224,0.14) 0%, rgba(235,219,224,0) 40%)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
