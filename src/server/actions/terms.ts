import { desc } from 'drizzle-orm';
import { db } from '../../database/connection';
import { terms } from '../../database/models';

export async function getTerms() {
  const result = await db.select().from(terms);
  return result.reverse();
}

export async function createTerm(termName: string) {
  const result = await db.insert(terms).values({ name: termName }).returning();
  return result;
}
