"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { flagship } from "@/lib/books";

/**
 * Closing slab — full-bleed black, one giant line, a square ember CTA.
 */
export default function ClosingCTA() {
  return (
    <section className="relative mt-10 border-t border-plum px-4 py-[16vh] sm:px-6">
      <div className="mx-auto max-w-[1300px]">
        <Reveal>
          <span className="kicker">02:00 — last call</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-6 text-[clamp(3rem,14vw,12rem)]">
            still awake?
            <br />
            start with <span className="text-rose">one.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href={`/read/${flagship.slug}`}
            className="mt-12 inline-block bg-rose px-9 py-5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-bone"
          >
            Open the book →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
