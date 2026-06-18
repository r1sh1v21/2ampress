"use client";

import ScrollText from "@/components/ScrollText";

/**
 * Section 1 — "the problem". Huge, sparse type that brightens word-by-word as
 * you scroll. One thought, given the whole screen.
 */
export default function ProblemSection() {
  return (
    <section className="relative mx-auto flex min-h-[90vh] max-w-[1200px] flex-col justify-center px-5 py-32 sm:px-8">
      <p className="kicker mb-10">the 1am google search</p>
      <ScrollText
        text="It's late. You've already typed 'how to get over someone' into the search bar and closed the tab three times."
        className="text-[clamp(2rem,6vw,4.6rem)] leading-[1.05]"
      />
      <ScrollText
        text="You don't need an essay. You need one thing you can actually do right now."
        className="mt-12 max-w-3xl text-[clamp(1.6rem,4.4vw,3.2rem)] leading-[1.1] text-bone/80"
      />
    </section>
  );
}
