"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/components/CartContext";

/**
 * Cart UI only — reads from CartContext. Checkout is mocked/disabled with a
 * clear note that payments aren't wired. Empty state is charming + on-brand.
 */
export default function CartPage() {
  const { lines, subtotal, count, setQty, remove, clear } = useCart();

  if (count === 0) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-[800px] flex-col items-center justify-center px-5 pt-32 text-center">
        <p className="kicker mb-6">02:00</p>
        <h1 className="font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.98]">
          Your cart&apos;s as empty
          <br />
          as the group chat.
        </h1>
        <p className="mt-5 max-w-sm text-bone/55">
          Nothing in here yet. Go find the book for the night you&apos;re having.
        </p>
        <Link
          href="/shop"
          className="mt-9 rounded-full bg-bone px-8 py-3.5 font-medium text-ink transition-colors hover:bg-rose"
        >
          Browse the shelf
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-5 pb-24 pt-36 sm:px-8">
      <div className="mb-12 flex items-end justify-between">
        <h1 className="font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-none">
          Cart
        </h1>
        <button
          onClick={clear}
          className="font-mono text-xs uppercase tracking-widest text-bone/40 transition-colors hover:text-rose"
        >
          Clear all
        </button>
      </div>

      <ul className="border-t border-plum/40">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.li
              key={l.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-plum/40 py-6"
            >
              <div className="min-w-0">
                <Link
                  href={`/book/${l.slug}`}
                  className="font-display text-2xl leading-tight transition-colors hover:text-rose"
                >
                  {l.title}
                </Link>
                <p className="mt-1 font-mono text-xs text-bone/40">
                  ${l.price} each
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 rounded-full border border-plum/60 px-3 py-1">
                  <button
                    onClick={() => setQty(l.slug, l.qty - 1)}
                    className="text-bone/60 transition-colors hover:text-bone"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-mono text-sm">
                    {l.qty}
                  </span>
                  <button
                    onClick={() => setQty(l.slug, l.qty + 1)}
                    className="text-bone/60 transition-colors hover:text-bone"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="w-16 text-right font-mono text-sm">
                  ${l.qty * l.price}
                </span>
                <button
                  onClick={() => remove(l.slug)}
                  className="text-bone/30 transition-colors hover:text-rose"
                  aria-label={`Remove ${l.title}`}
                >
                  ✕
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-10 flex flex-col items-end gap-4">
        <div className="flex w-full max-w-xs items-baseline justify-between">
          <span className="text-bone/50">Subtotal</span>
          <span className="font-display text-3xl">${subtotal}</span>
        </div>
        <button
          disabled
          className="cursor-not-allowed rounded-full bg-plum/60 px-9 py-4 font-medium text-bone/50"
        >
          Checkout
        </button>
        <p className="font-mono text-xs text-bone/35">
          payments aren&apos;t wired yet — this is a preview storefront.
        </p>
      </div>
    </div>
  );
}
