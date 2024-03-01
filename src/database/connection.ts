import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './models';

const connectionString = process.env['DB_CONNECTION'] as string;
if (!connectionString) {
  throw new Error('No DB connection string');
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
