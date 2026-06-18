import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — 2 AM Press",
  description: "Why we make small, honest books for the people still awake.",
};

const STORY = [
  ["00", "Most advice is written for daylight.", "Confident, posture-perfect, sure of itself. It assumes you're at your best when you read it."],
  ["01", "The honest talk happens later.", "When the room is dark and nobody's performing for anybody. That's the hour we write for."],
  ["02", "No gurus. No glow-ups.", "Just the thing a friend would say if they pulled you aside for the real version of the conversation."],
];

export default function AboutPage() {
  return (
    <div className="pt-28">
      <header className="mx-auto max-w-[1300px] px-4 sm:px-6">
        <div className="border-b border-plum pb-3">
          <span className="kicker">02:00 // about</span>
        </div>
        <h1 className="font-display mt-[8vh] text-[clamp(3rem,15vw,12rem)]">
          for the version
          <br />
          of you that&apos;s
          <br />
          <span className="text-rose">still up.</span>
        </h1>
      </header>

      <Marquee
        text="not a transformation — not a 30-day system — just a book —"
        className="mt-[10vh]"
      />

      {/* numbered ledger of the brand story */}
      <section className="mx-auto mt-[10vh] max-w-[1300px] px-4 sm:px-6">
        {STORY.map(([n, head, body], i) => (
          <Reveal key={n} delay={i * 0.05}>
            <div className="grid grid-cols-1 items-start gap-6 border-t border-plum py-12 md:grid-cols-[6rem_1fr_24rem]">
              <span className="font-mono text-sm text-rose">{n}</span>
              <h2 className="font-display text-[clamp(1.8rem,5vw,3.6rem)] leading-[0.9]">
                {head}
              </h2>
              <p className="font-read text-sm leading-relaxed text-bone/55">
                {body}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto mt-[6vh] max-w-[1300px] px-4 pb-10 sm:px-6">
        <Reveal>
          <Link
            href="/shop"
            className="inline-block bg-rose px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-bone"
          >
            See the books →
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
