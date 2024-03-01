import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// TODO: This is just a sample model. We need to create the actual models.
export const users = pgTable('users', {
  id: uuid('id').notNull().defaultRandom(),
  email: varchar('email', { length: 255 }),
  passwordHash: varchar('password_hash'),
  username: varchar('username', { length: 255 }),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  createdAt: timestamp('created_at').notNull().default(new Date()),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
