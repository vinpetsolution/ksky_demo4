/**
 * Mobile login: username/id is case-insensitive (letters only; other characters unchanged).
 * Password must be sent as entered — do not normalize here.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth <= 768 ||
    /mobile|android|iphone|ipad/i.test(navigator.userAgent)
  );
}

/** Fold case for Latin letters; keeps digits, symbols, CJK, etc. unchanged. */
export function normalizeLoginUserIdCaseInsensitive(userId: string): string {
  return userId.toLocaleLowerCase("en-US");
}
