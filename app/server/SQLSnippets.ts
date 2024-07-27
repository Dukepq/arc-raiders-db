import "server-only";

import { sql } from "drizzle-orm";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";

export const aggregateVariantsSQL = <T extends TableConfig>(
  ItemAlias: PgTableWithColumns<T>
) => {
  return sql<
    ({
      itemId: string;
      rarity: number;
      name: string;
      icon: string;
    } | null)[]
  >`
  jsonb_agg(
    CASE WHEN ${ItemAlias.itemId} IS NOT NULL THEN
  jsonb_build_object(
    'itemId', ${ItemAlias.itemId},
    'rarity', ${ItemAlias.rarity},
    'name', ${ItemAlias.name},
    'icon', ${ItemAlias.icon}
  )
  ELSE
    NULL
  END
)
  AS variants`;
};
