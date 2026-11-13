import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const globalForDatabase = globalThis as typeof globalThis & {
  fastDetailingSql?: ReturnType<typeof postgres>;
  fastDetailingDb?: ReturnType<typeof drizzle<typeof schema>>;
};

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is required to access the PostgreSQL database.');
  }

  const sql = globalForDatabase.fastDetailingSql ?? postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });

  globalForDatabase.fastDetailingSql = sql;
  globalForDatabase.fastDetailingDb ??= drizzle(sql, { schema });

  return globalForDatabase.fastDetailingDb;
}