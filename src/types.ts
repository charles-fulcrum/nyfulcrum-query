import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { terms } from "./database/models";

export type TermType = InferSelectModel<typeof terms>;
