import type { Metadata } from "next";
import ScrollText from "@/components/ScrollText";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — 2 AM Press",
  description: "Why we make small, honest books for the people still awake.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-44 sm:px-8">
      <header className="max-w-3xl">
        <p className="kicker mb-6">02:00 — about</p>
        <h1 className="font-display text-[clamp(2.8rem,9vw,7rem)] leading-[0.92]">
          We write for the
          <br />
          version of you that&apos;s
          <br />
          <span className="italic text-rose">still up.</span>
        </h1>
      </header>

      <section className="mt-40 space-y-32">
        <ScrollText
          text="Most advice is written for daylight. Confident, posture-perfect, sure of itself."
          className="max-w-4xl text-[clamp(1.8rem,5vw,3.4rem)] leading-[1.08]"
        />
        <ScrollText
          text="But the honest conversations happen later. When the room is dark and nobody's performing for anybody."
          className="max-w-4xl text-[clamp(1.8rem,5vw,3.4rem)] leading-[1.08]"
        />

        <Reveal>
          <div className="grid gap-10 md:grid-cols-2">
            <p className="text-lg leading-relaxed text-bone/65">
              2 AM Press makes small books for those hours. Not transformations.
              Not a 30-day system. Just the kind of thing a friend would say if
              they pulled you aside for the real version of the conversation —
              the one without the audience.
            </p>
            <p className="text-lg leading-relaxed text-bone/65">
              Every title is built the same way: one small, doable thing at a
              time. You don&apos;t read them cover to cover. You open to a page,
              do the thing, and close it. Tomorrow there&apos;s another one.
              That&apos;s the whole philosophy, and it&apos;s the whole product.
            </p>
          </div>
        </Reveal>

        <ScrollText
          text="No gurus. No glow-ups. Just real talk for whatever you're going through."
          className="max-w-4xl text-[clamp(2rem,6vw,4rem)] leading-[1.05]"
        />

        <Reveal>
          <Link
            href="/shop"
            className="inline-block rounded-full border border-bone px-8 py-3.5 transition-colors hover:bg-bone hover:text-ink"
          >
            See the books →
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
