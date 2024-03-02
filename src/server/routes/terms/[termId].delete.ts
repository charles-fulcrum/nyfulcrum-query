import { defineEventHandler, getRouterParam } from 'h3';
import { deleteTerm } from '../../actions/terms';

export default defineEventHandler(async (event) => {
  const termId = getRouterParam(event, 'termId');
  if (!termId) {
    return;
  }

  const result = await deleteTerm(termId);
  return result;
});
