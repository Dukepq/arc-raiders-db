import "server-only";

import {
  CategoryTable,
  ItemTable,
  ItemVariantsTable,
  LootTypeTable,
  WeaponTable,
} from "@/drizzle";
import { MAX_ITEMS_PER_PAGE } from "../../config/constants";
import { db } from "@/drizzle/db";
import { desc, eq, sql, and, count, asc, ilike } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { aggregateVariantsSQL } from "../SQLSnippets";
import { Item, Material, Weapon } from "@/app/types/itemTypes";
import {
  orderByConditionBuilder,
  whereConditionBuilder,
} from "@/app/lib/queryHelpers";
import { QueryParameters } from "@/app/types/queries";

/*TODO: figure out a better way to create a reusable "where" condition constructor*/

const referencedItems = alias(ItemTable, "referenced_items");

const baseFields = {
  itemId: ItemTable.itemId,
  type: ItemTable.type,
  name: ItemTable.name,
  rarity: ItemTable.rarity,
  icon: ItemTable.icon,
  itemType: ItemTable.itemType,
  weight: ItemTable.weight,
  stackSize: ItemTable.stackSize,
  equipableSlots: ItemTable.equipableSlots,
  description: ItemTable.description,
  baseValue: ItemTable.baseValue,
};

const itemFields = {
  ...baseFields,
  category: CategoryTable.category,
  lootType: LootTypeTable.lootType,
};

const getItems = async (query?: QueryParameters): Promise<Item[]> => {
  const page = Number(query?.page);
  const from = Math.max(page - 1, 0) * MAX_ITEMS_PER_PAGE;

  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  const sortConditions = orderByConditionBuilder(ItemTable, query?.sort);

  const items = await db
    .select({
      ...itemFields,
      variants: aggregateVariantsSQL(referencedItems),
    })
    .from(ItemTable)
    .where(and(...whereConditions))
    .leftJoin(CategoryTable, eq(ItemTable.categoryId, CategoryTable.categoryId))
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .leftJoin(
      ItemVariantsTable,
      eq(ItemVariantsTable.variantId, ItemTable.itemId)
    )
    .leftJoin(
      referencedItems,
      eq(referencedItems.itemId, ItemVariantsTable.itemId)
    )
    .orderBy(...sortConditions, asc(ItemTable.name))
    .groupBy(ItemTable.itemId, CategoryTable.category, LootTypeTable.lootType)
    .offset(from)
    .limit(MAX_ITEMS_PER_PAGE);

  return items ?? [];
};

const getItemsCount = async (query?: QueryParameters): Promise<number> => {
  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );

  const [data] = await db
    .select({ count: count() })
    .from(ItemTable)
    .leftJoin(LootTypeTable, eq(LootTypeTable.lootTypeId, ItemTable.lootTypeId))
    .where(and(...whereConditions));
  const size = data.count ?? 0;
  return size;
};

const getItem = async (id: string): Promise<Item> => {
  const [item] = await db
    .select({
      ...itemFields,
      variants: aggregateVariantsSQL(referencedItems),
    })
    .from(ItemTable)
    .where(eq(ItemTable.itemId, id))
    .leftJoin(CategoryTable, eq(ItemTable.categoryId, CategoryTable.categoryId))
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .leftJoin(
      ItemVariantsTable,
      eq(ItemVariantsTable.variantId, ItemTable.itemId)
    )
    .leftJoin(
      referencedItems,
      eq(referencedItems.itemId, ItemVariantsTable.itemId)
    )
    .groupBy(ItemTable.itemId, CategoryTable.category, LootTypeTable.lootType);
  return item;
};

async function getTrendingItems() {
  const items = await db.select(baseFields).from(ItemTable).offset(0).limit(12);
  return items ?? [];
}

const equipmentFields = {
  ...itemFields,
};

const getEquipment = async (query?: QueryParameters): Promise<Item[]> => {
  const page = Number(query?.page || 0);
  const from = Math.max(page - 1, 0) * MAX_ITEMS_PER_PAGE;

  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  whereConditions.push(eq(ItemTable.itemType, "equipment"));
  const sortConditions = orderByConditionBuilder(ItemTable, query?.sort);

  const equipment = await db
    .select({
      ...equipmentFields,
      variants: aggregateVariantsSQL(referencedItems),
    })
    .from(ItemTable)
    .where(and(...whereConditions))
    .leftJoin(CategoryTable, eq(CategoryTable.categoryId, ItemTable.categoryId))
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .leftJoin(
      ItemVariantsTable,
      eq(ItemVariantsTable.variantId, ItemTable.itemId)
    )
    .leftJoin(
      referencedItems,
      eq(referencedItems.itemId, ItemVariantsTable.itemId)
    )
    .groupBy(ItemTable.itemId, CategoryTable.category, LootTypeTable.lootType)
    .orderBy(...sortConditions, asc(ItemTable.name), desc(ItemTable.rarity))
    .offset(from)
    .limit(MAX_ITEMS_PER_PAGE);
  return equipment ?? [];
};

const getEquipmentCount = async (query?: QueryParameters): Promise<number> => {
  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  whereConditions.push(eq(ItemTable.itemType, "equipment"));

  const [data] = await db
    .select({ count: count() })
    .from(ItemTable)
    .leftJoin(LootTypeTable, eq(LootTypeTable.lootTypeId, ItemTable.lootTypeId))
    .where(and(...whereConditions));
  const size = Number(data.count);

  if (!isNaN(size)) {
    return size;
  }
  return 0;
};

const weaponFields = {
  fireRate: WeaponTable.fireRate,
  attachmentSlots: WeaponTable.attachmentSlots,
  ammoType: WeaponTable.ammoType,
  range: WeaponTable.range,
  damage: WeaponTable.damage,
  ...equipmentFields,
};

const getEquipmentWeapons = async (
  query?: QueryParameters
): Promise<Weapon[]> => {
  const page = Number(query?.page || 0);
  const from = Math.max(page - 1, 0) * MAX_ITEMS_PER_PAGE;

  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  whereConditions.push(eq(ItemTable.itemType, "equipment"));
  const sortConditions = orderByConditionBuilder(ItemTable, query?.sort);

  const weapons = await db
    .select({
      ...weaponFields,
      variants: aggregateVariantsSQL(referencedItems),
    })
    .from(WeaponTable)
    .where(and(...whereConditions))
    .innerJoin(ItemTable, eq(WeaponTable.weaponId, ItemTable.itemId))
    .leftJoin(
      ItemVariantsTable,
      eq(ItemVariantsTable.variantId, ItemTable.itemId)
    )
    .leftJoin(
      referencedItems,
      eq(referencedItems.itemId, ItemVariantsTable.itemId)
    )
    .leftJoin(CategoryTable, eq(ItemTable.categoryId, CategoryTable.categoryId))
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .groupBy(
      ItemTable.itemId,
      CategoryTable.category,
      WeaponTable.weaponId,
      LootTypeTable.lootType
    )
    .orderBy(...sortConditions, asc(ItemTable.name), desc(ItemTable.rarity))
    .offset(from)
    .limit(MAX_ITEMS_PER_PAGE);
  return weapons ?? [];
};

const getEquipmentWeaponsCount = async (
  query?: QueryParameters
): Promise<number> => {
  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  whereConditions.push(eq(ItemTable.itemType, "equipment"));

  const [data] = await db
    .select({ count: count() })
    .from(WeaponTable)
    .innerJoin(ItemTable, eq(WeaponTable.weaponId, ItemTable.itemId))
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .where(and(...whereConditions));

  const size = Number(data.count);
  if (!isNaN(size)) {
    return size;
  }
  return 0;
};

const OtherFields = {
  ...equipmentFields,
};

const getEquipmentOther = async (query?: QueryParameters): Promise<Item[]> => {
  const page = Number(query?.page || 0);
  const from = Math.max(page - 1, 0) * MAX_ITEMS_PER_PAGE;

  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  whereConditions.push(eq(ItemTable.itemType, "equipment"));
  const sortConditions = orderByConditionBuilder(ItemTable, query?.sort);

  const other = await db
    .select({
      ...OtherFields,
      variants: aggregateVariantsSQL(referencedItems),
    })
    .from(ItemTable)
    .leftJoin(WeaponTable, eq(ItemTable.itemId, WeaponTable.weaponId))
    .leftJoin(
      ItemVariantsTable,
      eq(ItemVariantsTable.variantId, ItemTable.itemId)
    )
    .leftJoin(
      referencedItems,
      eq(referencedItems.itemId, ItemVariantsTable.itemId)
    )
    .leftJoin(CategoryTable, eq(CategoryTable.categoryId, ItemTable.categoryId))
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .groupBy(
      ItemTable.itemId,
      CategoryTable.category,
      WeaponTable.weaponId,
      LootTypeTable.lootType
    )
    .orderBy(...sortConditions, asc(ItemTable.name), desc(ItemTable.rarity))
    .where(
      and(
        sql`${WeaponTable} IS NULL`,
        eq(ItemTable.itemType, "equipment"),
        ...whereConditions
      )
    )
    .offset(from)
    .limit(MAX_ITEMS_PER_PAGE);

  return other ?? [];
};

const getEquipmentOtherCount = async (query?: {
  rarity?: number;
}): Promise<number> => {
  let whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  whereConditions = whereConditions.concat([
    sql`${WeaponTable} IS NULL`,
    eq(ItemTable.itemType, "equipment"),
  ]);

  const [data] = await db
    .select({ count: count() })
    .from(ItemTable)
    .leftJoin(WeaponTable, eq(ItemTable.itemId, WeaponTable.weaponId))
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .where(and(...whereConditions));

  const size = Number(data.count);
  if (!isNaN(size)) {
    return size;
  }
  return 0;
};

const materialFields = {
  ...baseFields,
  category: CategoryTable.category,
  subCategory: LootTypeTable.lootType,
};

const getMaterials = async (query?: QueryParameters): Promise<Material[]> => {
  const page = Number(query?.page || 0);
  const from = Math.max(page - 1, 0) * MAX_ITEMS_PER_PAGE;
  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  whereConditions.push(eq(ItemTable.itemType, "material"));
  const sortConditions = orderByConditionBuilder(ItemTable, query?.sort);

  const materials = await db
    .select(materialFields)
    .from(ItemTable)
    .leftJoin(CategoryTable, eq(ItemTable.categoryId, CategoryTable.categoryId))
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .where(and(...whereConditions))
    .orderBy(...sortConditions, asc(ItemTable.name), desc(ItemTable.rarity))
    .offset(from)
    .limit(MAX_ITEMS_PER_PAGE);
  return materials ?? [];
};

const getMaterialsCount = async (query?: QueryParameters) => {
  const whereConditions = whereConditionBuilder(
    { ItemTable, LootTypeTable },
    query ?? {}
  );
  whereConditions.push(eq(ItemTable.itemType, "material"));

  const [data] = await db
    .select({ count: count() })
    .from(ItemTable)
    .leftJoin(LootTypeTable, eq(ItemTable.lootTypeId, LootTypeTable.lootTypeId))
    .where(and(...whereConditions));

  const size = Number(data.count);
  if (!isNaN(size)) {
    return size;
  }
  return 0;
};

export const itemsDL = {
  query: {
    getItem: getItem,
    getTrendingItems: getTrendingItems,
    getItems: getItems,
    getItemsCount: getItemsCount,
    getMaterials: getMaterials,
    getMaterialsCount: getMaterialsCount,
    getEquipment: getEquipment,
    getEquipmentCount: getEquipmentCount,
    getEquipmentWeapons: getEquipmentWeapons,
    getEquipmentWeaponsCount: getEquipmentWeaponsCount,
    getEquipmentOther: getEquipmentOther,
    getEquipmentOtherCount: getEquipmentOtherCount,
  },
  mutation: {},
};
