import { query } from '../../../server/actions/query';
export const load = async () => {
  await new Promise((resolve: any) => {
    setTimeout(() => resolve(), 1000);
  });

  const data = await query();
  return {
    message: data,
  };
};
