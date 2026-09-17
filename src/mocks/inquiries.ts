import type { InquiryRecord } from "@/types/game";

export const INQUIRY_RECORDS: InquiryRecord[] = [
  {
    id: "1",
    status: "확인됨",
    category: "고객센터",
    title: "입금 관련 문의",
    author: "user1",
    recipient: "고객센터",
    createdAt: "2025-03-15",
  },
  {
    id: "2",
    status: "읽지않음",
    category: "고객센터",
    title: "출금 처리 문의",
    author: "user2",
    recipient: "고객센터",
    createdAt: "2025-03-16",
  },
  {
    id: "3",
    status: "확인됨",
    category: "고객센터",
    title: "계정 문의",
    author: "user3",
    recipient: "고객센터",
    createdAt: "2025-03-17",
  },
  {
    id: "4",
    status: "읽지않음",
    category: "고객센터",
    title: "이벤트 문의",
    author: "user4",
    recipient: "고객센터",
    createdAt: "2025-03-18",
  },
  {
    id: "5",
    status: "확인됨",
    category: "고객센터",
    title: "배팅 관련 문의",
    author: "user5",
    recipient: "고객센터",
    createdAt: "2025-03-19",
  },
];

const PAGE_SIZE = 10;

export function getInquiryPage(page: number): InquiryRecord[] {
  const start = (page - 1) * PAGE_SIZE;
  return INQUIRY_RECORDS.slice(start, start + PAGE_SIZE);
}

export const INQUIRY_TOTAL_PAGES = Math.ceil(
  INQUIRY_RECORDS.length / PAGE_SIZE
);
