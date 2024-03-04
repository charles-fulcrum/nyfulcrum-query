import { InferSelectModel } from 'drizzle-orm';
import { associations, categories, terms } from './database/models';

export type TermType = InferSelectModel<typeof terms>;
export type AssocType = InferSelectModel<typeof associations>;
export type CategoryType = InferSelectModel<typeof categories>;

export type TermWithCategories = TermType & {
  categories: CategoryType[];
};

export type TermAssociationsType = {
  term: TermType;
  associatedTerms: TermType[];
};
