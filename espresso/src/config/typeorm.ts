import { config } from "dotenv";
import { createConnection } from "typeorm";
import ormconfig from "../ormconfig";

config();

export default createConnection(ormconfig);
