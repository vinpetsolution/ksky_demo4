"use client";

import { useState } from "react";
import { FaMedal, FaTrophy } from "react-icons/fa";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { DEMO_RANKINGS, type RankingType } from "@/mocks/events";
import { formatNumber } from "@/utils/format";
import { cn } from "@/utils/classNames";

const RANKING_TABS: { key: RankingType; label: string }[] = [
  { key: "total", label: "전체" },
  { key: "casino", label: "카지노" },
  { key: "slot", label: "슬롯" },
];

/** Mask id for display: ss001 → ss0**, ss5 → ss* */
function maskId(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (v.length <= 2) return `${v[0] ?? ""}*`;
  if (v.length === 3) return `${v.slice(0, 2)}*`;
  return `${v.slice(0, 3)}${"*".repeat(Math.min(2, v.length - 3))}`;
}

function formatUpdatedAt(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("ko-KR");
}

function RankCell({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex items-center gap-1.5 font-bold text-[#f5d76e]">
        <FaMedal className="size-5 text-[#f5d76e] drop-shadow-[0_0_6px_rgba(245,215,110,0.7)]" />
        1
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex items-center gap-1.5 font-bold text-white">
        <FaMedal className="size-5 text-[#c0c0c0] drop-shadow-[0_0_6px_rgba(192,192,192,0.55)]" />
        2
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex items-center gap-1.5 font-bold text-[#cd7f32]">
        <FaMedal className="size-5 text-[#cd7f32] drop-shadow-[0_0_6px_rgba(205,127,50,0.55)]" />
        3
      </span>
    );
  }
  return <span className="font-semibold text-white/90">{rank}</span>;
}

function RankingAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(180,130,40,0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 45%, rgba(212,175,55,0.22), transparent 55%), radial-gradient(ellipse 40% 30% at 15% 25%, rgba(160,110,30,0.12), transparent 50%), linear-gradient(180deg, #0a0806 0%, #14100a 45%, #0c0a07 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: [
            "radial-gradient(1.5px 1.5px at 10% 80%, rgba(255,220,120,0.9), transparent)",
            "radial-gradient(1px 1px at 18% 70%, rgba(255,210,100,0.7), transparent)",
            "radial-gradient(1.5px 1.5px at 28% 88%, rgba(255,230,150,0.85), transparent)",
            "radial-gradient(1px 1px at 40% 75%, rgba(255,200,80,0.6), transparent)",
            "radial-gradient(2px 2px at 52% 92%, rgba(255,220,120,0.9), transparent)",
            "radial-gradient(1px 1px at 62% 68%, rgba(255,210,100,0.55), transparent)",
            "radial-gradient(1.5px 1.5px at 72% 85%, rgba(255,230,150,0.8), transparent)",
            "radial-gradient(1px 1px at 80% 72%, rgba(255,200,80,0.65), transparent)",
            "radial-gradient(2px 2px at 88% 90%, rgba(255,220,120,0.85), transparent)",
            "radial-gradient(1px 1px at 95% 78%, rgba(255,210,100,0.5), transparent)",
            "radial-gradient(1.5px 1.5px at 35% 60%, rgba(255,220,120,0.45), transparent)",
            "radial-gradient(1px 1px at 55% 55%, rgba(255,200,80,0.4), transparent)",
            "radial-gradient(1px 1px at 75% 50%, rgba(255,230,150,0.5), transparent)",
          ].join(", "),
        }}
      />
      <div
        className="pointer-events-none absolute -right-16 top-1/4 h-105 w-105 rounded-full opacity-40"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, transparent 0deg, rgba(212,175,55,0.55) 50deg, transparent 110deg, transparent 360deg)",
          filter: "blur(2px)",
        }}
      />
    </>
  );
}

const UserBettingRankingPage = () => {
  const [rankingType, setRankingType] = useState<RankingType>("total");
  const rankings = DEMO_RANKINGS[rankingType];
  const updatedLabel = formatUpdatedAt("2026-09-17T00:00:00.000Z");

  return (
    <AuthGuard>
      <div className="relative min-h-[70vh] w-full overflow-hidden">
        <RankingAtmosphere />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col px-4 py-10 md:py-14">
          <div className="mb-8 flex items-center justify-center gap-2.5">
            <FaTrophy className="size-6 text-[#f5d76e] drop-shadow-[0_0_10px_rgba(245,215,110,0.55)] md:size-7" />
            <h1 className="rounded bg-[#1a3a6e]/70 px-3 py-1 text-xl font-bold tracking-wide text-white md:text-2xl">
              유저 배팅 랭킹
            </h1>
          </div>

          <div className="mb-0 grid grid-cols-3 gap-0.5">
            {RANKING_TABS.map((tab) => {
              const active = rankingType === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setRankingType(tab.key)}
                  className={cn(
                    "h-11 text-sm font-bold transition-colors md:text-base",
                    active
                      ? "bg-linear-to-b from-[#f0e0b0] to-[#c9a227] text-[#1a1208]"
                      : "bg-[#3a2e18]/90 text-[#1a1208]/85 hover:bg-[#4a3a20]",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden border border-[#2a2a2a]/80 bg-[#0d0d0d]/75 backdrop-blur-sm">
            <div className="grid grid-cols-[88px_1fr_140px] border-b border-[#2a2a2a] bg-[#1a1a1a]/95 text-center text-sm font-semibold text-white/90 md:grid-cols-[120px_1fr_180px] md:text-base">
              <div className="py-3">순위</div>
              <div className="py-3">유저</div>
              <div className="py-3">베팅금액</div>
            </div>

            {rankings.length === 0 ? (
              <div className="py-16 text-center text-[#9ca3af]">랭킹 데이터가 없습니다.</div>
            ) : (
              <ul className="divide-y divide-[#2a2a2a]/70">
                {rankings.map((row) => {
                  const displayName = maskId(row.userNickname || row.userId);
                  const agentHandle = row.agentId ? `@${maskId(row.agentId)}` : "";
                  return (
                    <li
                      key={`${row.rank}-${row.userId || row.userNickname}`}
                      className={cn(
                        "grid grid-cols-[88px_1fr_140px] items-center md:grid-cols-[120px_1fr_180px]",
                        row.isSelf && "bg-[#c9a227]/10",
                      )}
                    >
                      <div className="flex justify-center py-3.5">
                        <RankCell rank={row.rank} />
                      </div>
                      <div className="flex flex-col items-center justify-center py-2.5 text-center">
                        <span className="text-sm font-semibold text-white md:text-base">
                          {displayName || "—"}
                        </span>
                        {agentHandle ? (
                          <span className="text-xs text-[#8b8b8b]">{agentHandle}</span>
                        ) : null}
                      </div>
                      <div className="py-3.5 pr-4 text-right text-sm font-bold text-[#39ff14] md:pr-6 md:text-base">
                        {formatNumber(row.amount)}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {updatedLabel ? (
            <p className="mt-4 text-center text-xs text-[#9ca3af] md:text-sm">
              마지막 업데이트: {updatedLabel}
            </p>
          ) : null}
        </div>
      </div>
    </AuthGuard>
  );
};

export default UserBettingRankingPage;
