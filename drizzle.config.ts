import { defineConfig } from "drizzle-kit";

const dbString = process.env.DATABASE_URL;

if (typeof dbString === "undefined") {
  throw new Error("DATABASE_URL environment variable was undefined");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/index.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: dbString,
  },
});
