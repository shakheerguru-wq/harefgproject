import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma configuration
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",

  // Load DATABASE_URL safely
  datasource: {
    url: env("DATABASE_URL"),
  },
});
