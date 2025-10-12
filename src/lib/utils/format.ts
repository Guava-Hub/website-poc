/**
 * Format currency value with proper localization
 */
export const formatCurrency = (
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

/**
 * Format percentage value
 */
export const formatPercentage = (
  value: number,
  decimals: number = 0,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

/**
 * Format number with compact notation (1.2K, 1.5M, etc.)
 */
export const formatCompactNumber = (
  value: number,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phoneNumber;
};

/**
 * Format credit card number with masking
 */
export const formatCreditCard = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})(\d{4})$/);
  
  if (match) {
    return `**** **** **** ${match[4]}`;
  }
  
  return cardNumber;
};

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercentage = (
  originalPrice: number,
  salePrice: number
): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Calculate tax amount
 */
export const calculateTax = (amount: number, taxRate: number): number => {
  return Math.round((amount * (taxRate / 100)) * 100) / 100;
};

/**
 * Calculate shipping cost based on weight and distance
 */
export const calculateShipping = (
  weight: number,
  distance: number,
  baseRate: number = 5.99
): number => {
  const weightFactor = Math.max(0, weight - 1) * 0.5;
  const distanceFactor = Math.floor(distance / 100) * 1.0;
  return Math.round((baseRate + weightFactor + distanceFactor) * 100) / 100;
};