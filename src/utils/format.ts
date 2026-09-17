/**
 * Format number with comma as thousands separator.
 * @example formatNumber(250000) => "250,000"
 */
export function formatNumber(value: number): string {
    return value.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
}
