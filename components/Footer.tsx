"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * On-brand footer: oversized wordmark, tagline, minimal links, and a live mono
 * timestamp detail. Not a four-column link dump.
 */
export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-plum/40 bg-ink-soft">
      <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-16 sm:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <Link
              href="/"
              className="font-display leading-[0.82] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
            >
              2 AM<span className="text-rose">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-bone/60">
              real talk for whatever you&apos;re going through.
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-bone/70">
            <Link href="/shop" className="transition-colors hover:text-bone">
              Shop
            </Link>
            <Link
              href="/read/100-things-after-a-breakup"
              className="transition-colors hover:text-bone"
            >
              Read a sample
            </Link>
            <Link href="/about" className="transition-colors hover:text-bone">
              About
            </Link>
            <Link href="/cart" className="transition-colors hover:text-bone">
              Cart
            </Link>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-plum/30 pt-6 text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <Clock />
          <span className="font-mono text-xs tracking-widest">
            made for the people still awake
          </span>
          <span className="font-mono text-xs">
            © {new Date().getFullYear()} 2 AM Press
          </span>
        </div>
      </div>
    </footer>
  );
}

function Clock() {
  const [time, setTime] = useState("02:00:00");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-xs tracking-widest">{time}</span>;
}
