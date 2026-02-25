/**
 * Formats a number into Indian currency format with ₹ symbol.
 * e.g. 2800000000 → ₹28,00,00,000
 */
export function formatIndianPrice(n: number): string {
  if (isNaN(n) || n === 0) return '₹0';

  const str = Math.round(n).toString();
  const len = str.length;

  if (len <= 3) return `₹${str}`;

  // Indian number system: last 3 digits, then groups of 2
  const lastThree = str.slice(len - 3);
  const remaining = str.slice(0, len - 3);

  let formatted = '';
  for (let i = remaining.length; i > 0; i -= 2) {
    const start = Math.max(0, i - 2);
    formatted = remaining.slice(start, i) + (formatted ? ',' + formatted : '');
  }

  return `₹${formatted},${lastThree}`;
}
