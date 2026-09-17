"use client";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { CASINO_CARDS, CASINO_SLIDES } from "@/mocks/slides";
import { CasinoCard } from "@/components/ui/CasinoCard";

export default function Home() {
  return (
    <>
      <HeroCarousel slides={CASINO_SLIDES} />
      <div className="grid grid-cols-1 gap-4 px-6 py-10 md:grid-cols-3 lg:grid-cols-5">
        {CASINO_CARDS.slice(0, 10).map((card, i) => (
          <CasinoCard key={i} {...card} />
        ))}
      </div>
    </>
  );
}
