import { SQLWrapper, asc, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { QueryParameters } from "../types/queries";
import { getSortSearchParamConstituents } from "./queryParamHelpers";
import {
  ItemTable as _ItemTable,
  LootTypeTable as _LootTypeTable,
} from "@/drizzle";

export const whereConditionBuilder = (
  tables: {
    ItemTable: typeof _ItemTable;
    LootTypeTable?: typeof _LootTypeTable;
  },
  query: QueryParameters
): SQLWrapper[] => {
  const { ItemTable, LootTypeTable } = tables;
  const conditions: SQLWrapper[] = [];
  if (query?.search) {
    conditions.push(ilike(ItemTable.name, `%${query.search}%`));
  }

  if (query?.rarity) {
    conditions.push(eq(ItemTable.rarity, query.rarity));
  }

  if (LootTypeTable && query?.type) {
    conditions.push(eq(LootTypeTable.lootType, query.type));
  }

  return conditions;
};

export const orderByConditionBuilder = (
  t: PgTableWithColumns<any>,
  sort: QueryParameters["sort"] | undefined,
  allowedKeys?: string[]
) => {
  const constituents = getSortSearchParamConstituents(sort ?? "");
  if (!constituents) return [];
  const [sortName, sortDirection] = constituents;

  const columnNames = Object.keys(getTableColumns(t));
  if (
    !columnNames.includes(sortName) ||
    (allowedKeys && !allowedKeys.includes(sortName))
  ) {
    return [];
  }

  if (sortDirection === "asc") return [asc(t[sortName])];
  else if (sortDirection === "desc") return [desc(t[sortName])];
  return [];
};
