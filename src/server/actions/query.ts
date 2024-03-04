import { ilike } from 'drizzle-orm';
import { TermType } from 'src/types';
import { db } from '../../database/connection';
import { terms } from '../../database/models';

export async function query(input: string) {
  const words = input.split(' ');
  const results: { [key: string]: TermType[] } = {};
  for (const word of words) {
    if (word.length < 3) {
      continue;
    }

    const termMatches = await db
      .select()
      .from(terms)
      .where(ilike(terms.name, `%${word}%`));

    results[word] = termMatches;
  }

  return results;
}
