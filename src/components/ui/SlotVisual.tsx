"use client";

import Image from "next/image";

export function SlotVisual() {
  return (
    <div className="relative h-60 w-full overflow-hidden border-y border-[#454462] bg-[#420e06] xl:h-121">
      {/* Background */}
      <Image
        src="/images/slot_visual/visual_bg_02.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />

      {/* Gradient mask */}
      <div className="absolute inset-0 bg-linear-to-r from-[#420e06] via-transparent to-[#420e06]" />

      {/* Entity - luôn giữa, full height, tỉ lệ 800/484 */}
      <div className="absolute bottom-0 left-1/2 top-0 h-full -translate-x-1/2 aspect-800/484">
        <Image
          src="/images/slot_visual/visual_entity_02.png"
          alt=""
          fill
          sizes="(max-width: 1280px) 50vw, 800px"
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}
