import { pgEnum } from "drizzle-orm/pg-core";

export const CategoryEnum = pgEnum("category_enum", [
  "technology",
  "civilian",
  "weapon",
]);

export const SlotEnum = pgEnum("slot_enum", [
  "primary",
  "secondary",
  "quickslot",
  "armor",
  "gadget",
  "backpack",
]);

export const ItemTypeEnum = pgEnum("item_type_enum", [
  "equipment",
  "material",
  "utility",
  "other",
]);

export const ItemDiscriminantEnum = pgEnum("item_discriminant_enum", [
  "weapon",
  "attachment",
  "consumable",
]);

export const AttachmentSlotEnum = pgEnum("attachment_slot", [
  "magazine",
  "barrel",
  "muzzle",
]);

export const AmmoTypeEnum = pgEnum("ammo_type_enum", [
  "medium",
  "heavy",
  "light",
]);

export const ProviderEnum = pgEnum("provider_enum", [
  "twitch",
  "discord",
  "email",
]);
export type ProviderEnumType = (typeof ProviderEnum)["enumValues"][number];

export const RoleEnum = pgEnum("role_enum", ["ADMIN", "RAIDER"]);
export type RoleEnumType = (typeof RoleEnum)["enumValues"][number];
