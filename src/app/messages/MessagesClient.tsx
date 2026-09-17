"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { cn } from "@/utils/classNames";
import type { NoticeItem } from "@/types/notice";
import { DEMO_NOTICES } from "@/mocks/notices";

type TabId = "messages" | "notices";

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

function GoldTabs({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-t-lg border border-[#c9a227]/40 bg-[#c9a227]/20 p-px">
      <button
        type="button"
        onClick={() => onChange("messages")}
        className={cn(
          "relative py-3 text-center text-sm font-bold transition-all md:py-4 md:text-base",
          active === "messages"
            ? "bg-linear-to-b from-[#f7e8a8] via-[#e6c34d] to-[#c9a227] text-black shadow-[0_0_20px_rgba(234,179,8,0.35)]"
            : "bg-linear-to-b from-[#2a2215] to-[#14110c] text-[#c9a227]/90 hover:text-[#f7e8a8]",
        )}
      >
        쪽지함
      </button>
      <button
        type="button"
        onClick={() => onChange("notices")}
        className={cn(
          "relative py-3 text-center text-sm font-bold transition-all md:py-4 md:text-base",
          active === "notices"
            ? "bg-linear-to-b from-[#f7e8a8] via-[#e6c34d] to-[#c9a227] text-black shadow-[0_0_20px_rgba(234,179,8,0.35)]"
            : "bg-linear-to-b from-[#2a2215] to-[#14110c] text-[#c9a227]/90 hover:text-[#f7e8a8]",
        )}
      >
        공지사항
      </button>
    </div>
  );
}

export default function MessagesClient() {
  const [tab, setTab] = useState<TabId>("messages");
  const [noticePage, setNoticePage] = useState(1);
  const [noticeModal, setNoticeModal] = useState<NoticeItem | null>(null);

  const noticeItems = useMemo(() => {
    const start = (noticePage - 1) * 10;
    return DEMO_NOTICES.slice(start, start + 10);
  }, [noticePage]);
  const noticeTotalPages = Math.max(1, Math.ceil(DEMO_NOTICES.length / 10));

  const panelTitle = tab === "messages" ? "쪽지함" : "공지사항";

  return (
    <AuthGuard>
      <div className="relative min-h-[70vh] w-full overflow-hidden px-0 py-6 md:px-6 md:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,162,39,0.5), transparent 55%), radial-gradient(ellipse 60% 40% at 20% 30%, rgba(201,162,39,0.15), transparent 50%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl">
          <GoldTabs active={tab} onChange={setTab} />

          <div className="rounded-b-lg border border-t-0 border-[#c9a227]/35 bg-[#0a0a0a]/95 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <div className="border-b border-[#c9a227]/25 bg-linear-to-r from-[#1a1610] to-[#0f0d0a] px-4 py-3 text-center">
              <span className="text-sm font-semibold tracking-wide text-[#f7e8a8] md:text-base">{panelTitle}</span>
            </div>

            {tab === "messages" && (
              <>
                <div className="flex justify-center py-16 text-center text-[#9ca3af]">표시할 쪽지가 없습니다.</div>
                <div className="flex shrink-0 flex-col gap-2 border-t border-[#2a251c] p-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="red"
                    onClick={() => toast.info("데모 페이지입니다.")}
                    className="w-full rounded-md py-3 text-sm font-semibold sm:flex-1"
                  >
                    선택삭제
                  </Button>
                  <Button
                    type="button"
                    variant="transparent"
                    onClick={() => toast.info("데모 페이지입니다.")}
                    className="w-full rounded-md border border-[#c9a227]/50 bg-[#1a1510] py-3 text-sm font-semibold text-[#f7e8a8] hover:bg-[#2a2215] sm:flex-1"
                  >
                    전체읽음
                  </Button>
                </div>
              </>
            )}

            {tab === "notices" && (
              <>
                <div className="hidden grid-cols-[100px_1fr_150px] gap-px border-b border-[#c9a227]/20 bg-[#c9a227]/15 text-xs font-bold text-[#c9a227] md:grid md:text-sm">
                  <div className="bg-[#141210] py-2.5 text-center">상태</div>
                  <div className="bg-[#141210] py-2.5 text-center">제목</div>
                  <div className="bg-[#141210] py-2.5 text-center">시간</div>
                </div>

                <div className="min-h-50">
                  {noticeItems.length === 0 ? (
                    <div className="flex justify-center py-16 text-center text-[#9ca3af]">표시할 공지가 없습니다.</div>
                  ) : (
                    <ul className="divide-y divide-[#2a251c]">
                      {noticeItems.map((row) => {
                        const unread = !row.isRead;
                        return (
                          <li key={row.id}>
                            <button
                              type="button"
                              onClick={() => setNoticeModal(row)}
                              className="grid w-full grid-cols-1 gap-1 px-3 py-3 text-left transition-colors hover:bg-[#1f1a14]/90 md:grid-cols-[100px_1fr_150px] md:items-center md:gap-0 md:px-0"
                            >
                              <div className="flex justify-center md:border-r md:border-[#2a251c]">
                                <span
                                  className={cn(
                                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                    unread
                                      ? "bg-red-600/90 text-white shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                                      : "bg-[#2a251c] text-[#9ca3af]",
                                  )}
                                >
                                  {unread ? "미확인" : "읽음"}
                                </span>
                              </div>
                              <div className="min-w-0 px-2 font-medium text-[#e8dcc4] md:border-r md:border-[#2a251c]">
                                <span className="line-clamp-2">{row.title}</span>
                              </div>
                              <div className="text-center text-xs text-[#a8a29e] md:text-sm">
                                {formatKoDate(row.createdAt)}
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {noticeTotalPages > 1 && (
                  <div className="flex justify-center border-t border-[#2a251c] py-4">
                    <Pagination
                      currentPage={noticePage}
                      totalPages={noticeTotalPages}
                      onPageChange={setNoticePage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {noticeModal &&
          createPortal(
            <div
              className="fixed inset-0 z-260 flex items-center justify-center bg-black/80 p-4"
              role="dialog"
              onClick={() => setNoticeModal(null)}
            >
              <div
                className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-[#c9a227]/40 bg-[#0a0a0a] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-2 border-b border-[#2a251c] px-4 py-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#f7e8a8]">{noticeModal.title}</h3>
                    <p className="mt-1 text-xs text-[#9ca3af]">{formatKoDate(noticeModal.createdAt)}</p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-2xl leading-none text-[#c9a227]/80 hover:text-white"
                    aria-label="Close"
                    onClick={() => setNoticeModal(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#d6d3c9]">
                    {noticeModal.message}
                  </div>
                </div>
                <div className="border-t border-[#2a251c] p-3">
                  <Button type="button" variant="red" className="w-full" onClick={() => setNoticeModal(null)}>
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
}
