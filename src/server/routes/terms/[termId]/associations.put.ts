import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { TermType } from 'src/types';
import { updateAssoc } from '../../../actions/associations';

export default defineEventHandler(async event => {
  const termId = getRouterParam(event, 'termId');
  if (!termId) {
    return;
  }

  const body = await readBody<TermType['id'][]>(event);
  const result = await updateAssoc(termId, body);
  return result;
});
