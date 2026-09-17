export interface EventItem {
  id: string;
  title: string;
  description: string;
  status: string;
  startAt: string;
  endAt: string;
}

export type RankingType = "total" | "casino" | "slot";

export interface RankingEntry {
  rank: number;
  userId: string;
  userNickname: string;
  agentId: string;
  amount: number;
  isSelf: boolean;
}

export const DEMO_EVENTS: EventItem[] = [
  {
    id: "1",
    title: "슬롯베팅왕 이벤트",
    description: "슬롯 배팅 금액에 따른 랭킹 이벤트입니다.",
    status: "진행중",
    startAt: "2026-09-01T00:00:00.000Z",
    endAt: "2026-09-30T23:59:59.000Z",
  },
  {
    id: "2",
    title: "카지노 주간 랭킹",
    description: "라이브 카지노 배팅 랭킹을 확인하세요.",
    status: "진행중",
    startAt: "2026-09-10T00:00:00.000Z",
    endAt: "2026-09-17T23:59:59.000Z",
  },
];

export const DEMO_RANKINGS: Record<RankingType, RankingEntry[]> = {
  total: [
    { rank: 1, userId: "user001", userNickname: "user001", agentId: "ag01", amount: 12500000, isSelf: false },
    { rank: 2, userId: "user002", userNickname: "user002", agentId: "ag02", amount: 9800000, isSelf: false },
    { rank: 3, userId: "user003", userNickname: "user003", agentId: "ag01", amount: 7200000, isSelf: false },
  ],
  casino: [
    { rank: 1, userId: "user002", userNickname: "user002", agentId: "ag02", amount: 5400000, isSelf: false },
    { rank: 2, userId: "user001", userNickname: "user001", agentId: "ag01", amount: 4100000, isSelf: false },
  ],
  slot: [
    { rank: 1, userId: "user003", userNickname: "user003", agentId: "ag01", amount: 6100000, isSelf: false },
    { rank: 2, userId: "user004", userNickname: "user004", agentId: "ag03", amount: 3300000, isSelf: false },
  ],
};
