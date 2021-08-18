import { config } from "dotenv";
import { isProduction } from "./constants";
import { ConnectionOptions } from "typeorm";
config();

export default {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // synchronize: true,
  logging: !isProduction,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    migrationsDir: "src/migration",
  },
} as ConnectionOptions;
