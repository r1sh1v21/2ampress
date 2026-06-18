"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getEntries } from "@/lib/reader";
import { flagship } from "@/lib/books";

/**
 * Section 3 — "a peek inside". Three real sample entries rendered as styled
 * page cards, with a link into the reader.
 */
export default function PeekSection() {
  const samples = getEntries(flagship.slug).slice(0, 3);

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-32 sm:px-8">
      <Reveal>
        <p className="kicker mb-6">a peek inside</p>
        <h2 className="font-display max-w-2xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]">
          Real pages. No filler, no pep talk.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {samples.map((e, i) => (
          <Reveal key={e.number} delay={i * 0.08}>
            <article className="flex h-full flex-col border border-plum bg-coal p-7">
              <span className="font-mono text-sm text-rose">
                № {String(e.number).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-4 text-3xl leading-[0.9]">
                {e.title}
              </h3>
              <p className="font-read mt-4 text-sm leading-relaxed text-bone/55">
                {e.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <Link
          href={`/read/${flagship.slug}`}
          className="mt-12 inline-flex items-center gap-2 text-bone/80 underline-offset-4 transition-colors hover:text-rose hover:underline"
        >
          Read a sample <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
