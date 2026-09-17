import type { WithdrawalRecord } from "@/types/game";

export const WITHDRAWAL_RECORDS: WithdrawalRecord[] = [
  { id: "1", amount: 3250000, type: "출금", status: "승인", requestDate: "11-11 20:43", processDate: "11-11 20:45" },
  { id: "2", amount: 1500000, type: "자동출금 (C)", status: "승인", requestDate: "11-11 18:22", processDate: "11-11 18:25" },
  { id: "3", amount: 500000, type: "출금", status: "승인", requestDate: "11-11 15:10", processDate: "11-11 15:12" },
  { id: "4", amount: 2100000, type: "자동출금 (C)", status: "승인", requestDate: "11-11 12:05", processDate: "11-11 12:08" },
  { id: "5", amount: 800000, type: "출금", status: "승인", requestDate: "11-11 10:30", processDate: "11-11 10:32" },
  { id: "6", amount: 1200000, type: "출금", status: "승인", requestDate: "11-10 22:15", processDate: "11-10 22:18" },
  { id: "7", amount: 4500000, type: "자동출금 (C)", status: "승인", requestDate: "11-10 19:40", processDate: "11-10 19:43" },
  { id: "8", amount: 650000, type: "출금", status: "승인", requestDate: "11-10 16:20", processDate: "11-10 16:22" },
  { id: "9", amount: 2800000, type: "출금", status: "승인", requestDate: "11-10 14:00", processDate: "11-10 14:03" },
  { id: "10", amount: 950000, type: "자동출금 (C)", status: "승인", requestDate: "11-10 11:25", processDate: "11-10 11:28" },
  { id: "11", amount: 1750000, type: "출금", status: "승인", requestDate: "11-10 09:15", processDate: "11-10 09:18" },
  { id: "12", amount: 3200000, type: "자동출금 (C)", status: "승인", requestDate: "11-09 21:30", processDate: "11-09 21:33" },
  { id: "13", amount: 550000, type: "출금", status: "승인", requestDate: "11-09 18:45", processDate: "11-09 18:47" },
  { id: "14", amount: 4100000, type: "출금", status: "승인", requestDate: "11-09 14:20", processDate: "11-09 14:23" },
  { id: "15", amount: 720000, type: "자동출금 (C)", status: "승인", requestDate: "11-09 11:00", processDate: "11-09 11:03" },
];

const PAGE_SIZE = 10;

export function getWithdrawalPage(page: number): WithdrawalRecord[] {
  const start = (page - 1) * PAGE_SIZE;
  return WITHDRAWAL_RECORDS.slice(start, start + PAGE_SIZE);
}

export const WITHDRAWAL_TOTAL_PAGES = Math.ceil(WITHDRAWAL_RECORDS.length / PAGE_SIZE);
