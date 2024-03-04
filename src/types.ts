import { InferSelectModel } from 'drizzle-orm';
import { associations, terms } from './database/models';

export type TermType = InferSelectModel<typeof terms>;
export type AssocType = InferSelectModel<typeof associations>;

export type TermAssociationsType = {
  term: TermType;
  associatedTerms: TermType[];
};
