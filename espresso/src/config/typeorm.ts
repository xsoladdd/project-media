import { createConnection, Db } from "typeorm";
import { config } from "dotenv";
import ormconfig from "../../ormconfig";

config();

export default createConnection(ormconfig);
