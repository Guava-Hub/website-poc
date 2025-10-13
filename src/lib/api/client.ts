import { revalidateTag } from "next/cache";
import { API_CONFIG } from "@/lib/config";

export interface ApiRequestOptions extends RequestInit {
    cache?: RequestCache;
    revalidate?: number | false;
    tags?: string[];
    timeout?: number;
    retries?: number;
}

export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    details?: any;
}

export class ApiClientError extends Error {
    public readonly status?: number;
    public readonly code?: string;
    public readonly details?: any;

    constructor(message: string, status?: number, code?: string, details?: any) {
        super(message);
        this.name = "ApiClientError";
        this.status = status;
        this.code = code;
        this.details = details;
    }
}

/**
 * Core API Client for making HTTP requests
 */
export class ApiClient {
    private baseUrl: string;
    private defaultOptions: RequestInit;

    constructor(baseUrl: string = API_CONFIG.BASE_URL) {
        this.baseUrl = baseUrl;
        this.defaultOptions = {
            headers: {
                "Content-Type": "application/json",
                "api-version": API_CONFIG.API_VERSION,
            },
        };
    }

    /**
     * Set authorization header for authenticated requests
     */
    setAuthToken(token: string) {
        this.defaultOptions.headers = {
            ...this.defaultOptions.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    /**
     * Remove authorization header
     */
    clearAuthToken() {
        const { Authorization, ...headers } = this.defaultOptions.headers as any;
        this.defaultOptions.headers = headers;
    }

    /**
     * Make a generic HTTP request
     */
    async request<T = any>(
        endpoint: string,
        options: ApiRequestOptions = {}
    ): Promise<T> {
        // If no base URL is configured, fall back to mock simulation
        if (!this.baseUrl || this.baseUrl === "") {
            const { simulateResponse } = await import("./mock-simulation");
            return simulateResponse<T>(endpoint);
        }

        const {
            cache,
            revalidate = API_CONFIG.DEFAULT_REVALIDATE,
            tags = [],
            timeout = API_CONFIG.TIMEOUT,
            retries = API_CONFIG.RETRY_ATTEMPTS,
            ...fetchOptions
        } = options;

        const url = this.buildUrl(endpoint);
        const requestOptions: RequestInit = {
            ...this.defaultOptions,
            ...fetchOptions,
            headers: {
                ...this.defaultOptions.headers,
                ...fetchOptions.headers,
            },
        };

        // Add Next.js cache options for server-side requests
        if (typeof window === "undefined") {
            requestOptions.next = {
                revalidate: revalidate || undefined,
                tags: tags.length > 0 ? tags : undefined,
            };
        }

        // Add cache option
        if (cache) {
            requestOptions.cache = cache;
        }

        return this.executeWithRetry(url, requestOptions, retries, timeout);
    }

    /**
     * Execute request with retry logic and timeout
     */
    private async executeWithRetry<T>(
        url: string,
        options: RequestInit,
        retries: number,
        timeout: number
    ): Promise<T> {
        let lastError: Error | undefined = undefined;

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new ApiClientError(
                        `HTTP ${response.status}: ${response.statusText}`,
                        response.status,
                        response.status.toString()
                    );
                }

                const data = await response.json();
                return data;
            } catch (error) {
                lastError = error as Error;

                // Handle URL parsing errors by falling back to mock data
                if (error instanceof TypeError && error.message.includes("Invalid URL")) {
                    console.warn("Invalid URL, falling back to mock data for", url);
                    const endpoint = url.replace(this.baseUrl, "");
                    const { simulateResponse } = await import("./mock-simulation");
                    return simulateResponse<T>(endpoint);
                }

                // Don't retry on client errors (4xx) except 408, 429
                if (
                    error instanceof ApiClientError &&
                    error.status &&
                    error.status >= 400 &&
                    error.status < 500 &&
                    error.status !== 408 &&
                    error.status !== 429
                ) {
                    throw error;
                }

                // Wait before retry (exponential backoff)
                if (attempt < retries) {
                    await this.sleep(API_CONFIG.RETRY_DELAY * Math.pow(2, attempt));
                }
            }
        }

        // If all retries failed and it's a URL error, fall back to mock data
        if (lastError && lastError instanceof TypeError && lastError.message.includes("Invalid URL")) {
            console.warn("All retries failed with URL error, falling back to mock data for", url);
            const endpoint = url.replace(this.baseUrl, "");
            const { simulateResponse } = await import("./mock-simulation");
            return simulateResponse<T>(endpoint);
        }

        throw lastError!;
    }

    /**
     * GET request
     */
    async get<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    }

    /**
     * POST request
     */
    async post<T = any>(
        endpoint: string,
        data?: any,
        options?: ApiRequestOptions
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * PUT request
     */
    async put<T = any>(
        endpoint: string,
        data?: any,
        options?: ApiRequestOptions
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * PATCH request
     */
    async patch<T = any>(
        endpoint: string,
        data?: any,
        options?: ApiRequestOptions
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PATCH",
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * DELETE request
     */
    async delete<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }

    /**
     * Revalidate cache tags
     */
    revalidate(tags: string | string[]) {
        const tagArray = Array.isArray(tags) ? tags : [tags];
        tagArray.forEach((tag) => revalidateTag(tag));
    }

    /**
     * Build full URL from endpoint
     */
    private buildUrl(endpoint: string): string {
        if (endpoint.startsWith("http")) {
            return endpoint;
        }

        // If no base URL, return the endpoint as-is (this will be caught and handled elsewhere)
        if (!this.baseUrl || this.baseUrl === "") {
            return endpoint;
        }

        return `${this.baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
    }

    /**
     * Sleep utility for retry delays
     */
    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// Create singleton instance
export const apiClient = new ApiClient();