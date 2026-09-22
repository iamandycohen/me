import { attachDatabasePool } from '@vercel/functions';
import { eq } from 'drizzle-orm';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import type { AcceptedContactSubmission } from '@/lib/contact/validation';

import { contactSubmissions } from './schema';

export type ContactSubmissionRepository = {
  create(submission: AcceptedContactSubmission): Promise<{ id: string }>;
  markNotificationSent(id: string): Promise<void>;
  markNotificationFailed(id: string): Promise<void>;
};

let database: NodePgDatabase | undefined;

function getDatabase(): NodePgDatabase {
  if (database) {
    return database;
  }

  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error('Database is not configured.');
  }

  const pool = new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 5_000,
    connectionTimeoutMillis: 5_000,
  });
  attachDatabasePool(pool);
  database = drizzle(pool);
  return database;
}

export function createContactSubmissionRepository({
  getDb = getDatabase,
}: {
  getDb?: () => NodePgDatabase;
} = {}): ContactSubmissionRepository {
  return {
    async create(submission) {
      const [created] = await getDb()
        .insert(contactSubmissions)
        .values({
          name: submission.name,
          email: submission.email,
          topic: submission.topic,
          message: submission.message,
          sourceUrl: submission.sourceUrl,
          referringPage: submission.referringPage,
        })
        .returning({ id: contactSubmissions.id });

      if (!created) {
        throw new Error('Submission was not persisted.');
      }

      return created;
    },

    async markNotificationSent(id) {
      await getDb()
        .update(contactSubmissions)
        .set({
          notificationStatus: 'sent',
          notificationAttemptedAt: new Date(),
          notificationSentAt: new Date(),
        })
        .where(eq(contactSubmissions.id, id));
    },

    async markNotificationFailed(id) {
      await getDb()
        .update(contactSubmissions)
        .set({
          notificationStatus: 'failed',
          notificationAttemptedAt: new Date(),
        })
        .where(eq(contactSubmissions.id, id));
    },
  };
}
