import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { updateAssoc } from '../../actions/associations';

export default defineEventHandler(async event => {
  const termId = getRouterParam(event, 'termId');
  if (!termId) {
    return;
  }

  const body = await readBody<{ termId1: string; termId2: string; updatedScore: number }>(event);

  const assocScore = body.updatedScore;

  const result = await updateAssoc(termId, {
    termId1: body.termId1,
    termId2: body.termId2,
    assocScore: assocScore,
  });
  return result;
});
