import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { terms, associations } from "./database/models";

export type TermType = InferSelectModel<typeof terms>;
export type AssocType = InferSelectModel<typeof associations>;
