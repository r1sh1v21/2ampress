"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useCart } from "./CartContext";
import Avatar from "./Avatar";
import MobileMenu from "./MobileMenu";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
  { href: "/cart", label: "Cart" },
];

/**
 * Scroll-aware navbar. Wordmark left, centered links, account avatar right.
 * Hides on scroll-down, reveals on scroll-up, and fades in a blurred backing
 * once scrolled. The "Cart" link carries a live item count.
 */
export default function Nav() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { count } = useCart();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 120 && y > last && !menuOpen) setHidden(true);
      else setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !reduce ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? "border-b border-plum/70 bg-ink/65 backdrop-blur-xl"
              : "border-b border-transparent"
          }`}
        >
          <div className="mx-auto grid max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center px-5 py-4 sm:px-8">
            {/* left: wordmark */}
            <Link href="/" className="justify-self-start">
              <span className="text-lg font-medium tracking-tight text-bone">
                2<span className="text-fog">ampress</span>
              </span>
            </Link>

            {/* center: links */}
            <nav className="hidden items-center gap-9 justify-self-center md:flex">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  data-active={isActive(l.href)}
                  className={`link-underline text-[0.8rem] uppercase tracking-[0.14em] transition-colors ${
                    isActive(l.href) ? "text-bone" : "text-bone/55 hover:text-bone"
                  }`}
                >
                  {l.label === "Cart" ? (
                    <span>
                      Cart
                      {count > 0 && (
                        <span className="ml-1 font-mono text-rose">
                          ({count})
                        </span>
                      )}
                    </span>
                  ) : (
                    l.label
                  )}
                </Link>
              ))}
            </nav>

            {/* right: account + mobile trigger */}
            <div className="flex items-center gap-4 justify-self-end">
              <Avatar />
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="flex flex-col gap-[5px] md:hidden"
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
