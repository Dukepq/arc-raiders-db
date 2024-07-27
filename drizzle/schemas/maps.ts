import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const MapTable = pgTable("maps", {
  mapId: serial("map_id").primaryKey().notNull(),
  mapName: varchar("map_name", { length: 50 }).unique(),
});
