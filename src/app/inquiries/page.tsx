"use client";

import { useMemo, useState } from "react";
import Table, { type Column } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { QnAWriteModal } from "@/components/ui/QnAWriteModal";
import { QnADetailModal } from "@/components/ui/QnADetailModal";
import type { QnAItem } from "@/types/qna";
import { DEMO_QNA } from "@/mocks/qna";
import { toast } from "sonner";

const PAGE_SIZE = 10;

interface InquiryRow {
  id: string;
  status: string;
  statusClass: string;
  category: string;
  title: string;
  author: string;
  recipient: string;
  answerPreview: string;
  createdAt: string;
  raw: QnAItem;
}

const statusInfo = (status: string, isRead: boolean): { text: string; className: string } => {
  const s = (status || "").toLowerCase();
  if (s === "answered") {
    if (isRead) {
      return { text: "확인됨", className: "text-green-400" };
    }
    return { text: "읽지않음", className: "text-red-500 font-bold" };
  }
  if (s === "closed") return { text: "종료됨", className: "text-gray-400" };
  return { text: "대기중", className: "text-yellow-400" };
};

const formatDate = (iso: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const toRow = (q: QnAItem): InquiryRow => {
  const info = statusInfo(q.status, q.isRead);
  const answer = (q.answer || "").trim();
  const preview = answer
    ? answer.length > 40
      ? `${answer.slice(0, 40)}…`
      : answer
    : "-";
  return {
    id: q.id,
    status: info.text,
    statusClass: info.className,
    category: "고객센터",
    title: q.title,
    author: q.userName ?? "",
    recipient: "고객센터",
    answerPreview: preview,
    createdAt: formatDate(q.createdAt),
    raw: q,
  };
};

const INQUIRY_COLUMNS: Column<InquiryRow>[] = [
  {
    key: "status",
    label: "상태",
    align: "center",
    width: "100px",
    render: (row) => <span className={row.statusClass}>{row.status}</span>,
  },
  { key: "category", label: "분류", align: "center", width: "100px" },
  { key: "title", label: "제목", align: "center", width: "180px" },
  {
    key: "answerPreview",
    label: "답변",
    align: "center",
    width: "220px",
    render: (row) => (
      <span
        className={row.raw.answer ? "text-white" : "text-white/40"}
        title={row.raw.answer || undefined}
      >
        {row.answerPreview}
      </span>
    ),
  },
  { key: "author", label: "글쓴이", align: "center", width: "100px" },
  { key: "recipient", label: "수신자", align: "center", width: "160px" },
  { key: "createdAt", label: "작성일", align: "center", width: "150px" },
];

const InquiriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [detailQna, setDetailQna] = useState<QnAItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(DEMO_QNA.length / PAGE_SIZE));
  const tableData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return DEMO_QNA.slice(start, start + PAGE_SIZE).map(toRow);
  }, [currentPage]);

  return (
    <AuthGuard>
      <div className="flex w-full flex-col px-0 py-5 pb-10 md:px-5">
        <div className="overflow-x-auto">
          <div className="min-w-255">
            <Table<InquiryRow>
              title="고객센터"
              columns={INQUIRY_COLUMNS}
              data={tableData}
              trClassName="bg-[#0d1d32] cursor-pointer hover:bg-[#152842]"
              cellClassName="border-r border-[#070a0f] border-b"
              getRowClassName={(row) =>
                parseInt(row.id.replace(/\D/g, ""), 10) % 2 === 1 ? "bg-[#0a1428]" : ""
              }
              onRowClick={(row) => {
                setDetailQna(row.raw);
                setIsDetailOpen(true);
              }}
            />
          </div>
        </div>

        <div className="mt-px grid grid-cols-3 gap-px bg-[#031124] lg:flex lg:h-12.5 lg:justify-end">
          <Button
            variant="green"
            onClick={() => setIsWriteOpen(true)}
            className="min-h-12 w-full rounded-none py-2 text-xs font-normal text-white md:text-sm lg:h-full lg:w-34 lg:py-0"
          >
            글쓰기
          </Button>
          <Button
            variant="blue"
            onClick={() => toast.info("데모 페이지입니다.")}
            className="min-h-12 w-full rounded-none py-2 text-xs font-normal text-white md:text-sm lg:h-full lg:w-34 lg:py-0"
          >
            계좌문의
          </Button>
          <Button
            variant="red"
            onClick={() => toast.info("데모 페이지입니다.")}
            className="min-h-12 w-full rounded-none py-2 text-xs font-normal text-gray md:text-sm lg:h-full lg:w-34 lg:py-0"
          >
            메시지 전체 삭제
          </Button>
        </div>

        <div className="mt-4 flex justify-center md:mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <QnAWriteModal
          isOpen={isWriteOpen}
          onClose={() => setIsWriteOpen(false)}
        />

        <QnADetailModal
          isOpen={isDetailOpen}
          qna={detailQna}
          onClose={() => setIsDetailOpen(false)}
        />
      </div>
    </AuthGuard>
  );
};

export default InquiriesPage;
