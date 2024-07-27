import { date, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./users";
import { ItemTable } from "./items";

export const CommentTable = pgTable("comments", {
  commentId: uuid("comment_id").defaultRandom().primaryKey().unique(),
  userId: uuid("user_id")
    .references(() => UserTable.userId, {
      onDelete: "cascade",
    })
    .notNull(),
  content: text("content").notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
  itemId: varchar("item_id", { length: 50 }).references(() => ItemTable.itemId),
});
export type CommentTableInsert = typeof CommentTable.$inferInsert;
export type CommentTableSelect = typeof CommentTable.$inferSelect;
