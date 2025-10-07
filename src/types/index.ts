import { User as SupabaseUser } from '@supabase/supabase-js'

/**
 * Extended Supabase User type
 */
export type User = SupabaseUser

/**
 * API Response types
 */
export interface ApiResponse<T> {
  data?: T
  error?: string
}

/**
 * Pagination types
 */
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
