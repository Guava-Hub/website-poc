import { apiClient } from "../client";
import { API_ENDPOINTS, CACHE_CONFIG } from "@/lib/config";
import type {
  User,
  Address,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  RefreshTokenRequest,
  AuthResponse,
  TokenResponse,
  UpdateProfileRequest,
  CreateAddressRequest,
  UpdateAddressRequest,
  FavoriteItem,
  ApiSingleResponse,
  ApiListResponse,
} from "../types";

/**
 * Authentication Service - Handles auth-related API calls
 */
export class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      { cache: "no-store" }
    );

    // Set auth token for subsequent requests
    if (response.accessToken) {
      apiClient.setAuthToken(response.accessToken);
    }

    return response;
  }

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData,
      { cache: "no-store" }
    );

    // Set auth token for subsequent requests
    if (response.accessToken) {
      apiClient.setAuthToken(response.accessToken);
    }

    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {}, { cache: "no-store" });
    } finally {
      // Always clear auth token, even if logout request fails
      apiClient.clearAuthToken();
      // Clear user cache
      apiClient.revalidate(CACHE_CONFIG.USER.tags);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken },
      { cache: "no-store" }
    );

    // Update auth token
    if (response.accessToken) {
      apiClient.setAuthToken(response.accessToken);
    }

    return response;
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { email },
      { cache: "no-store" }
    );
  }

  /**
   * Verify email address
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      data,
      { cache: "no-store" }
    );
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiSingleResponse<User>> {
    return apiClient.get<ApiSingleResponse<User>>(
      API_ENDPOINTS.AUTH.PROFILE,
      {
        ...CACHE_CONFIG.USER,
      }
    );
  }

  /**
   * Check if user is authenticated
   */
  async checkAuth(): Promise<ApiSingleResponse<User>> {
    return this.getProfile();
  }
}

/**
 * User Service - Handles user profile and data management
 */
export class UserService {
  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<ApiSingleResponse<User>> {
    const response = await apiClient.put<ApiSingleResponse<User>>(
      API_ENDPOINTS.USERS.UPDATE_PROFILE,
      data
    );

    // Revalidate user cache
    apiClient.revalidate(CACHE_CONFIG.USER.tags);

    return response;
  }

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.USERS.CHANGE_PASSWORD,
      data,
      { cache: "no-store" }
    );
  }

  /**
   * Get user addresses
   */
  async getAddresses(): Promise<ApiListResponse<Address>> {
    return apiClient.get<ApiListResponse<Address>>(
      API_ENDPOINTS.USERS.ADDRESSES,
      {
        ...CACHE_CONFIG.USER,
        tags: [...CACHE_CONFIG.USER.tags, "addresses"],
      }
    );
  }

  /**
   * Create new address
   */
  async createAddress(data: CreateAddressRequest): Promise<ApiSingleResponse<Address>> {
    const response = await apiClient.post<ApiSingleResponse<Address>>(
      API_ENDPOINTS.USERS.ADDRESSES,
      data
    );

    // Revalidate addresses cache
    apiClient.revalidate([...CACHE_CONFIG.USER.tags, "addresses"]);

    return response;
  }

  /**
   * Update address
   */
  async updateAddress(data: UpdateAddressRequest): Promise<ApiSingleResponse<Address>> {
    const response = await apiClient.put<ApiSingleResponse<Address>>(
      `/api/users/addresses/${data.id}`,
      data
    );

    // Revalidate addresses cache
    apiClient.revalidate([...CACHE_CONFIG.USER.tags, "addresses"]);

    return response;
  }

  /**
   * Delete address
   */
  async deleteAddress(addressId: string): Promise<void> {
    await apiClient.delete(`/api/users/addresses/${addressId}`);

    // Revalidate addresses cache
    apiClient.revalidate([...CACHE_CONFIG.USER.tags, "addresses"]);
  }

  /**
   * Get user favorites
   */
  async getFavorites(): Promise<ApiListResponse<FavoriteItem>> {
    return apiClient.get<ApiListResponse<FavoriteItem>>(
      API_ENDPOINTS.USERS.FAVORITES,
      {
        ...CACHE_CONFIG.USER,
        tags: [...CACHE_CONFIG.USER.tags, "favorites"],
      }
    );
  }

  /**
   * Add product to favorites
   */
  async addToFavorites(productId: string): Promise<ApiSingleResponse<FavoriteItem>> {
    const response = await apiClient.post<ApiSingleResponse<FavoriteItem>>(
      API_ENDPOINTS.USERS.FAVORITES,
      { productId }
    );

    // Revalidate favorites cache
    apiClient.revalidate([...CACHE_CONFIG.USER.tags, "favorites"]);

    return response;
  }

  /**
   * Remove product from favorites
   */
  async removeFromFavorites(favoriteId: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.USERS.FAVORITES}/${favoriteId}`);

    // Revalidate favorites cache
    apiClient.revalidate([...CACHE_CONFIG.USER.tags, "favorites"]);
  }

  /**
   * Check if product is in favorites
   */
  async isFavorite(productId: string): Promise<{ isFavorite: boolean }> {
    return apiClient.get<{ isFavorite: boolean }>(
      `${API_ENDPOINTS.USERS.FAVORITES}/check/${productId}`,
      {
        ...CACHE_CONFIG.USER,
        tags: [...CACHE_CONFIG.USER.tags, "favorites"],
      }
    );
  }
}

// Create singleton instances
export const authService = new AuthService();
export const userService = new UserService();