ALTER TABLE "terms" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "terms" DROP COLUMN IF EXISTS "email";