import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 254 }).notNull(),
  topic: varchar('topic', { length: 160 }),
  message: text('message').notNull(),
  sourceUrl: varchar('source_url', { length: 2048 }),
  referringPage: varchar('referring_page', { length: 255 }),
  status: varchar('status', { length: 32 }).notNull().default('new'),
  spamStatus: varchar('spam_status', { length: 32 })
    .notNull()
    .default('accepted'),
  notificationStatus: varchar('notification_status', { length: 32 })
    .notNull()
    .default('pending'),
  notificationAttemptedAt: timestamp('notification_attempted_at', {
    withTimezone: true,
  }),
  notificationSentAt: timestamp('notification_sent_at', {
    withTimezone: true,
  }),
});

export type ContactSubmissionRow = typeof contactSubmissions.$inferSelect;
