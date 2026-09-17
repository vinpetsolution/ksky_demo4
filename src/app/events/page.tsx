"use client";

import { FaTrophy } from "react-icons/fa";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { DEMO_EVENTS } from "@/mocks/events";

function formatKoDate(iso?: string) {
  if (!iso) return "";
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

const AgentBettingRankingPage = () => {
  const events = DEMO_EVENTS;

  return (
    <AuthGuard>
      <div className="relative min-h-[70vh] w-full overflow-hidden">
        {/* Dark gold atmosphere */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(180,130,40,0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 45%, rgba(212,175,55,0.22), transparent 55%), radial-gradient(ellipse 40% 30% at 15% 25%, rgba(160,110,30,0.12), transparent 50%), linear-gradient(180deg, #0a0806 0%, #14100a 45%, #0c0a07 100%)",
          }}
        />
        {/* Sparkle particles */}
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
        {/* Golden arc glow (right) */}
        <div
          className="pointer-events-none absolute -right-16 top-1/4 h-105 w-105 rounded-full opacity-40"
          style={{
            background:
              "conic-gradient(from 200deg at 50% 50%, transparent 0deg, rgba(212,175,55,0.55) 50deg, transparent 110deg, transparent 360deg)",
            filter: "blur(2px)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center px-4 py-12 md:py-16">
          <div className="mb-10 flex items-center gap-3">
            <FaTrophy className="size-7 text-[#f5d76e] drop-shadow-[0_0_10px_rgba(245,215,110,0.55)] md:size-8" />
            <h1 className="text-2xl font-bold tracking-wide text-[#f5d76e] drop-shadow-[0_0_12px_rgba(245,215,110,0.35)] md:text-3xl">
              에이전트 배팅 랭킹
            </h1>
          </div>

          {events.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-20">
              <p className="text-center text-base text-[#c4b896] md:text-lg">
                현재 진행 중인 이벤트가 없습니다.
              </p>
            </div>
          ) : (
            <ul className="w-full space-y-3">
              {events.map((event) => (
                <li
                  key={event.id || event.title}
                  className="rounded-lg border border-[#c9a227]/30 bg-[#0a0a0a]/80 px-4 py-4 shadow-[0_0_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-base font-semibold text-[#f7e8a8] md:text-lg">
                      {event.title || "이벤트"}
                    </h2>
                    {event.status ? (
                      <span className="text-xs font-medium text-[#c9a227] md:text-sm">
                        {event.status}
                      </span>
                    ) : null}
                  </div>
                  {event.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-[#b8a888]">
                      {event.description}
                    </p>
                  ) : null}
                  {(event.startAt || event.endAt) && (
                    <p className="mt-2 text-xs text-[#8a7d62]">
                      {[formatKoDate(event.startAt), formatKoDate(event.endAt)]
                        .filter(Boolean)
                        .join(" ~ ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default AgentBettingRankingPage;
