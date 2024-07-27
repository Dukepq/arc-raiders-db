import {
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import {
  AmmoTypeEnum,
  AttachmentSlotEnum,
  ItemTypeEnum,
  SlotEnum,
  TypeEnum,
} from "./enums";
import { CategoryTable } from "./categories";
import { LootTypeTable } from "./lootTypes";

export const ItemTable = pgTable("items", {
  itemId: varchar("item_id", { length: 255 }).unique().primaryKey(),
  type: TypeEnum("type").notNull(),
  itemType: ItemTypeEnum("item_type").notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  icon: varchar("icon", { length: 255 }).notNull(),
  rarity: integer("rarity").notNull(),
  weight: numeric("weight", { precision: 6, scale: 2 }),
  stackSize: integer("stack_size").default(1).notNull(),
  equipableSlots: SlotEnum("equipable_slots").array(),
  description: text("description").default("This item has no description."),
  baseValue: integer("base_value"),
  categoryId: integer("category_id").references(
    () => CategoryTable.categoryId,
    {
      onDelete: "set null",
    }
  ),
  lootTypeId: integer("loot_type_id").references(
    () => LootTypeTable.lootTypeId,
    {
      onDelete: "set null",
    }
  ),
});
export type ItemTableInsert = typeof ItemTable.$inferInsert;
export type ItemTableSelect = typeof ItemTable.$inferSelect;

export const WeaponTable = pgTable("weapons", {
  weaponId: varchar("weapon_id", { length: 255 })
    .primaryKey()
    .references(() => ItemTable.itemId, { onDelete: "cascade" }),
  attachmentSlots: AttachmentSlotEnum("attachment_slots").array(),
  damage: numeric("damage", { precision: 6, scale: 2 }),
  fireRate: integer("fire_rate"),
  range: integer("range"),
  ammoType: AmmoTypeEnum("ammo_type").notNull(),
});
export type WeaponTableInsert = typeof WeaponTable.$inferInsert;
export type WeaponTableSelect = typeof WeaponTable.$inferSelect;

export const AttachmentTable = pgTable("attachments", {
  attachmentId: varchar("attachment_id", { length: 255 })
    .primaryKey()
    .references(() => ItemTable.itemId, { onDelete: "cascade" }),
  attachmentSlot: AttachmentSlotEnum("attachment_slot"),
  modifiers: jsonb("modifiers"),
});
export type AttachmentTableInsert = typeof AttachmentTable.$inferInsert;
export type AttachmentTableSelect = typeof AttachmentTable.$inferSelect;

export const ConsumableTable = pgTable("consumables", {
  consumableId: varchar("consumable_id", { length: 255 })
    .primaryKey()
    .references(() => ItemTable.itemId, { onDelete: "cascade" }),
  consumeTimeMs: integer("consume_time_ms"),
  onConsumeEffect: jsonb("on_consume_effect"),
});
export type ConsumableTableInsert = typeof ConsumableTable.$inferInsert;
export type ConsumableTableSelect = typeof ConsumableTable.$inferSelect;

export const MaterialTable = pgTable("materials", {
  materialId: varchar("material_id", { length: 255 })
    .primaryKey()
    .references(() => ItemTable.itemId, { onDelete: "cascade" }),
  // usedInCrafting: /////////
});
export type MaterialTableInsert = typeof MaterialTable.$inferInsert;
export type MaterialTableSelect = typeof MaterialTable.$inferSelect;

export const ArmorTable = pgTable("armors", {
  armorId: varchar("armor_id", { length: 255 })
    .primaryKey()
    .references(() => ItemTable.itemId, { onDelete: "cascade" }),
  armorEffects: jsonb("armor_effects"),
});

export type ArmorTableInsert = typeof ArmorTable.$inferInsert;
export type ArmorTableSelect = typeof ArmorTable.$inferSelect;

// ITEM VARIANTS JUNCTION TABLE

export const ItemVariantsTable = pgTable(
  "variants",
  {
    itemId: varchar("item_id")
      .notNull()
      .references(() => ItemTable.itemId, {
        onDelete: "cascade",
      }),
    variantId: varchar("variant_id")
      .notNull()
      .references(() => ItemTable.itemId, {
        onDelete: "cascade",
      }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.itemId, t.variantId] }),
  })
);

export type ItemVariantsTableInsert = typeof ItemVariantsTable.$inferInsert;
