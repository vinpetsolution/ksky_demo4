'use client';

import {
  createContext,
  useCallback,
  useContext,
  type PropsWithChildren,
} from 'react';

export interface MailboxCountsContextValue {
  messageUnread: number;
  noticeUnread: number;
  qnaUnread: number;
  /** Badge total for 쪽지함: 쪽지 + 공지 unread. */
  totalUnread: number;
  refresh: () => Promise<void>;
}

const MailboxCountsContext = createContext<MailboxCountsContextValue | null>(null);

export function MailboxCountsProvider({ children }: PropsWithChildren) {
  const refresh = useCallback(async () => {}, []);

  const value: MailboxCountsContextValue = {
    messageUnread: 0,
    noticeUnread: 0,
    qnaUnread: 0,
    totalUnread: 0,
    refresh,
  };

  return (
    <MailboxCountsContext.Provider value={value}>{children}</MailboxCountsContext.Provider>
  );
}

export function useMailboxCounts(): MailboxCountsContextValue {
  const ctx = useContext(MailboxCountsContext);
  if (!ctx) {
    throw new Error('useMailboxCounts must be used within MailboxCountsProvider');
  }
  return ctx;
}
