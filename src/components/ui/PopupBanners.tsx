"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { PopupBannerItem } from "@/types/game";
import { PopupBanner } from "./PopupBanner";
import { cn } from "@/utils/classNames";

interface PopupBannersProps {
  banners: PopupBannerItem[];
  onDismissX: (id: string) => void;
  onDismissFooter: (id: string, dontShowAgain: boolean) => void;
}

/** Ô rộng đúng 1/5 hàng (trừ gap), tính theo % container — tránh 100vw rộng hơn vùng thật → bị wrap 4+1 */
function desktopBannerSlotClass(multiRow: boolean): string {
  const cap = multiRow ? "max-w-85" : "max-w-105";
  return cn(
    "box-border flex min-h-0 min-w-0 shrink items-stretch self-start",
    "w-[calc((100%-48px)/5)] min-w-0",
    cap,
  );
}

function mobileSlideInnerClass(): string {
  /** Không ép chiều cao — chỉ giới hạn ngang; ô slide cha có max-h + scroll */
  return "w-full max-w-[min(94vw,520px)] shrink-0";
}

export function PopupBanners({
  banners,
  onDismissX,
  onDismissFooter,
}: PopupBannersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const rafRef = useRef<number | null>(null);

  const count = banners.length;
  const multiple = count > 1;
  const syncActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const idx = Math.round(el.scrollLeft / w);
    setActiveSlide(Math.min(Math.max(idx, 0), count - 1));
  }, [count]);

  const onScrollStrip = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      syncActiveFromScroll();
    });
  }, [syncActiveFromScroll]);

  useEffect(() => {
    syncActiveFromScroll();
  }, [syncActiveFromScroll, count]);

  /** Khi số banner thay đổi (đóng từng cái), giữ chỉ số slide hợp lệ + căn scroll */
  useEffect(() => {
    if (!multiple) return;
    const el = scrollRef.current;
    setActiveSlide((i) => {
      const next = Math.min(Math.max(i, 0), count - 1);
      if (el) {
        const w = el.clientWidth;
        if (w > 0) el.scrollLeft = next * w;
      }
      return next;
    });
  }, [count, multiple]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !multiple) return;
    const ro = new ResizeObserver(() => syncActiveFromScroll());
    ro.observe(el);
    return () => ro.disconnect();
  }, [multiple, syncActiveFromScroll]);

  const goToSlide = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const w = el.clientWidth;
      el.scrollTo({ left: index * w, behavior: "smooth" });
    },
    [],
  );

  if (count === 0) return null;

  const multiRow = count > 5;

  return (
    <div className={cn(
      "fixed inset-0 z-[240] flex justify-center overflow-auto bg-black/60 p-3 py-6 sm:p-4 sm:py-8",
      multiRow ? "items-start" : "items-center",
    )}>
      {/* —— Mobile: trượt ngang + chấm —— */}
      <div className="flex w-full max-w-[min(96vw,520px)] flex-col items-center sm:hidden">
        <div
          ref={scrollRef}
          onScroll={onScrollStrip}
          className="scrollbar-hide flex max-h-[min(96vh,960px)] w-full touch-pan-x snap-x snap-mandatory overflow-x-auto overflow-y-auto scroll-smooth"
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex w-full min-w-full shrink-0 snap-center snap-always justify-center self-start px-1"
            >
              <div className={cn("flex min-h-0", mobileSlideInnerClass())}>
                <PopupBanner
                  id={banner.id}
                  imageUrl={banner.imageUrl}
                  imageAlt={banner.imageAlt}
                  title={banner.title}
                  content={banner.content}
                  onDismissX={() => onDismissX(banner.id)}
                  onDismissFooter={(dontShowAgain) =>
                    onDismissFooter(banner.id, dontShowAgain)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        {multiple && (
          <div className="mt-3 flex max-w-full flex-wrap justify-center gap-2 px-2">
            {banners.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`배너 ${i + 1}`}
                onClick={() => goToSlide(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-200",
                  i === activeSlide
                    ? "w-8 bg-white"
                    : "w-2 bg-white/35 hover:bg-white/55",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* —— Desktop: 1–5 tấm = 1 hàng (nowrap); ô = 20% cha (không dùng 100vw); ≥6 wrap 5/hàng —— */}
      <div
        className={cn(
          "hidden w-[min(1720px,calc(100vw-3.5rem))] max-w-full shrink-0 flex-row justify-center gap-3 px-1 sm:flex",
          count <= 5 ? "sm:flex-nowrap" : "sm:flex-wrap",
        )}
      >
        {banners.map((banner) => (
          <div key={banner.id} className={desktopBannerSlotClass(multiRow)}>
            <PopupBanner
              id={banner.id}
              imageUrl={banner.imageUrl}
              imageAlt={banner.imageAlt}
              title={banner.title}
              content={banner.content}
              onDismissX={() => onDismissX(banner.id)}
              onDismissFooter={(dontShowAgain) =>
                onDismissFooter(banner.id, dontShowAgain)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
