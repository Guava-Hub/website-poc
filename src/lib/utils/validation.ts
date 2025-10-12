/**
 * Validation utilities
 */

/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone number validation (US format)
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

/**
 * Credit card validation (Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, "");
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Credit card type detection
 */
export const getCreditCardType = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, "");
  
  if (/^4/.test(cleaned)) {
    return "visa";
  } else if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
    return "mastercard";
  } else if (/^3[47]/.test(cleaned)) {
    return "amex";
  } else if (/^6/.test(cleaned)) {
    return "discover";
  }
  
  return "unknown";
};

/**
 * Password strength validation
 */
export const getPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
  isValid: boolean;
} => {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length < 8) {
    feedback.push("Password must be at least 8 characters long");
  } else {
    score += 1;
  }
  
  if (!/[a-z]/.test(password)) {
    feedback.push("Password must contain at least one lowercase letter");
  } else {
    score += 1;
  }
  
  if (!/[A-Z]/.test(password)) {
    feedback.push("Password must contain at least one uppercase letter");
  } else {
    score += 1;
  }
  
  if (!/\d/.test(password)) {
    feedback.push("Password must contain at least one number");
  } else {
    score += 1;
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push("Password must contain at least one special character");
  } else {
    score += 1;
  }
  
  return {
    score,
    feedback,
    isValid: score >= 4,
  };
};

/**
 * URL validation
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Postal code validation (US ZIP)
 */
export const isValidPostalCode = (postalCode: string, country: string = "US"): boolean => {
  switch (country.toUpperCase()) {
    case "US":
      return /^\d{5}(-\d{4})?$/.test(postalCode);
    case "CA":
      return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode);
    case "UK":
      return /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/.test(postalCode);
    default:
      return postalCode.length >= 3 && postalCode.length <= 10;
  }
};

/**
 * Required field validation
 */
export const isRequired = (value: any): boolean => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Minimum length validation
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Maximum length validation
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Numeric validation
 */
export const isNumeric = (value: string): boolean => {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
};

/**
 * Integer validation
 */
export const isInteger = (value: string): boolean => {
  return Number.isInteger(Number(value));
};

/**
 * Range validation
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};