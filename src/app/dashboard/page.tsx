import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth/actions'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">User Information</h2>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="text-sm text-gray-900">{user.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="text-sm text-gray-900">
                {new Date(user.created_at).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Quick Start</h2>
          <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
            <li>Your authentication is set up with Supabase</li>
            <li>Database schema is configured with Drizzle ORM</li>
            <li>Check out the API routes in <code className="rounded bg-gray-100 px-1 py-0.5">/app/api</code></li>
            <li>Modify the schema in <code className="rounded bg-gray-100 px-1 py-0.5">/lib/drizzle/schema.ts</code></li>
            <li>Run <code className="rounded bg-gray-100 px-1 py-0.5">npm run db:push</code> to sync your database</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
