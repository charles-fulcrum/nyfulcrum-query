import { getAssoc } from '../../../../server/actions/associations';
import { getTerms } from '../../../../server/actions/terms';

export const load = async () => {
  const associations = await getAssoc();
  const terms = await getTerms();
  return {
    associations,
    terms,
  };
};
