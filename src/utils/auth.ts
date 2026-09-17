import { removeStorageKey } from '@/utils/storage';
import { getStorageKey, getRefreshTokenKey, getUserKey } from '@/constants/store-key';

/** 회원용 사이트: 에이전트 계정은 로그인 불가 */
export function isMemberSiteBlockedAgentRole(role: string | undefined | null): boolean {
  return String(role ?? '').trim().toUpperCase() === 'AGENT';
}

export const clearAllAuthData = () => {
  removeStorageKey({ key: getStorageKey() });

  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(getRefreshTokenKey());
    sessionStorage.removeItem(getUserKey());
    sessionStorage.removeItem('token');
    localStorage.removeItem(getRefreshTokenKey());
    localStorage.removeItem(getUserKey());
    localStorage.removeItem(getStorageKey());
  }
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const auth = sessionStorage.getItem(getStorageKey());
    if (auth) {
      const parsed = JSON.parse(auth);
      return parsed?.result?.token ?? null;
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
  return null;
};

export const isTokenValid = (): boolean => {
  return Boolean(getToken());
};
