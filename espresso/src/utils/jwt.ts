import jwt from "jsonwebtoken";
import { config } from "dotenv";
import moment from "moment";
import { User } from "../entity/User";
import { tokenObject } from "../types";
import { isProduction } from "../constants";

config();

export const sign = (user: User): string => {
  const obj: tokenObject = {
    exp: isProduction
      ? moment().add(7, "days").unix()
      : moment().add(1, "hour").unix(),
    user,
  };
  const token = jwt.sign(obj, process.env.SECRET_KEY as string);
  return token;
};

export const verify = (token: string): tokenObject => {
  const decoded = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as tokenObject;
  return decoded;
};
