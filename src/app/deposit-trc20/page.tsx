"use client";

import { useMemo, useState } from "react";
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
        render: (row) => <span className="text-green-400">{row.status}</span>,
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

const DepositTRC20Page = () => {
    const { currentUser } = useUser();
    const [currentPage, setCurrentPage] = useState(1);

    const availableBalance = currentUser?.result?.user?.balanceMoney || 0;
    const userName = currentUser?.result?.user?.userName || "";

    const tableData: DepositRecord[] = useMemo(
        () => getDepositPage(currentPage).map((row) => ({ ...row, type: "코인입금" })),
        [currentPage],
    );

    return (
        <AuthGuard>
            <HeroCarousel slides={CASINO_SLIDES} />
            <div className="flex w-full flex-col px-0 md:px-5">
                <div
                    className="flex w-full flex-col pt-px lg:flex-row"
                    style={{ marginLeft: "-1px" }}
                >
                    <div className="hidden h-81.25 w-81.25 shrink-0 flex-col justify-center bg-[#11141d88] backdrop-blur-[5px] lg:flex">
                        <span className="block pr-10 text-right text-[40px] font-extralight text-[#aaaaaa]">
                            테더입금
                        </span>
                        <span className="-mt-4 block pr-10 text-right text-[40px] font-normal text-[#aaaaaa]">
                            안내사항
                        </span>
                    </div>
                    <div
                        className="flex min-h-30 min-w-0 flex-1 flex-col justify-center bg-[#11141d88] px-5 py-6 backdrop-blur-[5px] lg:h-81.25 lg:px-0 lg:py-0"
                        style={{ marginRight: "1px" }}
                    >
                        <div className="space-y-1 pl-5 text-sm leading-[1.6] text-[#aaaaaa] lg:pl-10 lg:text-[15px]">
                            <p>아래 버튼을 누르면 테더(USDT) 입금 페이지로 이동합니다.</p>
                            <p>입금이 완료되면 자동으로 포인트가 충전됩니다.</p>
                            <p>최근 일주일 이내의 내역만 확인 가능합니다.</p>
                            <p>입금 관련 문의는 고객센터를 이용해 주세요.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mb-px mt-5 flex min-h-0 flex-col bg-[#07172d] sm:flex-row sm:items-stretch md:mt-10 md:h-15.5 md:flex-row">
                    <span
                        className="ml-3 flex min-h-12 min-w-0 flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-gray md:ml-5 md:min-h-0 md:text-base"
                        style={{ textShadow: "0 0 10px rgb(0 0 0 / 50%)" }}
                    >
                        테더(USDT) 입금
                    </span>
                </div>

                <div className="grid w-full grid-cols-1 gap-px lg:grid-cols-2">
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px w-25 shrink-0 bg-[#07172d] text-center text-xs leading-11 text-[#aaaaaa] md:w-37.5 md:text-[15px] md:leading-12.5">
                            보유머니
                        </label>
                        <div className="flex flex-1 items-center bg-[#0d1d32] px-4">
                            <span className="text-sm font-semibold text-[#ef7c00] md:text-base">
                                {formatNumber(availableBalance)} 원
                            </span>
                        </div>
                    </div>
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px w-25 shrink-0 bg-[#07172d] text-center text-xs leading-11 text-[#aaaaaa] md:w-37.5 md:text-[15px] md:leading-12.5">
                            아이디
                        </label>
                        <div className="flex flex-1 items-center bg-[#0d1d32] px-4">
                            <span className="text-sm text-white md:text-base">
                                {userName || "-"}
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    variant="red"
                    className="mt-px h-20 w-full rounded-none px-6 text-base font-normal text-gray md:h-25 md:px-12.5 md:text-lg"
                    onClick={() => toast.info("데모 페이지입니다.")}
                >
                    테더(USDT) 입금하기
                </Button>

                <div className="mt-5 pb-10">
                    <div className="overflow-x-auto">
                        <div className="min-w-150">
                            <Table<DepositRecord>
                                title={`코인입금 내역 (${DEPOSIT_RECORDS.length})`}
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

export default DepositTRC20Page;
