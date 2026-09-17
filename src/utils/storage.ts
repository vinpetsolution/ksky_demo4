import { StoredKey } from "@/constants/store-key";

export const saveStorageKey = ({ data, key }: { data: string; key: StoredKey }) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, data);
  }
};

export const getStorageKey = ({ key }: { key: StoredKey }): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
};

export const removeStorageKey = ({ key }: { key: StoredKey }) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};
