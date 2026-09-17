'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { CASINO_CARDS, MINIBG_LIST } from '@/mocks/slides';

const VENDOR_NAMES = [
  '에볼루션',
  '프라그마틱',
  '드림게이밍',
  '빅게이밍',
  '에즈기',
  '마이크로게이밍',
  '오리엔탈',
  '플레이텍',
  '섹시게이밍',
  '비보게이밍',
];

export default function Casino() {
  return (
    <div className="grid grid-cols-1 gap-4 px-6 py-10 md:grid-cols-3 lg:grid-cols-4">
      {CASINO_CARDS.map((card, index) => {
        const vendorName = VENDOR_NAMES[index] ?? `Casino ${index + 1}`;
        const minibgImage = card.minibgImage || MINIBG_LIST[index % MINIBG_LIST.length];

        return (
          <div
            key={`${card.mainIcon}-${index}`}
            className="relative w-full cursor-pointer transition-all duration-300 group"
            onClick={() => toast.info('데모 페이지입니다.')}
          >
            <div className="relative aspect-400/170 w-full overflow-hidden border transition-colors duration-200 border-[#4d5a8b] hover:border-[#ef7c00] bg-linear-to-r from-[#0a0f1a] to-[#1a2035]">
              <div className="absolute right-0 bottom-0 z-10 h-full w-[55%] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={minibgImage}
                  alt=""
                  fill
                  className="object-contain object-bottom-right"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="absolute left-2 top-1/2 z-20 h-14 w-28 -translate-y-1/2 md:left-4 md:h-16 md:w-32 lg:h-16 lg:w-32 xl:h-20 xl:w-40">
                <Image
                  src={card.mainIcon}
                  alt={vendorName}
                  fill
                  className="w-full h-full object-contain animate-pulse"
                  sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, (max-width: 1280px) 144px, 160px"
                />
              </div>
              <div className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 z-22">
                <p
                  className="text-center animate-beat casino_text text-sm font-extrabold leading-snug tracking-tight sm:text-base md:text-lg lg:text-xl break-keep line-clamp-2"
                  title={vendorName}
                >
                  {vendorName}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
