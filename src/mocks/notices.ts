import type { NoticeItem } from "@/types/notice";
import { ANNOUNCEMENT_RECORDS } from "@/mocks/announcements";

export const DEMO_NOTICES: NoticeItem[] = ANNOUNCEMENT_RECORDS.map((item) => ({
  id: item.id,
  title: item.title,
  message: item.title,
  kind: item.category,
  createdAt: "2026-09-01T12:00:00.000Z",
  isRead: item.status === "확인됨",
}));
