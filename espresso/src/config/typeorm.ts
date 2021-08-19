import { config } from "dotenv";
import { createConnection } from "typeorm";
import { isProduction } from "../constants";
import path from "path";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
import { RefreshToken } from "../entities/RefreshToken";
import { Post } from "../entities/Post";
import { Comments } from "../entities/Comments";
config();

export default createConnection({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // synchronize: true,
  logging: !isProduction,
  entities: [User, Profile, Comments, Post, RefreshToken],
  migrations: [path.join(__dirname + `../migration/**/*.ts`)],
  // subscribers: ["src/subscriber/**/*.ts"],
  // cli: {
  //   migrationsDir: "src/migration",
  // },
});
