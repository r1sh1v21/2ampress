"use client";

import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";

/**
 * "The problem", restated as a brutalist block — a numbered statement set in
 * giant condensed type with a ticker underneath. No scroll-linked word fade.
 */
export default function ProblemSection() {
  return (
    <section className="relative py-28">
      <Marquee text="how to get over someone — closed the tab — opened it again —" />

      <div className="mx-auto mt-24 max-w-[1300px] px-4 sm:px-6">
        <Reveal>
          <span className="kicker">01 / the 1am search</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-6 max-w-5xl text-[clamp(2.4rem,8vw,7rem)]">
            you don&apos;t need
            <br />
            an essay. you need
            <br />
            <span className="text-rose">one thing</span> to do now.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-md text-sm leading-relaxed text-bone/55">
            It&apos;s late. You&apos;ve already typed it into the search bar and
            closed the tab three times. This is the opposite of that — no
            spiral, no 14-step framework. Just the next move.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
