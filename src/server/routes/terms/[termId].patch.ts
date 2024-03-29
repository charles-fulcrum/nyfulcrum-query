import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { updateTerm } from '../../actions/terms';

export default defineEventHandler(async event => {
  const termId = getRouterParam(event, 'termId');
  if (!termId) {
    return;
  }

  const body = await readBody<{ name: string; score: number; categories: string[] }>(event);
  const termName = body.name;
  const termScore = body.score;
  const result = await updateTerm(termId, { name: termName, score: termScore }, body.categories);
  return result;
});
