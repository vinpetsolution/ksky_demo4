'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { SLOT_CARDS } from '@/mocks/slides';

export default function Slot() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SLOT_CARDS;
    return SLOT_CARDS.filter((card) => card.title.toLowerCase().includes(q) || card.slug.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-md py-6">
        <div className="relative">
          <input
            type="text"
            placeholder="게임 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#4d5a8b] bg-[#1a1f2e] px-4 py-3 pr-10 text-white shadow-sm transition-colors focus:border-[#ef7c00] focus:outline-none focus:ring-2 focus:ring-[#ef7c00]"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="h-5 w-5 text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Clear search"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 py-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:px-5">
        {filteredVendors.map((vendor) => {
          const slotImage =
            vendor.slotIndex != null
              ? `/images/casino/slot_${vendor.slotIndex}.png`
              : '/images/casino/slot_1.png';
          const mainIcon = `/images/casino/main_slot_${vendor.slug}.png`;

          return (
            <div
              key={`${vendor.slug}-${vendor.title}`}
              className="group relative overflow-hidden border border-[#4d5a8b] hover:border-[#ef7c00] transition-colors cursor-pointer"
              onClick={() => toast.info('데모 페이지입니다.')}
            >
              <div className="relative h-30 bg-[#11141d]">
                <div className="absolute right-0 -bottom-0.5 h-30.5 transition-all duration-300 group-hover:scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slotImage}
                    alt=""
                    className="h-full w-auto object-contain grayscale-[0.6] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-28 md:left-7.5 md:h-14 md:w-32">
                  <Image
                    src={mainIcon}
                    alt={vendor.title}
                    fill
                    className="object-contain object-left brightness-90 group-hover:brightness-100 transition-all duration-300"
                    sizes="(max-width: 768px) 112px, 128px"
                  />
                </div>
              </div>
              <div className="h-12 bg-[#0d1930] group-hover:bg-linear-to-r group-hover:from-[#0d1930] group-hover:to-[#1d2f4b] transition-all duration-300">
                <div className="h-full flex items-center px-4 md:px-7.5">
                  <span className="text-[13px] md:text-[17px] font-semibold text-[#c8c8c8] group-hover:text-white group-hover:drop-shadow-[0_0_5px_#517dce] transition-all duration-300 truncate">
                    {vendor.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {searchQuery && filteredVendors.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="mt-4 text-lg font-medium text-white">검색 결과가 없습니다</h3>
          <p className="mt-2 text-gray-400">다른 검색어를 시도해 보세요.</p>
        </div>
      )}
    </div>
  );
}
