import { defineEventHandler, getRouterParam } from 'h3';
import { deleteAssoc } from '../../actions/associations';

export default defineEventHandler(async (event) => {
  const assocId = getRouterParam(event, 'assocId');
  if (!assocId) {
    return;
  }

  const result = await deleteAssoc(assocId);
  return result;
});
