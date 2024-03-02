import { pgTable, uuid } from "drizzle-orm/pg-core";

export const associations = pgTable('associations', {
    id:uuid('id').notNull().defaultRandom().primaryKey(),
    termId1:uuid('termId1').notNull(),
    termId2:uuid('termId2').notNull()
});