import { eq } from 'drizzle-orm';
import { TermType } from 'src/types';
import { db } from '../../database/connection';
import { terms } from '../../database/models';

export async function getTerms() {
  const result = await db.select().from(terms);
  return result.reverse();
}

export async function createTerm(term: Omit<TermType, 'id'>) {
  const result = await db.insert(terms).values(term).returning();
  return result;
}

export async function updateTerm(termId: string, term: Omit<TermType, 'id'>) {
  const result = await db.update(terms).set(term).where(eq(terms.id, termId)).returning();
  return result;
}

export async function deleteTerm(termId: string) {
  const result = await db.delete(terms).where(eq(terms.id, termId)).returning();
  return result;
}
