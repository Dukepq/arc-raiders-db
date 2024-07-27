import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./index";
import "../envConfig";

const dbString = process.env.DATABASE_URL!;

if (typeof dbString === "undefined") {
  throw new Error("DATABASE_URL environment variable was undefined");
}

export const client = postgres(dbString, {
  max_lifetime: 10,
});

export const db = drizzle(client, {
  schema,
  // logger: true,
});
