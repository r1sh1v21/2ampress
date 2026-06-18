import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import FormatSection from "@/components/home/FormatSection";
import PeekSection from "@/components/home/PeekSection";
import ShelfSection from "@/components/home/ShelfSection";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <FormatSection />
      <PeekSection />
      <ShelfSection />
      <ClosingCTA />
    </>
  );
}
