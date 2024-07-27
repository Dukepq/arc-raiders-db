import {
  AttachmentTableSelect,
  CategoryTableSelect,
  ConsumableTableSelect,
  MaterialTableSelect,
  WeaponTableSelect,
} from "@/drizzle";
import { ItemTableSelect } from "@/drizzle";

export type Variant = {
  itemId: string;
  rarity: number;
  name: string;
  icon: string;
} | null;

export type Item = Omit<
  ItemTableSelect &
    CategoryTableSelect &
    ItemTableSelect & { variants: Variant[] },
  "categoryId" | "lootTypeId"
>;
export type Weapon = Item & Omit<WeaponTableSelect, "weaponId">;
export type Attachment = Item & Omit<AttachmentTableSelect, "attachmentId">;
export type Consumable = Item & Omit<ConsumableTableSelect, "consumableId">;
export type Material = Omit<
  Item & Omit<MaterialTableSelect, "materialId">,
  "variants"
>;
