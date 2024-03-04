import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { AssocType, TermAssociationsType, TermType } from 'src/types';
import { db } from '../../database/connection';
import { associations, terms } from '../../database/models';

export async function getAssoc() {
  const term1 = alias(terms, 'term1');
  const term2 = alias(terms, 'term2');

  const result = await db
    .select({
      id: associations.id,
      term1: term1,
      term2: term2,
    })
    .from(associations)
    .leftJoin(term1, eq(associations.termId1, term1.id))
    .leftJoin(term2, eq(associations.termId2, term2.id));

  const termAssociations: TermAssociationsType[] = [];
  const associatedTermIds: TermType['id'][] = [];
  for (const assoc1 of result) {
    const assoc1Term1 = assoc1.term1;
    if (!assoc1Term1) {
      continue;
    }

    const term1Id = assoc1Term1.id;

    const termAssoc: TermAssociationsType = {
      term: assoc1Term1,
      associatedTerms: [],
    };

    for (const assoc2 of result) {
      const assoc2Term1 = assoc2.term1;
      const assoc2Term2 = assoc2.term2;

      if (!assoc2Term2 || term1Id !== assoc2Term1?.id) {
        continue;
      }

      termAssoc.associatedTerms.push(assoc2Term2);
    }

    if (associatedTermIds.includes(term1Id)) {
      continue;
    }

    termAssociations.push(termAssoc);
    associatedTermIds.push(term1Id);
  }

  return termAssociations;
}

export async function createAssoc(assoc: Omit<AssocType, 'id'>) {
  const result = await db.insert(associations).values(assoc).returning();
  return result;
}

export async function updateAssoc(
  termId: TermType['id'],
  updatedAssociatedTerms: TermType['id'][]
) {
  /* Delete existing associations for the term */
  await db.delete(associations).where(eq(associations.termId1, termId));

  /* Create the new associations for the term */
  const updatedAssociations: Omit<AssocType, 'id'>[] = updatedAssociatedTerms.map(
    associatedTermId => ({
      id: undefined,
      termId1: termId,
      termId2: associatedTermId,
    })
  );
  const result = await db.insert(associations).values(updatedAssociations).returning();
  return result;
}

export async function deleteAssoc(assocId: string) {
  const result = await db.delete(associations).where(eq(associations.id, assocId)).returning();
  return result;
}
