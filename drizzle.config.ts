import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/database/models.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env['DB_CONNECTION'] as string,
  },
} satisfies Config;
