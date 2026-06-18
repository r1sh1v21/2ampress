import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — 2 AM Press",
  description: "Why we make small, honest books for the people still awake.",
};

const STORY = [
  [
    "00",
    "Most advice is written for daylight.",
    "Confident, posture-perfect, sure of itself. It assumes you're at your best when you read it.",
  ],
  [
    "01",
    "The honest talk happens later.",
    "When the room is dark and nobody's performing for anybody. That's the hour we write for.",
  ],
  [
    "02",
    "No gurus. No glow-ups.",
    "Just the thing a friend would say if they pulled you aside for the real version of the conversation.",
  ],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1300px] px-5 pb-20 pt-40 sm:px-8">
      <header className="border-b border-plum pb-12">
        <p className="kicker mb-6">02:00 — about</p>
        <h1 className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-[1.02] text-bone">
          For the version of
          <br />
          you that&apos;s <span className="italic text-rose">still up.</span>
        </h1>
      </header>

      <section className="mt-4">
        {STORY.map(([n, head, body], i) => (
          <Reveal key={n} delay={i * 0.05}>
            <div className="grid grid-cols-1 items-start gap-6 border-b border-plum py-14 md:grid-cols-[5rem_1fr_22rem]">
              <span className="font-mono text-sm text-rose">{n}</span>
              <h2 className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.05] text-bone">
                {head}
              </h2>
              <p className="text-fog">{body}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <div className="mt-16">
          <Link
            href="/archive"
            className="group inline-flex items-center gap-3 border border-bone px-8 py-4 text-sm text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            See the books
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
