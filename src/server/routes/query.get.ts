import { defineEventHandler, getQuery } from 'h3';
import { query } from '../actions/query';

export default defineEventHandler(async event => {
  const queryParams = getQuery<{ query: string }>(event);
  const input = queryParams.query;
  return await query(input);
});
