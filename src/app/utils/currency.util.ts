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

/**
 * Formats the Net Cash Flow (NCF) value to 2 decimal places, truncated (not rounded up).
 */
export function formatCurrencyNCF(value: number): string {
  if (value === 0) return '-';
  const absVal = Math.abs(value);
  let formatted = '';

  if (absVal >= 1e9) {
    const truncated = Math.floor((absVal / 1e9) * 100) / 100;
    formatted = truncated.toFixed(2).replace(/\.00$/, '') + 'B';
  } else if (absVal >= 1e6) {
    const truncated = Math.floor((absVal / 1e6) * 100) / 100;
    formatted = truncated.toFixed(2).replace(/\.00$/, '') + 'M';
  } else if (absVal >= 1e3) {
    const truncated = Math.floor((absVal / 1e3) * 100) / 100;
    formatted = truncated.toFixed(2).replace(/\.00$/, '') + 'K';
  } else {
    formatted = absVal.toString();
  }

  return value < 0 ? `-Rp ${formatted}` : `Rp ${formatted}`;
}

/**
 * Formats a number as a short Indonesian Rupiah string (K/M/B suffix)
 * truncated to a maximum of 3 decimal places (without rounding up/down).
 */
export function formatCurrencyTruncated3(value: number): string {
  if (value === 0) return '-';
  const absVal = Math.abs(value);
  let formatted = '';

  if (absVal >= 1e9) {
    const truncated = Math.floor((absVal / 1e9) * 1000) / 1000;
    formatted = parseFloat(truncated.toFixed(2)).toString() + 'B';
  } else if (absVal >= 1e6) {
    const truncated = Math.floor((absVal / 1e6) * 1000) / 1000;
    formatted = parseFloat(truncated.toFixed(2)).toString() + 'M';
  } else if (absVal >= 1e3) {
    const truncated = Math.floor((absVal / 1e3) * 1000) / 1000;
    formatted = parseFloat(truncated.toFixed(2)).toString() + 'K';
  } else {
    const truncated = Math.floor(absVal * 1000) / 1000;
    formatted = parseFloat(truncated.toFixed(2)).toString();
  }

  return value < 0 ? `-Rp ${formatted}` : `Rp ${formatted}`;
}
