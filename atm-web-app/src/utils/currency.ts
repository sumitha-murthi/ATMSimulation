/**
 * Format number to Indian currency (INR) with proper spacing
 * Examples:
 * - 5000 → ₹ 5,000
 * - 100000 → ₹ 1,00,000
 * - 5000.50 → ₹ 5,000.50
 */
export const formatINR = (amount: number): string => {
  // Use Indian locale formatting
  const formatted = amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `₹ ${formatted}`;
};

/**
 * Format number to Indian currency without symbol (for CSV export)
 */
export const formatINRPlain = (amount: number): string => {
  return amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Parse INR string back to number
 * Example: "₹ 5,000.00" → 5000
 */
export const parseINR = (inrString: string): number => {
  const cleaned = inrString.replace(/[₹,\s]/g, '');
  return parseFloat(cleaned) || 0;
};
