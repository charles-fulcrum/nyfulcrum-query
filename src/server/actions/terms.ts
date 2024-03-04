import { eq } from 'drizzle-orm';
import { CategoryType, TermType, TermWithCategories } from 'src/types';
import { db } from '../../database/connection';
import { categories, terms, termsCategories } from '../../database/models';

export async function getTerms() {
  const result = await db
    .select({
      id: terms.id,
      name: terms.name,
      score: terms.score,
      category: categories,
    })
    .from(terms)
    .leftJoin(termsCategories, eq(terms.id, termsCategories.termId))
    .leftJoin(categories, eq(termsCategories.categoryId, categories.id));

  /* only used to avoid adding duplicate categories */
  const addedTermIds: TermType['id'][] = [];
  const termsWithCategories: TermWithCategories[] = [];
  for (const i of result) {
    if (addedTermIds.includes(i.id)) {
      continue;
    }

    const categories = [];

    /* only used to avoid adding duplicate categories */
    const categoryIds = [];
    for (const j of result) {
      const categoryId = j.category?.id;
      if (i.id === j.id && j.category && categoryId) {
        categoryIds.push(categoryId);
        categories.push(j.category);
      }
    }

    addedTermIds.push(i.id);
    termsWithCategories.push({
      id: i.id,
      name: i.name,
      score: i.score,
      categories,
    });
  }

  return termsWithCategories.reverse();
}

export async function createTerm(term: Omit<TermType, 'id'> & { categories?: CategoryType[] }) {
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
