import type { AnnouncementRecord } from "@/types/game";

export const ANNOUNCEMENT_RECORDS: AnnouncementRecord[] = [
  { id: "1", status: "확인됨", category: "고객센터", title: "슬롯베팅왕 이벤트" },
  { id: "2", status: "공지사항", category: "고객센터", title: "첫입금 릴로드 이벤트" },
  { id: "3", status: "확인됨", category: "고객센터", title: "스포츠 이벤트 규칙" },
  { id: "4", status: "공지사항", category: "고객센터", title: "미니게임 이벤트 안내" },
  { id: "5", status: "확인됨", category: "고객센터", title: "카지노 이벤트" },
  { id: "6", status: "공지사항", category: "고객센터", title: "시스템 점검 안내" },
  { id: "7", status: "확인됨", category: "고객센터", title: "신규 이벤트 공지" },
];

const PAGE_SIZE = 10;

export function getAnnouncementPage(page: number): AnnouncementRecord[] {
  const start = (page - 1) * PAGE_SIZE;
  return ANNOUNCEMENT_RECORDS.slice(start, start + PAGE_SIZE);
}

export const ANNOUNCEMENT_TOTAL_PAGES = Math.ceil(
  ANNOUNCEMENT_RECORDS.length / PAGE_SIZE
);
