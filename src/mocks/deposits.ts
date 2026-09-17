import type { WithdrawalRecord } from "@/types/game";

export const DEPOSIT_RECORDS: WithdrawalRecord[] = [
  { id: "1", amount: 3250000, type: "입금", status: "승인", requestDate: "11-11 20:43", processDate: "11-11 20:45" },
  { id: "2", amount: 1500000, type: "입금", status: "승인", requestDate: "11-11 18:22", processDate: "11-11 18:25" },
  { id: "3", amount: 500000, type: "입금", status: "승인", requestDate: "11-11 15:10", processDate: "11-11 15:12" },
  { id: "4", amount: 2100000, type: "입금", status: "승인", requestDate: "11-11 12:05", processDate: "11-11 12:08" },
  { id: "5", amount: 800000, type: "입금", status: "승인", requestDate: "11-11 10:30", processDate: "11-11 10:32" },
  { id: "6", amount: 1200000, type: "입금", status: "승인", requestDate: "11-10 22:15", processDate: "11-10 22:18" },
  { id: "7", amount: 4500000, type: "입금", status: "승인", requestDate: "11-10 19:40", processDate: "11-10 19:43" },
  { id: "8", amount: 650000, type: "입금", status: "승인", requestDate: "11-10 16:20", processDate: "11-10 16:22" },
  { id: "9", amount: 2800000, type: "입금", status: "승인", requestDate: "11-10 14:00", processDate: "11-10 14:03" },
  { id: "10", amount: 950000, type: "입금", status: "승인", requestDate: "11-10 11:25", processDate: "11-10 11:28" },
];

const PAGE_SIZE = 10;

export function getDepositPage(page: number): WithdrawalRecord[] {
  const start = (page - 1) * PAGE_SIZE;
  return DEPOSIT_RECORDS.slice(start, start + PAGE_SIZE);
}

export const DEPOSIT_TOTAL_PAGES = Math.ceil(DEPOSIT_RECORDS.length / PAGE_SIZE);
