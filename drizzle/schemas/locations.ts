import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { MapTable } from "./maps";
import { LootTypeTable } from "./lootTypes";

export const LocationTable = pgTable("locations", {
  locationId: serial("location_id").notNull().primaryKey(),
  locationName: varchar("location_name", {
    length: 255,
  }).notNull(),
  map: integer("map")
    .references(() => MapTable.mapId, { onDelete: "cascade" })
    .notNull(),
  lootType: integer("loot_type").references(() => LootTypeTable.lootTypeId),
  location: jsonb("location").$type<{ x: number; y: number }>(),
});

export const LocationLootTypesTable = pgTable(
  "location_loot_types",
  {
    LocationId: integer("location_id").references(
      () => LocationTable.locationId,
      { onDelete: "cascade" }
    ),
    lootTypeId: integer("loot_type_id").references(
      () => LootTypeTable.lootTypeId,
      { onDelete: "cascade" }
    ),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.LocationId, t.lootTypeId] }),
  })
);
