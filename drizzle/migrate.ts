import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import "../envConfig";

const dbString = process.env.DATABASE_URL;

if (typeof dbString === "undefined") {
  throw new Error("DATABASE_URL environment variable was undefined");
}

const migrationClient = postgres(process.env.DATABASE_URL!, {
  max: 1,
});

(async () => {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle/migrations",
  });
  await migrationClient.end();
})();
