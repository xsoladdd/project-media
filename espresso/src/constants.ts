import { config } from "dotenv";
import path from "path";

config();
export const isProduction = process.env.NODE_ENV === "production";

export const AWS_S3_BASE_URL: string =
  process.env.AWS_S3_BASE_URL || path.join(__dirname, "/../assets/images/");
