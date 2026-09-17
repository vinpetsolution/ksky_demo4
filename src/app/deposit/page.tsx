"use client";

import { useState, useMemo } from "react";
import HeroCarousel from "@/components/ui/HeroCarousel";
import Table, { type Column } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { CASINO_SLIDES } from "@/mocks/slides";
import { DEPOSIT_RECORDS, DEPOSIT_TOTAL_PAGES, getDepositPage } from "@/mocks/deposits";
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

const DEMO_BANK_NAME = "신한은행";
const DEMO_BANK_ACCOUNT = "110-123-456789";
const DEMO_DEPOSITOR_NAME = "관리자";

interface DepositRecord {
    id: string;
    amount: number;
    type: string;
    status: string;
    requestDate: string;
    processDate: string;
}

const DEPOSIT_COLUMNS: Column<DepositRecord>[] = [
    {
        key: "amount",
        label: "금액",
        align: "center",
        render: (row) => formatNumber(row.amount),
    },
    {
        key: "type",
        label: "입금종류",
        align: "center",
    },
    {
        key: "status",
        label: "상태",
        align: "center",
        render: (row) => {
            const statusMap: Record<string, { text: string; className: string }> = {
                COMPLETED: { text: "완료", className: "text-green-400" },
                PENDING: { text: "대기중", className: "text-orange-400" },
                CANCELLED: { text: "취소", className: "text-red-400" },
            };
            const statusInfo = statusMap[row.status] || { text: row.status, className: "text-green-400" };
            return <span className={statusInfo.className}>{statusInfo.text}</span>;
        },
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

const DepositPage = () => {
    const { currentUser } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [amount, setAmount] = useState(0);
    const [amountInput, setAmountInput] = useState("0");
    const [loading, setLoading] = useState(false);

    const availableBalance = currentUser?.result?.user?.balanceMoney || 0;

    const tableData: DepositRecord[] = useMemo(
        () => getDepositPage(currentPage),
        [currentPage],
    );

    const handlePresetClick = (value: number) => {
        const next = amount + value;
        setAmount(next);
        setAmountInput(String(next));
    };

    const handleReset = () => {
        setAmount(0);
        setAmountInput("0");
    };

    const handleCopyAccount = () => {
        navigator.clipboard.writeText(DEMO_BANK_ACCOUNT);
        toast.success("계좌번호가 복사되었습니다.");
    };

    const handleSubmit = async () => {
        if (amount <= 0) {
            toast.error("입금 금액을 입력하세요.");
            return;
        }

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        toast.success("입금 신청이 완료되었습니다.");
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
                    <div className="hidden lg:flex h-81.25 w-81.25 shrink-0 flex-col justify-center bg-[#11141d88] backdrop-blur-[5px]">
                        <span className="block pr-10 text-right text-[40px] font-extralight text-[#aaaaaa]">
                            입금
                        </span>
                        <span className="-mt-4 block pr-10 text-right text-[40px] font-normal text-[#aaaaaa]">
                            안내사항
                        </span>
                    </div>
                    <div
                        className="flex min-h-30 py-6 px-5 min-w-0 flex-1 flex-col justify-center bg-[#11141d88] backdrop-blur-[5px] lg:h-81.25 lg:py-0 lg:px-0"
                        style={{ marginRight: "1px" }}
                    >
                        <div className="space-y-1 pl-5 text-sm leading-[1.6] text-[#aaaaaa] lg:pl-10 lg:text-[15px]">
                            <p>최근 일주일 이내의 내역만 확인 가능합니다.</p>
                            <p>입금 시 받는 분에 입력되는 이름과 입금자명이 동일해야 정상 충전 처리 가능합니다.</p>
                            <p>충전은 신청즉시 보유머니에서 차감됩니다.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mb-px flex h-12 shrink-0 items-center bg-[#07172d] md:h-15.5">
                    <span
                        className="ml-3 block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold leading-12 text-gray md:ml-5 md:text-base md:leading-15.5"
                        style={{ textShadow: "0 0 10px rgb(0 0 0 / 50%)" }}
                    >
                        입금신청
                    </span>
                </div>

                <div className="grid gap-px w-full grid-cols-1 lg:grid-cols-2">
                    <div className="flex w-full h-11 md:h-12.5">
                        <label className="w-25 text-xs bg-[#07172d] mr-px text-[#aaaaaa] leading-11 text-center shrink-0 md:w-37.5 md:text-[15px] md:leading-12.5">
                            보유머니
                        </label>
                        <div className="bg-[#0d1d32] relative flex-1 flex items-center px-2.5">
                            <span className="text-[#ef7c00]">{formatNumber(availableBalance)} 원</span>
                        </div>
                    </div>
                    <div className="flex w-full h-11 md:h-12.5">
                        <label className="w-25 text-xs bg-[#07172d] mr-px text-[#aaaaaa] leading-11 text-center shrink-0 md:w-37.5 md:text-[15px] md:leading-12.5">
                            입금자명
                        </label>
                        <div className="bg-[#0d1d32] relative flex-1 flex items-center px-2.5">
                            <span className="text-[#ef7c00]">{DEMO_DEPOSITOR_NAME}</span>
                        </div>
                    </div>
                    <div className="flex w-full h-11 md:h-12.5">
                        <label className="w-25 text-xs bg-[#07172d] mr-px text-[#aaaaaa] leading-11 text-center shrink-0 md:w-37.5 md:text-[15px] md:leading-12.5">
                            입금은행
                        </label>
                        <div className="bg-[#0d1d32] relative flex-1 flex items-center px-2.5">
                            <span className="text-[#ef7c00]">{DEMO_BANK_NAME}</span>
                        </div>
                    </div>
                    <div className="flex w-full h-11 md:h-12.5">
                        <label className="w-25 text-xs bg-[#07172d] mr-px text-[#aaaaaa] leading-11 text-center shrink-0 md:w-37.5 md:text-[15px] md:leading-12.5">
                            입금계좌
                        </label>
                        <div className="bg-[#0d1d32] relative flex-1 flex items-center px-2.5">
                            <span className="text-[#ef7c00] font-mono">{DEMO_BANK_ACCOUNT}</span>
                        </div>
                        <Button
                            variant="red"
                            onClick={handleCopyAccount}
                            className="h-11 rounded-none text-gray text-sm px-4 md:h-12.5 md:px-12.5 md:text-base"
                        >
                            계좌복사
                        </Button>
                    </div>
                </div>

                <div className="min-h-20 bg-[#07172d] mt-px p-2 md:min-h-25 md:p-5">
                    <div className="h-full border border-[#29324b] px-2 py-2 flex items-center justify-between md:px-5 md:py-4">
                        <span className="text-sm font-bold text-gray shrink-0 md:text-[26px]">입금금액</span>
                        <div className="flex min-w-0 items-center flex-1 pl-2 md:pl-10">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={amountInput ? formatNumber(Number(amountInput)) : amountInput}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/[^0-9]/g, "");
                                    const numVal = v ? Number(v) : 0;
                                    setAmountInput(String(numVal));
                                    setAmount(numVal);
                                }}
                                disabled={loading}
                                placeholder="금액을 입력하세요"
                                className="flex-1 min-w-0 bg-transparent text-right text-xl text-[#ff9d00] font-rajdhani outline-none placeholder:text-gray placeholder:text-xs md:text-12.5 md:placeholder:text-xl"
                            />
                            <span className="shrink-0 pl-1 text-lg font-normal text-gray md:pl-4 md:text-4xl">원</span>
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
                            disabled={loading}
                            className={`bg-[#07172d] hover:text-[#ef7c00]/80 rounded-none py-2 text-center h-11 text-xs font-semibold text-[#ef7c00] hover:bg-[#111d30] md:py-3 md:h-12.5 md:text-[15px] md:col-span-1 disabled:opacity-50 ${i < 4 ? "col-span-3" : "col-span-4"}`}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
                <div className="w-full h-11 bg-[#07172d] md:h-12.5">
                    <Button
                        variant="transparent"
                        onClick={handleReset}
                        disabled={loading}
                        className="w-full h-full font-medium rounded-none text-[15px] bg-[#29324b] text-[#ef7c00] hover:text-[#ef7c00]/80 hover:bg-[#333d54]"
                    >
                        정정하기
                    </Button>
                </div>
                <div className="mt-px grid w-full grid-cols-2 gap-px bg-[#031124]">
                    <Button
                        variant="red"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="min-h-20 rounded-none px-1 text-xs font-normal text-gray md:min-h-25 md:px-3 md:text-base lg:text-lg lg:px-6 disabled:opacity-50"
                    >
                        {loading ? "처리중..." : "입금하기"}
                    </Button>
                    <Button
                        type="button"
                        variant="blue"
                        onClick={() => toast.info("데모 페이지입니다.")}
                        className="min-h-18 rounded-none px-1 text-xs font-normal text-white md:min-h-25 md:px-3 md:text-base lg:text-lg"
                    >
                        계좌문의
                    </Button>
                </div>

                <div className="mt-5 pb-10">
                    <div className="overflow-x-auto">
                        <div className="min-w-150">
                            <Table<DepositRecord>
                                title={`입금내역 (${DEPOSIT_RECORDS.length})`}
                                columns={DEPOSIT_COLUMNS}
                                data={tableData}
                            />
                        </div>
                    </div>
                    {DEPOSIT_TOTAL_PAGES > 1 && (
                        <div className="mt-6 flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={DEPOSIT_TOTAL_PAGES}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AuthGuard>
    );
};

export default DepositPage;
