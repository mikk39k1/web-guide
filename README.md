# Web Guide - Next.js + Drizzle + Supabase

A modern full-stack boilerplate with Next.js 15, Drizzle ORM, and Supabase authentication.

## Tech Stack

- **Frontend & Backend:** Next.js 15 (App Router)
- **Database ORM:** Drizzle ORM
- **Database:** PostgreSQL (hosted on Supabase)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── posts/             # Posts CRUD endpoints
│   │   └── users/             # User management endpoints
│   ├── auth/
│   │   └── callback/          # OAuth callback handler
│   ├── dashboard/             # Protected dashboard page
│   ├── login/                 # Login/signup page
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── auth/                  # Auth utilities
│   │   ├── index.ts          # Auth helper functions
│   │   └── actions.ts        # Server actions for auth
│   ├── drizzle/              # Database
│   │   ├── index.ts          # Drizzle client
│   │   └── schema.ts         # Database schema
│   ├── supabase/             # Supabase clients
│   │   ├── client.ts         # Browser client
│   │   ├── server.ts         # Server client
│   │   └── middleware.ts     # Middleware helper
│   └── utils.ts              # Utility functions
└── middleware.ts              # Next.js middleware (auth)
```

## Getting Started

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))

### 2. Clone and Install

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings** > **API**
3. Copy your project URL and anon key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database URL (use connection pooling)
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Getting the DATABASE_URL:**

1. In Supabase, go to **Project Settings** > **Database**
2. Under **Connection string**, choose **URI** (or **Connection pooling** for production)
3. Copy the URI and replace `[password]` with your database password

### 5. Sync Database Schema

Push your schema to Supabase:

```bash
npm run db:push
```

This will create the `users` and `posts` tables in your Supabase database.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema changes directly (for development)
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Authentication

### Sign Up / Sign In

The boilerplate includes a login page at `/login` with email/password authentication.

### Protected Routes

Routes are protected using Next.js middleware. Configure protected paths in `src/middleware.ts`:

```typescript
const protectedPaths = ["/dashboard", "/profile", "/settings"];
```

### Auth Helpers

```typescript
import { getCurrentUser, requireAuth } from "@/lib/auth";

// In Server Components
const user = await getCurrentUser(); // Returns user or null

// In API routes or Server Actions (throws if not authenticated)
const user = await requireAuth();
```

### Server Actions

```typescript
import { signIn, signUp, signOut } from "@/lib/auth/actions";

// Use in forms
<form action={signIn}>{/* form fields */}</form>;
```

## Database

### Schema

The schema is defined in `src/lib/drizzle/schema.ts`. It includes:

- **users** - User profiles (extends Supabase auth.users)
- **posts** - Example posts table with foreign key to users

### Adding Tables

1. Edit `src/lib/drizzle/schema.ts`
2. Run `npm run db:push` to sync changes

### Querying

```typescript
import { db } from "@/lib/drizzle";
import { users, posts } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

// Select all
const allUsers = await db.select().from(users);

// Select with condition
const user = await db.select().from(users).where(eq(users.id, userId));

// Insert
await db.insert(users).values({
  id: userId,
  email: "user@example.com",
  fullName: "John Doe",
});

// Update
await db
  .update(users)
  .set({ fullName: "Jane Doe" })
  .where(eq(users.id, userId));

// Delete
await db.delete(users).where(eq(users.id, userId));
```

## API Routes

### Example Endpoints

- `GET /api/users` - Get all users (protected)
- `POST /api/users` - Create a user (protected)
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a post (protected)

### Creating New Endpoints

```typescript
// src/app/api/example/route.ts
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/drizzle";

export async function GET() {
  const user = await requireAuth(); // Protect the route

  // Your logic here

  return NextResponse.json({ data: "example" });
}
```

## Supabase Features

### Row Level Security (RLS)

For production, enable RLS in Supabase:

```sql
-- Example: Users can only read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

### Storage

To use Supabase Storage:

```typescript
const supabase = createClient();
const { data, error } = await supabase.storage
  .from("bucket-name")
  .upload("file-path", file);
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

### Environment Variables for Production

Make sure to add these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL` (use connection pooling URL)
- `NEXT_PUBLIC_SITE_URL` (your production URL)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

MIT
