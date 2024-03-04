import { pgTable, uuid, real } from 'drizzle-orm/pg-core';

export const associations = pgTable('associations', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  termId1: uuid('termId1').notNull(),
  termId2: uuid('termId2').notNull(),
  assocScore: real('assocScore').notNull().default(0.5),
});
