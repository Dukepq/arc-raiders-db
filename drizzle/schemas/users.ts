import {
  boolean,
  jsonb,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { ProviderEnum, RoleEnum } from "./enums";
import { TokenData } from "@/app/types/auth";

export const UserTable = pgTable("users", {
  userId: uuid("user_id").defaultRandom().primaryKey().unique(),
  email: varchar("email").unique().notNull(),
  username: varchar("username").notNull().unique(),
  role: RoleEnum("role").default("RAIDER").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  banned: boolean("banned").default(false).notNull(),
});
export type UserTableInsert = typeof UserTable.$inferInsert;
export type UserTableSelect = typeof UserTable.$inferSelect;

export const UserKeyTable = pgTable(
  "user_keys",
  {
    provider: ProviderEnum("provider").notNull(),
    providerUserId: varchar("provider_user_id"),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    userId: uuid("user_id")
      .references(() => UserTable.userId, { onDelete: "cascade" })
      .notNull(),
    OAuthTokens: jsonb("oauth_tokens").$type<TokenData>(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.provider, t.providerUserId] }),
  })
);

export type UserKeyTableInsert = typeof UserKeyTable.$inferInsert;
export type UserKeyTableSelect = typeof UserKeyTable.$inferSelect;
