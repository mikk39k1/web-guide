import { NextResponse } from 'next/server'
import { db } from '@/lib/drizzle'
import { users } from '@/lib/drizzle/schema'
import { requireAuth } from '@/lib/auth'

/**
 * GET /api/users - Get all users (protected)
 */
export async function GET() {
  try {
    // Require authentication
    await requireAuth()

    const allUsers = await db.select().from(users)
    return NextResponse.json(allUsers)
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * POST /api/users - Create a new user (protected)
 */
export async function POST(request: Request) {
  try {
    // Require authentication
    const currentUser = await requireAuth()

    const body = await request.json()
    const { email, fullName, avatarUrl } = body

    // Create user with Supabase auth ID
    const [newUser] = await db.insert(users).values({
      id: currentUser.id, // Use Supabase auth user ID
      email,
      fullName,
      avatarUrl,
    }).returning()

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
