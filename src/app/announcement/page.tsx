"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Table, { type Column } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { AuthGuard } from "@/components/providers/AuthGuard";
import type { NoticeItem } from "@/types/notice";
import { DEMO_NOTICES } from "@/mocks/notices";

function formatKoDate(iso?: string) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

const PAGE_SIZE = 10;

const ANNOUNCEMENT_COLUMNS: Column<NoticeItem>[] = [
    {
        key: "isRead",
        label: "상태",
        align: "center",
        width: "120px",
        render: (row) => (
            <span>{row.isRead ? "확인됨" : "공지사항"}</span>
        ),
    },
    {
        key: "kind",
        label: "분류",
        align: "center",
        width: "120px",
    },
    {
        key: "title",
        label: "제목",
        align: "center",
        render: (row) => (
            <span className="text-gray/80">
                ⭐ {row.title} ⭐
            </span>
        ),
    },
];

const AnnouncementPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [detailNotice, setDetailNotice] = useState<NoticeItem | null>(null);

    const totalPages = Math.max(1, Math.ceil(DEMO_NOTICES.length / PAGE_SIZE));
    const data = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return DEMO_NOTICES.slice(start, start + PAGE_SIZE);
    }, [currentPage]);

    return (
        <AuthGuard>
            <div className="flex w-full flex-col px-0 py-5 pb-10 md:px-5">
                <div className="overflow-x-auto">
                    <div className="min-w-150">
                        <Table<NoticeItem>
                            title="공지사항"
                            columns={ANNOUNCEMENT_COLUMNS}
                            data={data}
                            trClassName="bg-[#0d1d32]"
                            cellClassName="border-r border-[#070a0f] border-b"
                            onRowClick={setDetailNotice}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>

                {detailNotice &&
                    createPortal(
                        <div
                            className="fixed inset-0 z-260 flex items-center justify-center bg-black/80 p-4"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="announcement-detail-title"
                            onClick={() => setDetailNotice(null)}
                        >
                            <div
                                className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-[#29324b] bg-[#07172d] shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-start justify-between gap-2 border-b border-[#070a0f] px-4 py-3">
                                    <div className="min-w-0">
                                        <h3
                                            id="announcement-detail-title"
                                            className="text-base font-bold text-gray"
                                        >
                                            {detailNotice.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray/70">
                                            {formatKoDate(detailNotice.createdAt)}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="shrink-0 text-2xl leading-none text-[#ef7c00]/90 hover:text-[#ef7c00]"
                                        aria-label="닫기"
                                        onClick={() => setDetailNotice(null)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray/90">
                                        {detailNotice.message || "내용이 없습니다."}
                                    </div>
                                </div>
                                <div className="border-t border-[#070a0f] p-3">
                                    <Button
                                        type="button"
                                        variant="red"
                                        className="w-full"
                                        onClick={() => setDetailNotice(null)}
                                    >
                                        닫기
                                    </Button>
                                </div>
                            </div>
                        </div>,
                        document.body,
                    )}
            </div>
        </AuthGuard>
    );
};

export default AnnouncementPage;
