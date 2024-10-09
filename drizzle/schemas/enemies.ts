import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { ItemTable } from "./items";

// TODO: implement

export const EnemiesTable = pgTable("enemies", {
  enemyId: varchar("enemy_id", { length: 255 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull().default(""),
});
export type EnemiesTableInsert = typeof EnemiesTable.$inferInsert;
export type EnemiesTableSelect = typeof EnemiesTable.$inferSelect;

export const DropsTable = pgTable("drops", {
  enemyId: varchar("enemy_id", { length: 255 }).references(
    () => EnemiesTable.enemyId
  ),
  itemId: varchar("item_id", { length: 255 }).references(
    () => ItemTable.itemId
  ),
});
export type DropsTableInsert = typeof DropsTable.$inferInsert;
export type DropsTableSelect = typeof DropsTable.$inferSelect;
