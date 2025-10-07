import { NextResponse } from 'next/server'
import { db } from '@/lib/drizzle'
import { posts } from '@/lib/drizzle/schema'
import { requireAuth } from '@/lib/auth'

/**
 * GET /api/posts - Get all posts
 */
export async function GET() {
  try {
    const allPosts = await db.select().from(posts)
    return NextResponse.json(allPosts)
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * POST /api/posts - Create a new post (protected)
 */
export async function POST(request: Request) {
  try {
    // Require authentication
    const currentUser = await requireAuth()

    const body = await request.json()
    const { title, content, published } = body

    const [newPost] = await db.insert(posts).values({
      userId: currentUser.id,
      title,
      content,
      published: published ? 1 : 0,
    }).returning()

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
