import "dotenv/config";
// Remove incorrect import and use dotenv for environment variables
import "dotenv/config";
// Export a config object directly, using process.env for environment variables
export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
