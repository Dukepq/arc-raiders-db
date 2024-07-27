import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const LootTypeTable = pgTable("loot_types", {
  lootTypeId: serial("loot_type_id").primaryKey(),
  lootType: varchar("loot_type", { length: 50 }).unique(),
  lootTypeAdjective: varchar("loot_type_adjective", { length: 50 }).unique(),
});
export type SubCategoryInsert = typeof LootTypeTable.$inferInsert;
export type SubCategorySelect = typeof LootTypeTable.$inferSelect;
