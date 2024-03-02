import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const terms = pgTable('terms', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', {  length: 255 }).notNull(),
});