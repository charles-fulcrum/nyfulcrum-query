import { defineEventHandler, readBody } from 'h3';
import { createTerm } from '../actions/terms';

export default defineEventHandler(async event => {
  const body = await readBody<{ name: string; score: number }>(event);
  const name = body.name;
  const score = body.score;
  const result = await createTerm({ name, score });
  return result;
});
