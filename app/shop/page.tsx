import type { Metadata } from "next";
import ShopGrid from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Shop — 2 AM Press",
  description: "Short, honest ebooks for the people still awake.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-36 sm:px-8">
      <header className="mb-16 max-w-2xl">
        <p className="kicker mb-5">the shelf</p>
        <h1 className="font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.95]">
          Everything we&apos;ve been
          <br />
          up <span className="text-rose">late</span> writing.
        </h1>
        <p className="mt-6 text-lg text-bone/60">
          Small books for specific nights. Pick the one that matches where you
          are right now.
        </p>
      </header>

      <ShopGrid />
    </div>
  );
}
