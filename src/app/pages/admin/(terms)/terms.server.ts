import { getTerms } from '../../../../server/actions/terms';

export const load = async () => {
  const data = await getTerms();
  return data;
};
