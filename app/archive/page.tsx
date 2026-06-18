import type { Metadata } from "next";
import ArchiveGrid from "@/components/archive/ArchiveGrid";

export const metadata: Metadata = {
  title: "Archive — 2 AM Press",
  description: "Short, honest ebooks for the people still awake.",
};

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-40 sm:px-8">
      <header className="mb-14 max-w-2xl border-b border-plum pb-10">
        <p className="kicker mb-6">the archive</p>
        <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] text-bone">
          Everything we&apos;ve been
          <br />
          up <span className="italic text-rose">late</span> writing.
        </h1>
        <p className="mt-7 max-w-md text-fog">
          Small books for specific nights. Pick the one that matches where you
          are right now.
        </p>
      </header>

      <ArchiveGrid />
    </div>
  );
}
