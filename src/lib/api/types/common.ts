/**
 * Common API response types
 */

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiListResponse<T = any> {
  data: T[];
  total: number;
  page?: number;
  pageSize?: number;
  hasMore?: boolean;
}

export interface ApiSingleResponse<T = any> {
  data: T;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
  field?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  offset?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FilterParams {
  [key: string]: any;
}

export interface SearchParams {
  query?: string;
  filters?: FilterParams;
  pagination?: PaginationParams;
  sort?: SortParams;
}