import type { QnAItem } from "@/types/qna";
import { INQUIRY_RECORDS } from "@/mocks/inquiries";

export const DEMO_QNA: QnAItem[] = INQUIRY_RECORDS.map((item) => ({
  id: item.id,
  title: item.title,
  message: item.title,
  status: item.status === "확인됨" ? "answered" : "pending",
  answer: item.status === "확인됨" ? "확인되었습니다. 감사합니다." : null,
  userId: item.author,
  userName: item.author,
  createdAt: `${item.createdAt}T00:00:00.000Z`,
  updatedAt: `${item.createdAt}T00:00:00.000Z`,
  isRead: item.status === "확인됨",
}));
