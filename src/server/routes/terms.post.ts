import { defineEventHandler, readBody } from 'h3';
import { createTerm } from '../actions/terms';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string, termScore: number }>(event);
  const termName = body.name;
  const termScore = body.termScore;
  const result = await createTerm({ name: termName, score: termScore});
  return result;
});
