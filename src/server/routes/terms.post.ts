import { defineEventHandler, readBody } from 'h3';
import { createTerm } from '../actions/terms';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string }>(event);
  const termName = body.name;
  const result = await createTerm({ name: termName });
  return result;
});
