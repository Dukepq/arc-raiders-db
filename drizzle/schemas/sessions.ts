import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./users";
import { TokenData } from "@/app/types/auth";

export const SessionTable = pgTable("sessions", {
  sessionId: varchar("session_id").unique().primaryKey(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  userId: uuid("user_id")
    .references(() => UserTable.userId, { onDelete: "cascade" })
    .notNull(),
});

export type SessionTableInsert = typeof SessionTable.$inferInsert;
export type SessionTableSelect = typeof SessionTable.$inferSelect;
