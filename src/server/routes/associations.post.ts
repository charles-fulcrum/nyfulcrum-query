import { defineEventHandler, readBody } from 'h3';
import { createAssoc } from '../actions/associations';

export default defineEventHandler(async event => {
  const body = await readBody<{ term1Id: string; term2Id: string; score: number }>(event);
  const result = await createAssoc({
    termId1: body.term1Id,
    termId2: body.term2Id,
    // assocScore: body.score,
  });
  return result;
});
