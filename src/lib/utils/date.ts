/**
 * Date formatting utilities
 */

/**
 * Format date for display
 */
export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {},
  locale: string = "en-US"
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(dateObj);
};

/**
 * Format date with time
 */
export const formatDateTime = (
  date: string | Date,
  locale: string = "en-US"
): string => {
  return formatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }, locale);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (
  date: string | Date,
  locale: string = "en-US"
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return rtf.format(-diffInYears, "year");
  } else if (diffInMonths > 0) {
    return rtf.format(-diffInMonths, "month");
  } else if (diffInWeeks > 0) {
    return rtf.format(-diffInWeeks, "week");
  } else if (diffInDays > 0) {
    return rtf.format(-diffInDays, "day");
  } else if (diffInHours > 0) {
    return rtf.format(-diffInHours, "hour");
  } else if (diffInMinutes > 0) {
    return rtf.format(-diffInMinutes, "minute");
  } else {
    return rtf.format(-diffInSeconds, "second");
  }
};

/**
 * Get time zone from date
 */
export const getTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Check if date is today
 */
export const isToday = (date: string | Date): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.getDate() === today.getDate() &&
         dateObj.getMonth() === today.getMonth() &&
         dateObj.getFullYear() === today.getFullYear();
};

/**
 * Check if date is this week
 */
export const isThisWeek = (date: string | Date): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));
  
  return dateObj >= startOfWeek && dateObj <= endOfWeek;
};

/**
 * Add days to date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get estimated delivery date range
 */
export const getDeliveryDateRange = (
  orderDate: Date,
  minDays: number,
  maxDays: number
): { min: Date; max: Date; formatted: string } => {
  const min = addDays(orderDate, minDays);
  const max = addDays(orderDate, maxDays);
  
  const formatted = `${formatDate(min, { month: "short", day: "numeric" })} - ${formatDate(max, { month: "short", day: "numeric" })}`;
  
  return { min, max, formatted };
};