import { ENV } from '@/utils/env';

export type StoredKey = `${typeof ENV.APP_KEY}_auth`;

export const getStorageKey = () => `${ENV.APP_KEY}_auth` as const;
export const getRefreshTokenKey = () => `${ENV.APP_KEY}_refresh_token` as const;
export const getUserKey = () => `${ENV.APP_KEY}_user` as const;
