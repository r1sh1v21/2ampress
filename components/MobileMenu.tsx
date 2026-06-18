"use client";

import Link from "next/link";
import { motion } from "motion/react";

/**
 * Full-screen overlay menu — large serif links, staggered in. Premium + quiet.
 */
export default function MobileMenu({
  links,
  onClose,
}: {
  links: { href: string; label: string }[];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[120] flex flex-col bg-ink/97 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-lg font-medium tracking-tight">
          2<span className="text-fog">ampress</span>
        </span>
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="kicker text-bone/70"
        >
          Close ✕
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
        {links.map((l, i) => (
          <motion.div
            key={l.href}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={l.href}
              onClick={onClose}
              className="font-display text-6xl text-bone transition-colors hover:text-rose"
            >
              {l.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <p className="kicker px-6 py-8">02:00 — for the people still awake</p>
    </motion.div>
  );
}
