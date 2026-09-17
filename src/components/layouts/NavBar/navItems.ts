export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  /** Chỉ dùng cho mobile: hiển thị "parent - child" thay vì chỉ child */
  mobileLabelFormat?: 'parent-child';
}

export const NAV_ITEMS: NavItem[] = [
  { label: '카지노', href: '/game_casino' },
  { label: '슬롯', href: '/game_slot' },
  { label: '입금하기', href: '/deposit' },
  { label: '출금하기', href: '/withdraw' },
  { label: '포인트 전환', href: '/points' },
  { label: '에이전트 배팅 랭킹', href: '/events' },
  { label: '유저 배팅 랭킹', href: '/user-betting-ranking' },
  { label: '쪽지함', href: '/messages' },
  { label: '공지사항', href: '/announcement' },
  { label: '고객센터', href: '/inquiries' },
  { label: '테더입금하기', href: '/deposit-trc20' },
];
