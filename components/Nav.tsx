"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useCart } from "./CartContext";
import MobileMenu from "./MobileMenu";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/read/100-things-after-a-breakup", label: "Read" },
  { href: "/about", label: "About" },
];

/**
 * Scroll-aware navbar: hides on scroll down, reveals on scroll up, and gains a
 * blurred plum backing once you've scrolled past the hero.
 */
export default function Nav() {
  const reduce = useReducedMotion();
  const { count } = useCart();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // don't hide while near the top or when menu is open
      if (y > 120 && y > last && !menuOpen) setHidden(true);
      else setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !reduce ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? "border-b border-plum/60 bg-ink/70 backdrop-blur-md"
              : "border-b border-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">
            <Link href="/" className="group flex items-baseline gap-2">
              <span className="font-display text-2xl leading-none tracking-tight">
                2<span className="text-rose">AM</span>
              </span>
              <span className="kicker hidden sm:inline">Press</span>
            </Link>

            <nav className="hidden items-center gap-9 md:flex">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group relative text-sm text-bone/75 transition-colors hover:text-bone"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-rose transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <CartLink count={count} />
            </nav>

            <div className="flex items-center gap-5 md:hidden">
              <CartLink count={count} />
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="flex flex-col gap-[5px]"
              >
                <span className="h-px w-6 bg-bone" />
                <span className="h-px w-6 bg-bone" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu links={LINKS} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function CartLink({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      className="relative text-sm text-bone/75 transition-colors hover:text-bone"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <span className="font-mono text-xs tracking-widest">CART</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 font-mono text-[10px] text-ink"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
