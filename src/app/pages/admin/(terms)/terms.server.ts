import { getCategories } from '../../../../server/actions/categories';
import { getTerms } from '../../../../server/actions/terms';

export const load = async () => {
  const terms = await getTerms();
  const categories = await getCategories();
  return {
    terms,
    categories,
  };
};
