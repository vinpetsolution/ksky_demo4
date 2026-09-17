"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "@/lib/motion";
import { cn } from "@/utils/classNames";
import type { CarouselSlide } from "@/types/game";

interface HeroCarouselProps {
  slides: CarouselSlide[];
  interval?: number;
}

const AUTO_PLAY_MS = 3000;

export default function HeroCarousel({
  slides,
  interval = AUTO_PLAY_MS,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  const goTo = useCallback(
    (i: number) => {
      setActive(i);
      setTick((t) => t + 1);
    },
    [],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [tick, slides.length, interval]);

  if (slides.length === 0) return null;

  return (
    <section className="w-full border-y border-[#454462]">
      <div className="relative min-w-full overflow-hidden h-50 xl:h-91">
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ background: slide.bgColor }}
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              pointerEvents: i === active ? "auto" : "none",
              zIndex: i === active ? 10 : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            {/* Background */}
            <Image
              src={slide.bgImage}
              alt=""
              width={2500}
              height={364}
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center pointer-events-none"
              priority={i === 0}
              draggable={false}
            />

            {/* Gradient mask */}
            <div
              className="absolute left-0 h-full w-full bg-linear-to-r from-[#0c0302] via-transparent to-[#0c0302]"
            />

            {/* Entity (nhân vật, cards, roulette - bên phải, ~70-75%, base chạm đáy) */}
            <motion.div
              className="absolute bottom-0 left-[45%] right-0 top-0 min-w-[40%] pointer-events-none origin-bottom-right"
              initial={false}
              animate={
                i === active
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.5, y: "100%" }
              }
              transition={
                i === active
                  ? { duration: 0.4, delay: 0.2 }
                  : { duration: 0 }
              }
            >
              <Image
                src={slide.entityImage}
                alt=""
                width={800}
                height={364}
                className="h-full w-auto object-contain object-bottom-right"
                style={{ width: 'auto', height: '100%' }}
                priority={i === 0}
                draggable={false}
              />
            </motion.div>

            {/* Label / title on the left - scale 0.5→1, opacity 0→1, delay 400ms, không thu về khi inactive */}
            <motion.div
              className="absolute left-[5%] top-1/2 w-[75%] max-w-200 -translate-y-1/2 sm:left-[8%] sm:w-[65%] lg:left-[10%] lg:w-[55%]"
              initial={false}
              animate={
                i === active
                  ? { opacity: 1, scale: 1, x: 0 }
                  : { opacity: 0, scale: 0.5, x: "-25%" }
              }
              transition={
                i === active
                  ? { duration: 0.4, delay: 0.4 }
                  : { duration: 0 }
              }
            >
              <Image
                src={slide.labelImage}
                alt=""
                width={800}
                height={364}
                className="w-full h-auto object-contain object-left pointer-events-none"
                style={{ width: '100%', height: 'auto' }}
                priority={i === 0}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Dot navigation */}
        {slides.length > 1 && (
          <div className="absolute left-1/2 bottom-4 z-20 flex -translate-x-1/2 items-center justify-center gap-5 sm:bottom-6 lg:bottom-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "cursor-pointer rounded-full transition-all duration-300",
                  i === active
                    ? "h-3 w-3 bg-[#ffc967] shadow-[0_0_20px_5px_#ffc967] xl:h-4 xl:w-4"
                    : "h-2 w-2 bg-[#42425f] hover:bg-[#42425f]/80 xl:h-2.5 xl:w-2.5",
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
