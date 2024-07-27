import { pgEnum } from "drizzle-orm/pg-core";

export const SlotEnum = pgEnum("slot_enum", [
  "primaryWeapon",
  "secondaryWeapon",
  "quickslot",
  "armor",
  "gadget",
  "backpack",
]);

export const TypeEnum = pgEnum("type_enum", ["item", "mission", "enemy"]);

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
