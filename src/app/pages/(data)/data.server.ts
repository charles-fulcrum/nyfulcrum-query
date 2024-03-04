import { getTerms } from '../../../server/actions/terms';

export const load = async () => {
  const terms = await getTerms();
  return {
    terms,
  };
};
