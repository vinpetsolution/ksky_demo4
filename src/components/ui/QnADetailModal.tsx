"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { QnAItem } from "@/types/qna";

interface QnADetailModalProps {
  isOpen: boolean;
  qna: QnAItem | null;
  onClose: () => void;
}

function formatKoDateTime(iso?: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusLabel(status: string): { text: string; className: string } {
  const s = (status || "").toLowerCase();
  if (s === "answered") return { text: "답변완료", className: "bg-green-600 text-white" };
  if (s === "closed") return { text: "종료", className: "bg-gray-600 text-white" };
  return { text: "답변대기", className: "bg-yellow-600 text-white" };
}

export function QnADetailModal({ isOpen, qna, onClose }: QnADetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !qna) return null;

  const status = statusLabel(qna.status);

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden bg-[#313742] shadow-2xl border border-[#313742]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex shrink-0 items-center justify-center h-13.5 border-b border-[#1f242e]">
          <h2 className="text-lg font-bold text-white truncate px-10">
            고객센터 - {qna.title}
          </h2>
          <Button
            variant="darkBlueGlow"
            type="button"
            onClick={onClose}
            className="absolute size-13.5 text-2xl right-0 top-0 rounded-none"
            aria-label="닫기"
          >
            &times;
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#11141d]">
          <div className="space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
              <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${status.className}`}>
                {status.text}
              </span>
              <span className="text-white">제목: {qna.title}</span>
              <span className="ml-auto">신청시간: {formatKoDateTime(qna.createdAt)}</span>
            </div>

            <div className="text-xs text-white/60">
              글쓴이: {qna.userName || "-"}
              {qna.answeredByName && (
                <>
                  {" | "}답변자: {qna.answeredByName}
                  {" | "}답변시간: {formatKoDateTime(qna.answeredAt)}
                </>
              )}
            </div>

            <div className="rounded border border-[#2a3140] bg-[#0d1117] p-4">
              <p className="mb-2 text-xs font-semibold text-white/50">내용</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white">
                {qna.message}
              </p>
            </div>

            <div className="rounded border border-[#2a3140] bg-[#0d1117] p-4">
              <p className="mb-2 text-xs font-semibold text-white/50">답변</p>
              {qna.answer ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-white">
                  {qna.answer}
                </p>
              ) : (
                <p className="text-sm text-white/50">아직 답변이 등록되지 않았습니다.</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#313742]">
          <Button
            type="button"
            variant="darkBlueGlow"
            size="lg"
            fullWidth
            className="rounded-none h-16 text-gray text-center p-0 border-none"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
