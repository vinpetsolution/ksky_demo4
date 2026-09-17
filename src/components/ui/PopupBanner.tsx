"use client";

import Image from "next/image";
import { useState } from "react";

export interface PopupBannerProps {
  id: string;
  imageUrl?: string;
  imageAlt?: string;
  /** API `title` */
  title?: string;
  /** API `content` — chi tiết (내용) */
  content?: string;
  /** Nút X đỏ góc phải — chỉ đóng lần này, lần đăng nhập sau vẫn hiện */
  onDismissX: () => void;
  /** 닫기 — truyền true nếu user tick “다시 보지 않음” */
  onDismissFooter: (dontShowAgain: boolean) => void;
}

export function PopupBanner({
  id,
  imageUrl,
  imageAlt = "",
  title,
  content,
  onDismissX,
  onDismissFooter,
}: PopupBannerProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const detail = content?.trim();
  const heading = title?.trim();
  const hasImage = Boolean(imageUrl?.trim());

  const dismissXButton = (
    <button
      type="button"
      onClick={onDismissX}
      className="absolute right-2 top-2 z-10 flex size-9 items-center justify-center rounded-full bg-[#c62828] text-white shadow-md transition hover:bg-[#b71c1c]"
      aria-label="닫기"
    >
      <span className="text-xl font-bold leading-none">×</span>
    </button>
  );

  return (
    <div
      id={id}
      className="flex w-full flex-col overflow-hidden rounded-2xl border-2 border-[#edcd43] bg-[#0d1d32] shadow-2xl shadow-black/50 ring-1 ring-black/20"
    >
      {hasImage ? (
        <>
          <div className="relative w-full shrink-0 overflow-hidden bg-neutral-950">
            <Image
              src={imageUrl!}
              alt={imageAlt}
              width={520}
              height={1040}
              sizes="(max-width: 640px) 94vw, (max-width: 1024px) 420px, 440px"
              className="h-auto w-full object-contain"
            />
            {dismissXButton}
          </div>
          {detail ? (
            <div className="max-h-[min(28vh,220px)] shrink-0 overflow-y-auto border-t border-[#edcd43]/20 bg-[#0a1524] px-3 py-2.5">
              {heading ? (
                <p className="mb-1 text-xs font-semibold text-[#edcd43]">{heading}</p>
              ) : null}
              <p className="whitespace-pre-wrap wrap-break-word text-left text-xs leading-relaxed text-white/85">
                {detail}
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <div className="relative min-h-30 w-full shrink-0 overflow-y-auto bg-[#0a1524] px-4 py-5">
          {dismissXButton}
          {heading ? (
            <p className="pr-10 text-sm font-semibold text-[#edcd43]">{heading}</p>
          ) : null}
          {detail ? (
            <p
              className={`whitespace-pre-wrap wrap-break-word text-left text-sm leading-relaxed text-white/90 ${heading ? "mt-2" : "pr-10"}`}
            >
              {detail}
            </p>
          ) : null}
        </div>
      )}
      <div className="flex w-full shrink-0 items-center justify-between gap-4 border-t border-[#edcd43]/25 bg-[#0d1d32] px-4 pb-3.5 pt-2.5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/75">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="size-4 shrink-0 rounded border-white/35 bg-[#0d1d32] text-[#edcd43] accent-[#edcd43] focus:ring-2 focus:ring-[#edcd43]/40 focus:ring-offset-0"
          />
          <span>다시 보지 않음</span>
        </label>
        <button
          type="button"
          onClick={() => onDismissFooter(dontShowAgain)}
          className="shrink-0 cursor-pointer text-sm text-white/75 transition-colors hover:text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
