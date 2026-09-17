"use client";

import { useState } from "react";
import HeroCarousel from "@/components/ui/HeroCarousel";
import Table, { type Column } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { CASINO_SLIDES } from "@/mocks/slides";
import { formatNumber } from "@/utils/format";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";

const PRESET_AMOUNTS = [
    { label: "1만", value: 10000 },
    { label: "3만", value: 30000 },
    { label: "5만", value: 50000 },
    { label: "10만", value: 100000 },
    { label: "50만", value: 500000 },
    { label: "100만", value: 1000000 },
    { label: "500만", value: 5000000 },
];

interface PointTransferRecord {
    id: string;
    amount: number;
    type: string;
    status: string;
    requestDate: string;
    processDate: string;
}

const POINT_COLUMNS: Column<PointTransferRecord>[] = [
    {
        key: "amount",
        label: "금액",
        align: "center",
        render: (row) => formatNumber(row.amount),
    },
    {
        key: "type",
        label: "종류",
        align: "center",
    },
    {
        key: "status",
        label: "상태",
        align: "center",
    },
    {
        key: "requestDate",
        label: "신청 날짜",
        align: "center",
    },
    {
        key: "processDate",
        label: "처리 날짜",
        align: "center",
    },
];

const PointsPage = () => {
    const { currentUser } = useUser();
    const [amount, setAmount] = useState(0);
    const [amountInput, setAmountInput] = useState("0");
    const [loading, setLoading] = useState(false);

    const availablePoint = currentUser?.result?.user?.balancePoint || 0;
    const availableMoney = currentUser?.result?.user?.balanceMoney || 0;

    const handlePresetClick = (value: number) => {
        const next = Math.min(amount + value, availablePoint);
        setAmount(next);
        setAmountInput(String(next));
    };

    const handleMaxAmount = () => {
        setAmount(availablePoint);
        setAmountInput(String(availablePoint));
    };

    const handleReset = () => {
        setAmount(0);
        setAmountInput("0");
    };

    const handleSubmit = async () => {
        if (amount <= 0) {
            toast.error("전환할 포인트가 없습니다.");
            return;
        }

        if (amount > availablePoint) {
            toast.error("보유 포인트보다 많이 전환할 수 없습니다.");
            return;
        }

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        toast.success("포인트 전환이 완료되었습니다.");
        handleReset();
        setLoading(false);
    };

    return (
        <AuthGuard>
            <HeroCarousel slides={CASINO_SLIDES} />
            <div className="px-0 md:px-5 flex flex-col w-full">
                <div
                    className="flex flex-col w-full pt-px lg:flex-row"
                    style={{ marginLeft: "-1px" }}
                >
                    <div className="hidden lg:flex h-50 w-81.25 shrink-0 flex-col justify-center bg-[#11141d88] backdrop-blur-[5px]">
                        <span className="block pr-10 text-right text-[40px] font-extralight text-[#aaaaaa]">
                            포인트
                        </span>
                        <span className="-mt-4 block pr-10 text-right text-[40px] font-normal text-[#aaaaaa]">
                            전환 방법
                        </span>
                    </div>
                    <div
                        className="flex min-h-30 py-6 px-5 min-w-0 flex-1 flex-col justify-center bg-[#11141d88] backdrop-blur-[5px] lg:h-50 lg:py-0 lg:px-0"
                        style={{ marginRight: "1px" }}
                    >
                        <div className="space-y-1 pl-5 text-sm leading-[1.6] text-[#aaaaaa] lg:pl-10 lg:text-[15px]">
                            <p>전환된 포인트는 즉시 보유머니에 반영됩니다.</p>
                        </div>
                    </div>
                </div>

                <div
                    className="relative z-10 mb-px flex h-12 shrink-0 items-center bg-[#07172d] md:h-15.5"
                    style={{
                        backgroundImage: "url('/images/title_effect_overlay.png')",
                        backgroundPosition: "left",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <span
                        className="ml-3 block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold leading-12 text-gray md:ml-5 md:text-base md:leading-15.5"
                        style={{ textShadow: "0 0 10px rgb(0 0 0 / 50%)" }}
                    >
                        포인트 전환
                    </span>
                </div>

                <div className="grid gap-px w-full grid-cols-1 lg:grid-cols-2">
                    <div className="flex w-full h-11 md:h-12.5">
                        <label className="w-25 text-xs bg-[#07172d] mr-px text-[#aaaaaa] leading-11 text-center shrink-0 md:w-37.5 md:text-[15px] md:leading-12.5">
                            현재 보유포인트
                        </label>
                        <div className="bg-[#0d1d32] relative flex-1 flex items-center px-2.5">
                            <span className="text-[#ef7c00]">{formatNumber(availablePoint)} P</span>
                        </div>
                    </div>
                    <div className="flex w-full h-11 md:h-12.5">
                        <label className="w-25 text-xs bg-[#07172d] mr-px text-[#aaaaaa] leading-11 text-center shrink-0 md:w-37.5 md:text-[15px] md:leading-12.5">
                            보유머니
                        </label>
                        <div className="bg-[#0d1d32] relative flex-1 flex items-center px-2.5">
                            <span className="text-[#ef7c00]">{formatNumber(availableMoney)} 원</span>
                        </div>
                    </div>
                </div>

                <div className="min-h-20 bg-[#07172d] mt-px p-2 md:min-h-25 md:p-5">
                    <div className="h-full border border-[#29324b] px-2 py-2 flex items-center justify-between md:px-5 md:py-4">
                        <span className="text-sm font-bold text-gray shrink-0 md:text-[26px]">전환금액</span>
                        <div className="flex min-w-0 items-center flex-1 pl-2 md:pl-10">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={amountInput ? formatNumber(Number(amountInput)) : amountInput}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/[^0-9]/g, "");
                                    const numVal = v ? Number(v) : 0;
                                    const clampedVal = Math.min(numVal, availablePoint);
                                    setAmountInput(String(clampedVal));
                                    setAmount(clampedVal);
                                }}
                                disabled={loading}
                                placeholder="금액을 입력하세요"
                                className="flex-1 min-w-0 bg-transparent text-right text-xl text-[#ff9d00] font-rajdhani outline-none placeholder:text-gray placeholder:text-xs md:text-12.5 md:placeholder:text-xl"
                            />
                            <span className="shrink-0 pl-1 text-lg font-normal text-gray md:pl-4 md:text-4xl">P</span>
                        </div>
                    </div>
                </div>

                <div className="mt-px grid grid-cols-12 gap-px overflow-hidden md:grid-cols-7">
                    {PRESET_AMOUNTS.map(({ label, value }, i) => (
                        <Button
                            key={value}
                            type="button"
                            variant="transparent"
                            onClick={() => handlePresetClick(value)}
                            disabled={loading || (amount + value) > availablePoint}
                            className={`bg-[#07172d] hover:text-[#ef7c00]/80 rounded-none py-2 text-center h-11 text-xs font-semibold text-[#ef7c00] hover:bg-[#111d30] md:py-3 md:h-12.5 md:text-[15px] md:col-span-1 disabled:opacity-50 ${i < 4 ? "col-span-3" : "col-span-4"}`}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
                <div className="w-full h-11 bg-[#07172d] flex justify-center items-center gap-px md:h-12.5">
                    <Button
                        variant="transparent"
                        onClick={handleMaxAmount}
                        disabled={loading || availablePoint <= 0}
                        className="flex-1 h-full font-medium rounded-none text-[15px] bg-[#29324b] text-[#ef7c00] hover:text-[#ef7c00]/80 hover:bg-[#333d54] disabled:opacity-50"
                    >
                        MAX
                    </Button>
                    <Button
                        variant="transparent"
                        onClick={handleReset}
                        disabled={loading}
                        className="flex-1 h-full font-medium rounded-none text-[15px] bg-[#29324b] text-[#ef7c00] hover:text-[#ef7c00]/80 hover:bg-[#333d54]"
                    >
                        정정하기
                    </Button>
                </div>
                <Button
                    variant="red"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-px w-full text-base font-normal h-20 rounded-none text-gray px-6 md:text-lg md:h-25 md:px-12.5 disabled:opacity-50"
                >
                    {loading ? "처리중..." : "포인트 전환"}
                </Button>

                <div className="mt-5 pb-10">
                    <div className="overflow-x-auto">
                        <div className="min-w-150">
                            <Table<PointTransferRecord>
                                title="포인트전환내역 (0)"
                                columns={POINT_COLUMNS}
                                data={[]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
};

export default PointsPage;
