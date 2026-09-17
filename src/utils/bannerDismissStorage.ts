import { ENV } from '@/utils/env';

/** Legacy: chỉ có mảng id, key `${APP_KEY}_banner_hide_ids_${userName}` */
const LEGACY_PREFIX = `${ENV.APP_KEY}_banner_hide_ids_`;
/** Chuẩn mới: id hoặc user + lưu cả urls */
const STORAGE_PREFIX = `${ENV.APP_KEY}_banner_hide_v2_`;

export type BannerDismissBuckets = {
  ids: Set<string>;
  urls: Set<string>;
};

function emptyBuckets(): BannerDismissBuckets {
  return { ids: new Set<string>(), urls: new Set<string>() };
}

/** URL ổn định (bỏ query/hash) để ẩn đúng tấm dù backend đổi id */
export function normalizeBannerImageUrl(raw: string | undefined | null): string {
  const s = String(raw ?? '').trim();
  if (!s) return '';
  try {
    const u = new URL(s);
    u.search = '';
    u.hash = '';
    return u.href.replace(/\/$/, '');
  } catch {
    return s.split('?')[0].split('#')[0].replace(/\/$/, '');
  }
}

function mergeInto(target: BannerDismissBuckets, source: BannerDismissBuckets): void {
  source.ids.forEach((id) => target.ids.add(id));
  source.urls.forEach((u) => target.urls.add(u));
}

/** Đọc một key localStorage → ids + urls */
function parseBucket(raw: string | null): BannerDismissBuckets {
  const out = emptyBuckets();
  if (!raw) return out;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      parsed.forEach((x) => out.ids.add(String(x)));
      return out;
    }
    if (parsed && typeof parsed === 'object') {
      const o = parsed as Record<string, unknown>;
      const ids = o.ids ?? o.Id;
      const urls = o.urls ?? o.Urls;
      if (Array.isArray(ids)) ids.forEach((x) => out.ids.add(String(x)));
      if (Array.isArray(urls)) urls.forEach((x) => out.urls.add(String(x)));
    }
  } catch {
    /* ignore */
  }
  return out;
}

function readKey(fullKey: string): BannerDismissBuckets {
  return parseBucket(
    typeof window === 'undefined' ? null : localStorage.getItem(fullKey),
  );
}

/** Khóa ưu tiên: account id BE; fallback username chữ thường */
export function bannerDismissSuffix(opts: {
  userId?: string | null;
  userName?: string | null;
}): string | undefined {
  const id = opts.userId?.trim();
  if (id) return `id:${id}`;
  const name = opts.userName?.trim().toLowerCase();
  if (name) return `u:${name}`;
  return undefined;
}

function legacyKeysForUsername(userName: string | undefined | null): string[] {
  const raw = userName?.trim();
  if (!raw) return [];
  const lower = raw.toLowerCase();
  return lower === raw ? [`${LEGACY_PREFIX}${raw}`] : [`${LEGACY_PREFIX}${raw}`, `${LEGACY_PREFIX}${lower}`];
}

/** Hợp nhất đã dismiss (đọc cả v2 + legacy) để không mất data sau chỉnh key */
export function getPersistentlyHiddenBannerBuckets(opts: {
  userId?: string | null;
  userName?: string | null;
}): BannerDismissBuckets {
  const merged = emptyBuckets();
  if (typeof window === 'undefined') return merged;

  const suf = bannerDismissSuffix(opts);
  if (suf) {
    mergeInto(merged, readKey(`${STORAGE_PREFIX}${suf}`));
  }
  for (const lk of legacyKeysForUsername(opts.userName)) {
    mergeInto(merged, readKey(lk));
  }

  return merged;
}

/** @deprecated dùng getPersistentlyHiddenBannerBuckets — giữ cho chỗ khác nếu cần chỉ ids */
export function bannerHideStorageKey(userName: string): string {
  return `${LEGACY_PREFIX}${userName.trim().toLowerCase()}`;
}

export function getPersistentlyHiddenBannerIds(userName: string | undefined): Set<string> {
  return getPersistentlyHiddenBannerBuckets({ userName }).ids;
}

function shouldHideBannerByBuckets(h: BannerDismissBuckets, bannerId: string, imageUrl?: string): boolean {
  if (h.ids.has(bannerId)) return true;
  const nu = normalizeBannerImageUrl(imageUrl);
  return Boolean(nu && h.urls.has(nu));
}

export function isBannerDismissedPersistently(
  opts: {
    userId?: string | null;
    userName?: string | null;
  },
  banner: { id: string; imageUrl?: string },
): boolean {
  const h = getPersistentlyHiddenBannerBuckets(opts);
  return shouldHideBannerByBuckets(h, banner.id, banner.imageUrl);
}

export function persistHideBannerForUser(
  opts: {
    userId?: string | null;
    userName?: string | null;
  },
  bannerId: string,
  imageUrl?: string,
): void {
  if (typeof window === 'undefined') return;

  const suf = bannerDismissSuffix(opts);
  if (!suf) return;

  const key = `${STORAGE_PREFIX}${suf}`;
  const existing = readKey(key);

  existing.ids.add(bannerId);
  const nu = normalizeBannerImageUrl(imageUrl);
  if (nu) existing.urls.add(nu);

  for (const lk of legacyKeysForUsername(opts.userName)) {
    mergeInto(existing, readKey(lk));
  }

  localStorage.setItem(
    key,
    JSON.stringify({
      ids: [...existing.ids],
      urls: [...existing.urls],
    }),
  );

  /** Ghi vào khóa legacy (username chữ thường) để đồng bộ các build chỉ đọc key cũ */
  try {
    const un = opts.userName?.trim();
    if (un) {
      localStorage.setItem(
        bannerHideStorageKey(un),
        JSON.stringify({
          ids: [...existing.ids],
          urls: [...existing.urls],
        }),
      );
    }
  } catch {
    /* ignore quota */
  }
}
