/**
 * Authentication and User related API types
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  preferences?: UserPreferences;
  addresses?: Address[];
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  isActive: boolean;
  role: "customer" | "admin" | "moderator";
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  language: string;
  currency: string;
  theme: "light" | "dark" | "system";
}

export interface Address {
  id: string;
  type: "shipping" | "billing";
  isDefault: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Auth requests
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms: boolean;
  subscribe?: boolean;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
  email: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Auth responses
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Profile requests
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  preferences?: Partial<UserPreferences>;
}

export interface CreateAddressRequest {
  type: "shipping" | "billing";
  isDefault?: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {
  id: string;
}

// Favorites
export interface FavoriteItem {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
  product?: any; // Product details populated on fetch
}