export interface QnAItem {
  id: string;
  title: string;
  message: string;
  status: string;
  answer?: string | null;
  userId: string;
  userName?: string | null;
  answeredBy?: string | null;
  answeredByName?: string | null;
  createdAt: string;
  updatedAt: string;
  answeredAt?: string | null;
  isRead: boolean;
}
