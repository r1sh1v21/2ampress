"use client";

import Link from "next/link";
import { motion } from "motion/react";

/**
 * Full-screen overlay menu with large type and a staggered open animation.
 * Rendered inside Nav's <AnimatePresence> so close animates too.
 */
export default function MobileMenu({
  links,
  onClose,
}: {
  links: { href: string; label: string }[];
  onClose: () => void;
}) {
  const items = [...links, { href: "/cart", label: "Cart" }];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[120] flex flex-col bg-ink/95 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-display text-2xl">
          2<span className="text-rose">AM</span>
        </span>
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="font-mono text-xs tracking-widest text-bone/70"
        >
          CLOSE ✕
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-3 px-6">
        {items.map((l, i) => (
          <motion.div
            key={l.href}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={l.href}
              onClick={onClose}
              className="font-display text-6xl leading-tight text-bone transition-colors hover:text-rose"
            >
              {l.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <p className="kicker px-6 py-8">02:00 — made for the people still awake</p>
    </motion.div>
  );
}
