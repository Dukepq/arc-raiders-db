import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CategoryTable = pgTable("categories", {
  categoryId: serial("category_id").primaryKey(),
  category: varchar("category", { length: 50 }).unique(),
});

export type CategoryTableInsert = typeof CategoryTable.$inferInsert;
export type CategoryTableSelect = typeof CategoryTable.$inferSelect;
