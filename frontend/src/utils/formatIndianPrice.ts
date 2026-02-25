/**
 * Formats a number in Indian price notation with ₹ symbol.
 * Example: 28000000 → '₹2,80,00,000'
 * Example: 5000000 → '₹50,00,000'
 * Example: 100000 → '₹1,00,000'
 */
export function formatIndianPrice(priceInRupees: number): string {
  if (isNaN(priceInRupees) || priceInRupees === null || priceInRupees === undefined) {
    return '₹0';
  }

  const price = Math.round(priceInRupees);
  const priceStr = price.toString();

  if (priceStr.length <= 3) {
    return `₹${priceStr}`;
  }

  // Last 3 digits
  const lastThree = priceStr.slice(-3);
  // Remaining digits
  const remaining = priceStr.slice(0, -3);

  // Group remaining digits in pairs from right
  let result = '';
  for (let i = remaining.length; i > 0; i -= 2) {
    const start = Math.max(0, i - 2);
    const chunk = remaining.slice(start, i);
    result = chunk + (result ? ',' + result : '');
  }

  return `₹${result},${lastThree}`;
}

/**
 * Parses a price string that may contain 'Cr', 'L', or plain numbers.
 * Returns the numeric value in rupees.
 */
export function parsePriceToNumber(priceStr: string): number {
  if (!priceStr) return 0;

  // Remove ₹ symbol and whitespace
  const cleaned = priceStr.replace(/[₹,\s]/g, '').toLowerCase();

  // Handle crore notation
  if (cleaned.includes('cr')) {
    const num = parseFloat(cleaned.replace('cr', ''));
    return Math.round(num * 10000000);
  }

  // Handle lakh notation
  if (cleaned.includes('l') || cleaned.includes('lac') || cleaned.includes('lakh')) {
    const num = parseFloat(cleaned.replace(/l(ac|akh)?/, ''));
    return Math.round(num * 100000);
  }

  // Plain number
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}
