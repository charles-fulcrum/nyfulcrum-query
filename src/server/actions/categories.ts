import { db } from '../../database/connection';
import { categories } from '../../database/models';

export async function getCategories() {
  const result = await db.select().from(categories);
  return result;
}
