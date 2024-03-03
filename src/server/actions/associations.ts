import { eq } from 'drizzle-orm';
import {  AssocType } from 'src/types';
import { db } from '../../database/connection';
import { associations } from '../../database/models';

export async function getTerms() {
  const result = await db.select().from(associations);
  return result.reverse();
}

export async function createAssoc(assoc: Omit<AssocType, 'id'>) {
  const result = await db.insert(associations).values(assoc).returning();
  return result;
}

export async function updateAssoc(assocId: string, assocTerm: Omit<AssocType, 'id'>) {
  const result = await db.update(associations).set(assocTerm).where(eq(associations.id, assocId)).returning();
  return result;
}

export async function deleteAssoc(assocId: string) {
  const result = await db.delete(associations).where(eq(associations.id, assocId)).returning();
  return result;
}

