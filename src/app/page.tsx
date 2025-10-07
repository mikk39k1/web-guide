import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          Welcome to Your App
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Next.js + Drizzle ORM + Supabase Auth
        </p>

        {user ? (
          <div className="space-y-4">
            <p className="text-lg">
              Welcome back, <span className="font-semibold">{user.email}</span>!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/dashboard"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="mt-16 rounded-lg border border-gray-200 bg-white p-8 text-left shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Project Structure</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">Authentication</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li><code className="rounded bg-gray-100 px-1 py-0.5">/lib/supabase</code> - Supabase client configuration</li>
                <li><code className="rounded bg-gray-100 px-1 py-0.5">/lib/auth</code> - Auth utilities and server actions</li>
                <li><code className="rounded bg-gray-100 px-1 py-0.5">/middleware.ts</code> - Auth middleware for protected routes</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">Database</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li><code className="rounded bg-gray-100 px-1 py-0.5">/lib/drizzle</code> - Drizzle ORM setup and schema</li>
                <li><code className="rounded bg-gray-100 px-1 py-0.5">drizzle.config.ts</code> - Drizzle Kit configuration</li>
                <li>Run <code className="rounded bg-gray-100 px-1 py-0.5">npm run db:push</code> to sync schema</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">API Routes</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li><code className="rounded bg-gray-100 px-1 py-0.5">/app/api/users</code> - User management endpoints</li>
                <li><code className="rounded bg-gray-100 px-1 py-0.5">/app/api/posts</code> - Posts CRUD endpoints</li>
                <li><code className="rounded bg-gray-100 px-1 py-0.5">/app/auth/callback</code> - OAuth callback handler</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
