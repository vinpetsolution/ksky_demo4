"use client";

import HeroCarousel from "@/components/ui/HeroCarousel";
import { CASINO_SLIDES } from "@/mocks/slides";
import Casino from "@/components/casino/Casino";
import { AuthGuard } from "@/components/providers/AuthGuard";

const GameCasinoPage = () => {
  return (
    <AuthGuard>
      <HeroCarousel slides={CASINO_SLIDES} />
      <Casino />
    </AuthGuard>
  );
};

export default GameCasinoPage;
