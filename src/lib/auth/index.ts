import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

/**
 * Gets the current user from Supabase auth
 * Cached to avoid multiple calls in a single render
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
})

/**
 * Gets the current session
 * Cached to avoid multiple calls in a single render
 */
export const getSession = cache(async () => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
})

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Require authentication - throws if not authenticated
 * Use in Server Components or Server Actions
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}
