import { pgTable, text, timestamp, uuid, varchar, integer } from "drizzle-orm/pg-core";

/**
 * Users table - extends Supabase auth.users
 * Supabase handles authentication, this table stores additional user data
 * The id should match the auth.users.id from Supabase
 */
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // matches auth.users.id from Supabase
  email: varchar('email', { length: 255 }).notNull(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Example table: Posts
 * Shows how to create related tables with foreign keys
 */
export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  published: integer('published').default(0).notNull(), // 0 = draft, 1 = published
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Export types for use in your application
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;