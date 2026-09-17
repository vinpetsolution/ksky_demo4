"use client";

import { SlotVisual } from "@/components/ui/SlotVisual";
import Slot from "@/components/slot/Slot";
import { AuthGuard } from "@/components/providers/AuthGuard";

const GameSlotPage = () => {
  return (
    <AuthGuard>
      <SlotVisual />
      <Slot />
    </AuthGuard>
  );
};

export default GameSlotPage;
