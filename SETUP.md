# Setup Guide

Follow these steps to get your project up and running with Supabase.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - Project name: `web-guide` (or your preferred name)
   - Database Password: Generate a strong password (save this!)
   - Region: Choose closest to your users
4. Click **"Create new project"**
5. Wait for the project to be provisioned (~2 minutes)

## Step 3: Get Your Supabase Credentials

### A. Get API Keys

1. In your Supabase project, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL** - Copy this
   - **anon public** key - Copy this (click the eye icon to reveal)

### B. Get Database URL

1. In your Supabase project, go to **Settings** > **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password from Step 2

> **For Production:** Use the **Connection pooling** URI instead (under "Connection Pooling" section)

## Step 4: Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace the values with your actual Supabase credentials from Step 3.

## Step 5: Enable Email Auth in Supabase

1. In Supabase, go to **Authentication** > **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Configure email templates if desired under **Email Templates**

## Step 6: Push Database Schema

Run this command to create the tables in your Supabase database:

```bash
npm run db:push
```

This will create:

- `users` table
- `posts` table

You can view these in Supabase under **Table Editor**.

## Step 7: (Optional) Set Up Row Level Security

For production, you should enable RLS (Row Level Security):

1. In Supabase, go to **Authentication** > **Policies**
2. For the `users` table, add policies like:

```sql
-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

3. For the `posts` table:

```sql
-- Anyone can read published posts
CREATE POLICY "Anyone can read published posts" ON posts
  FOR SELECT USING (published = 1);

-- Users can CRUD their own posts
CREATE POLICY "Users can manage own posts" ON posts
  FOR ALL USING (auth.uid() = user_id);
```

## Step 8: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 9: Test Authentication

1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Sign up with an email and password
3. Check your email for a confirmation link (if email confirmation is enabled)
4. After confirming, you'll be redirected to the dashboard

## Troubleshooting

### "Invalid API key" error

- Double-check your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure there are no extra spaces or quotes

### "Connection refused" database error

- Verify your `DATABASE_URL` is correct
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Check if your IP is allowed (Supabase allows all IPs by default)

### Email confirmation not working

- Go to **Authentication** > **Email Templates** in Supabase
- Check the "Confirm signup" template
- For development, you can disable email confirmation:
  - Go to **Authentication** > **Settings**
  - Uncheck "Enable email confirmations"

### "User already exists" when signing up

- The user might already be in the auth.users table
- Go to **Authentication** > **Users** in Supabase to check
- Delete the user if needed and try again

## Next Steps

Now that your project is set up:

1. **Customize the schema** - Edit `src/lib/drizzle/schema.ts`
2. **Add more API routes** - Create files in `src/app/api/`
3. **Build your pages** - Add pages in `src/app/`
4. **Style with Tailwind** - Use Tailwind classes or add shadcn/ui components
5. **Deploy** - See the README for deployment instructions

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run db:studio        # Open database GUI

# Database
npm run db:push          # Push schema changes
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations

# Production
npm run build            # Build for production
npm run start            # Start production server
```

## Need Help?

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs)
- [Supabase Discord](https://discord.supabase.com)
