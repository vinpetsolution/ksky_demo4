"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/classNames";
import { BG_LIST, MINIBG_LIST } from "@/mocks/slides";

const MAINTENANCE_RIBBON = "/images/casino_stop.png";

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export interface GameSlotCardProps {
  title: string;
  slug: string;
  slotIndex?: number;
  isMaintenance?: boolean;
  href?: string;
  className?: string;
}

export function GameSlotCard({
  title,
  slug,
  slotIndex,
  isMaintenance = false,
  href,
  className,
}: GameSlotCardProps) {
  const bgImage = BG_LIST[hash(`${title}-${slug}`) % BG_LIST.length];
  const slotImage =
    slotIndex != null
      ? `/images/casino/slot_${slotIndex}.png`
      : MINIBG_LIST[hash(title) % MINIBG_LIST.length];
  const mainIcon = `/images/casino/main_slot_${slug}.png`;

  const content = (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden bg-[#0d1117]",
        "border border-[#4d5a8b] transition-colors duration-200",
        href && "hover:border-[#ef7c00]",
        className
      )}
    >
      {/* Thumbnail - aspect-ratio scale theo width, giữ form 254:400 */}
      <div className="relative w-full shrink-0 overflow-hidden aspect-400/254">
        {/* Background */}
        <Image
          src={bgImage}
          alt=""
          width={500}
          height={500}
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
        />

        {/* Character - center, full cover */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
          <Image
            src={slotImage}
            alt={title}
            width={500}
            height={500}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
          />
        </div>


        {/* Main icon - above character, beat animation */}
        <div className="absolute left-2 top-2 z-20 h-14 w-24 md:left-3 md:top-3 md:h-16 md:w-28 lg:left-4 lg:top-4 lg:h-20 lg:w-36">
          <Image
            src={mainIcon}
            alt=""
            fill
            className="object-contain animate-beat"
            sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 144px"
          />
        </div>

        {/* Title text - bottom center, % positioning */}
        <span className="casino_text absolute bottom-[8%] left-1/2 z-20 -translate-x-1/2 w-full px-[4%] text-[clamp(0.75rem,2.5vw,1rem)] animate-beat">
          {title}
        </span>

        {isMaintenance && (
          <div className="absolute right-0 top-0 z-30 h-10 w-10 shrink-0 md:h-12 md:w-12 lg:h-14 lg:w-14">
            <Image
              src={MAINTENANCE_RIBBON}
              alt="점검"
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className={cn(
          "game-slot-card-footer relative flex min-h-10 shrink-0 items-center border-t border-[#1d2f4b] px-[4%] py-2"
        )}
      >
        <span className="game-slot-card-title text-[clamp(0.75rem,2.5vw,1rem)] font-semibold">
          {title}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
