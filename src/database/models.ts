import { pgTable, real, uuid, varchar } from 'drizzle-orm/pg-core';

export const terms = pgTable('terms', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  score: real('score').notNull().default(0),
});

export const associations = pgTable('associations', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  termId1: uuid('termId1').notNull(),
  termId2: uuid('termId2').notNull(),
  // assocScore: real('assocScore').notNull().default(0.5),
});

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const termsCategories = pgTable('termsCategories', {
  termId: uuid('termId').notNull(),
  categoryId: uuid('categoryId').notNull(),
});
