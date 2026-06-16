/**
 * Shared currency formatting utilities.
 *
 * Extracted from App, RencanaPembangunan, and AspekKeuangan components
 * to eliminate duplication (DRY principle).
 * Pure functions with no side effects — easily testable.
 */

/**
 * Formats a number as Indonesian Rupiah with thousands separators.
 * Negative values are wrapped in parentheses (accounting notation).
 *
 * @example formatCurrency(1500000)  → "1.500.000"
 * @example formatCurrency(-500000)  → "(500.000)"
 * @example formatCurrency(0)        → "-"
 */
export function formatCurrency(value: number): string {
  if (value === 0) return '-';
  const formatted = Math.abs(Math.round(value)).toLocaleString('id-ID');
  return value < 0 ? `(${formatted})` : formatted;
}

/**
 * Formats a number as a short Indonesian Rupiah string (K/M/B suffix).
 *
 * @example formatCurrencyShort(1500000)   → "Rp 1.5M"
 * @example formatCurrencyShort(-500000)   → "-Rp 500K"
 * @example formatCurrencyShort(0)         → "-"
 */
export function formatCurrencyShort(value: number): string {
  if (value === 0) return '-';
  const absVal = Math.abs(value);
  let formatted = '';

  if (absVal >= 1e9) {
    formatted = (absVal / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (absVal >= 1e6) {
    formatted = (absVal / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (absVal >= 1e3) {
    formatted = (absVal / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    formatted = absVal.toString();
  }

  return value < 0 ? `-Rp ${formatted}` : `Rp ${formatted}`;
}
