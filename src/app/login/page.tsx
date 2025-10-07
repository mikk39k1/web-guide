'use client'

import { signIn, signUp } from '@/lib/auth/actions'
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  async function handleSignIn(formData: FormData) {
    const result = await signIn(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  async function handleSignUp(formData: FormData) {
    const result = await signUp(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 p-8 shadow-sm">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              formAction={handleSignIn}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in
            </button>
            <button
              formAction={handleSignUp}
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}