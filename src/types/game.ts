export interface CarouselSlide {
  bgImage: string;
  entityImage: string;
  labelImage: string;
  bgColor: string;
}

export interface CasinoCardItem {
  bgImage: string;
  minibgImage: string;
  mainIcon: string;
  href?: string;
}

export interface PopupBannerItem {
  id: string;
  /** Admin: optional — text-only banners have no image */
  imageUrl?: string;
  /** API `title` — dùng cho alt ảnh nếu không set riêng */
  imageAlt?: string;
  /** API `title` */
  title?: string;
  /** API `content` — nội dung chi tiết / 내용 (admin), không có field `detail` hay `memo` */
  content?: string;
}

export interface GameSlotCardItem {
  title: string;
  slug: string;
  slotIndex?: number;
  isMaintenance?: boolean;
  href?: string;
}

export interface WithdrawalRecord {
  id: string;
  amount: number;
  type: string;
  status: string;
  requestDate: string;
  processDate: string;
}

export interface AnnouncementRecord {
  id: string;
  status: string;
  category: string;
  title: string;
}

export interface InquiryRecord {
  id: string;
  status: string;
  category: string;
  title: string;
  author: string;
  recipient: string;
  createdAt: string;
}
