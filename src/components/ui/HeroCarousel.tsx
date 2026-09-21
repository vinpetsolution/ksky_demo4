"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "@/lib/motion";
import { cn } from "@/utils/classNames";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { HiArrowRight } from "react-icons/hi";
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
  const { openSignUp } = useAuthModal();

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
      <div className="relative min-w-full overflow-hidden h-50 md:h-auto md:aspect-3/1">
        {slides.map((slide, i) => {
          const hasCopy = Boolean(
            slide.eyebrow || slide.title || slide.subtitle || slide.ctaLabel,
          );

          return (
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
              {/* <div
                className="absolute left-0 h-full w-full bg-linear-to-r from-[#0c0302] via-transparent to-[#0c0302]"
              /> */}

              {/* Entity (nhân vật, cards, roulette - bên phải, ~70-75%, base chạm đáy) */}
              {/* <motion.div
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
                  style={{ width: "auto", height: "100%" }}
                  priority={i === 0}
                  draggable={false}
                />
              </motion.div> */}

              {/* Label / title on the left - scale 0.5→1, opacity 0→1, delay 400ms */}
              {/* <motion.div
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
                  style={{ width: "100%", height: "auto" }}
                  priority={i === 0}
                  draggable={false}
                />
              </motion.div> */}

              {hasCopy && (
                <motion.div
                  className="absolute left-[5%] top-1/2 z-10 w-[75%] max-w-200 -translate-y-1/2 sm:left-[8%] sm:w-[65%] lg:left-[10%] lg:w-[55%]"
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
                  {slide.eyebrow && (
                    <p className="mb-1.5 text-[10px] font-medium tracking-[0.35em] text-white uppercase sm:mb-2 sm:text-xs xl:text-sm">
                      {slide.eyebrow}
                    </p>
                  )}
                  {slide.title && (
                    <h2 className="text-xl leading-tight font-extrabold sm:text-3xl xl:text-5xl xl:leading-[1.15]">
                      {slide.title.split("\n").map((line, lineIndex) => (
                        <span
                          key={lineIndex}
                          className={cn(
                            "block",
                            lineIndex === 0
                              ? "text-white [text-shadow:0_0_18px_rgba(255,255,255,0.4)]"
                              : "bg-linear-to-b from-[#fff4c4] to-[#c9a227] bg-clip-text text-transparent",
                          )}
                        >
                          {line}
                        </span>
                      ))}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="mt-2 text-[11px] font-medium leading-relaxed tracking-wide text-white sm:mt-3 sm:text-sm xl:text-base">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.ctaLabel && (
                    <button
                      type="button"
                      onClick={openSignUp}
                      className="mt-3 inline-flex cursor-pointer items-center gap-1 rounded-full bg-linear-to-b from-[#f7e8a8] via-[#e6c34d] to-[#c9a227] px-5 py-1.5 text-xs font-semibold text-[#1a1208] transition-opacity hover:opacity-90 sm:mt-4 sm:gap-1.5 sm:px-6 sm:py-2 sm:text-sm"
                    >
                      {slide.ctaLabel}
                      <HiArrowRight className="size-3.5 sm:size-4" aria-hidden="true" />
                    </button>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {slides.length > 1 && (
          <div className="absolute bottom-3 left-[5%] z-20 flex items-center gap-2 sm:bottom-3 sm:left-[8%] lg:bottom-6 lg:left-[10%]">
            {slides.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => goTo(dotIndex)}
                className={cn(
                  "h-2 w-2 md:h-2.5 md:w-2.5 cursor-pointer rounded-full transition-colors duration-300 lg:h-3 lg:w-3",
                  dotIndex === active
                    ? "bg-[#e6c34d]"
                    : "bg-[#e8e8e8] hover:bg-[#e8e8e8]/80",
                )}
                aria-label={`Slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
