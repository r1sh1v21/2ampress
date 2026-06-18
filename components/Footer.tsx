"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Footer — oversized serif wordmark, tagline, minimal links, and a live mono
 * timestamp. Quiet and premium.
 */
export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-plum bg-ink-soft">
      <div className="mx-auto max-w-[1500px] px-5 pb-12 pt-20 sm:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <Link
              href="/"
              className="font-display block leading-[0.85] tracking-tight text-bone"
              style={{ fontSize: "clamp(3rem, 12vw, 9rem)", fontWeight: 300 }}
            >
              2am<span className="text-rose">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-fog">
              real talk for whatever you&apos;re going through.
            </p>
          </div>

          <nav className="flex flex-col items-start gap-2.5">
            {[
              ["/archive", "Archive"],
              ["/read/100-things-after-a-breakup", "Read a sample"],
              ["/about", "About"],
              ["/cart", "Cart"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="link-underline text-sm text-bone/70 hover:text-bone"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-plum pt-6 text-xs text-fog sm:flex-row sm:items-center sm:justify-between">
          <Clock />
          <span className="font-mono tracking-widest">
            made for the people still awake
          </span>
          <span className="font-mono">© {new Date().getFullYear()} 2 AM Press</span>
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
  return <span className="font-mono tracking-widest">{time}</span>;
}
