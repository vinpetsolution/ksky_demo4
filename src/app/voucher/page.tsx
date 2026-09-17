"use client";
import { Button } from '@/components/ui/Button';
import HeroCarousel from '@/components/ui/HeroCarousel'
import { Pagination } from '@/components/ui/Pagination';
import Table, { Column } from '@/components/ui/Table';
import { CASINO_SLIDES } from '@/mocks/slides'
import { formatNumber } from '@/utils/format';
import React, { useState } from 'react'
import { AuthGuard } from "@/components/providers/AuthGuard";

interface VOUCHER_DATA {
    amount: string;
    points: string;
    date: string;
}

const VOUCHER_COLUMNS: Column<VOUCHER_DATA>[] = [
    {
        key: 'amount',
        label: '금액',
    },
    {
        key: 'points',
        label: '포인트',
    },
    {
        key: 'date',
        label: '처리 날짜',
    },
]

const VOUCHER_DATA = [
    {
        amount: '100000',
        points: '100000',
        date: '2026-03-20',
    },
]

const VoucherPage = () => {
    const [points, setPoints] = useState(0);
    return (
        <AuthGuard>
            <HeroCarousel slides={CASINO_SLIDES} />
            <div className="px-5 pb-10 flex flex-col w-full">
                {/* Header */}
                <div className="flex w-full pt-px">
                    <div className="flex h-50 w-full shrink-0 items-center bg-[#11141d88] backdrop-blur-[5px]">
                        <span
                            className="block pl-20 text-right text-[40px] font-meidum text-[#aaaaaa]"
                        >
                            쿠폰
                        </span>
                    </div>
                </div>

                {/* Title bar: 입금신청 */}
                <div
                    className="relative z-10 mb-px flex h-15.5 shrink-0 items-center bg-[#07172d]"
                    style={{
                        backgroundImage: "url('/images/title_effect_overlay.png')",
                        backgroundPosition: "left",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <span
                        className="block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-gray"
                        style={{
                            lineHeight: "62px",
                            marginLeft: "20px",
                            textShadow: "0 0 10px rgb(0 0 0 / 50%)",
                        }}
                    >
                        쿠폰
                    </span>
                </div>

                <div className="flex w-full h-12.5">
                    <label className="w-37.5 text-[15px] bg-[#07172d] mr-px text-[#aaaaaa] leading-12.5 text-center shrink-0">
                        현재 보유포인트
                    </label>
                    <div className="bg-[#0d1d32] relative flex-1 flex justify-center">
                        <input
                            type="text"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            placeholder=""
                            className="px-2.5 w-full text-right text-lg bg-transparent text-[#ef7c00] outline-hidden placeholder:text-gray/50"
                        />
                    </div>
                </div>

                {/* Money Box */}
                <div className="h-30 bg-[#07172d] mt-px p-5">
                    <div className="h-full border border-[#29324b] px-5 py-4 flex items-center justify-between" >
                        <span className="text-[26px] font-bold text-gray shrink-0">쿠폰번호</span>

                        <div className="flex items-center flex-1 pl-10 gap-0">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={points ? formatNumber(Number(points)) : points}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/[^0-9]/g, "");
                                    setPoints(v ? Number(v) : 0);
                                }}
                                placeholder=""
                                className="flex-1 min-w-0 bg-transparent text-right text-[50px] text-[#ff9d00] font-rajdhani outline-hidden placeholder:text-white placeholder:text-3xl"
                            />
                        </div>
                    </div>
                </div>
                <Button variant="red" className="mt-px w-full text-lg font-normal h-25 rounded-none text-gray px-12.5">
                    쿠폰사용
                </Button>

                <div className="mt-5 pb-10">
                    <div className="overflow-x-auto">
                        <Table<VOUCHER_DATA>
                            title="쿠폰사용 기록"
                            columns={VOUCHER_COLUMNS}
                            data={[]}
                        />
                    </div>
                    <div className="mt-6 flex justify-center">
                        <Pagination
                            currentPage={1}
                            totalPages={0}
                            onPageChange={() => { }}
                        />
                    </div>
                </div>
            </div>
        </AuthGuard>
    )
}

export default VoucherPage