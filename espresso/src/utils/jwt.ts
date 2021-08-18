import { ApolloError } from "apollo-server-core";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import moment from "moment";
import { User } from "../entity/User";
import { tokenObject } from "../types";

config();

export const signAccessToken = (user: User): string => {
  const obj: tokenObject = {
    exp: moment().add(1, "month").unix(),
    user,
  };
  const token = jwt.sign(obj, process.env.SECRET_KEY as string);
  return token;
};

export const verifyAccessToken = (token: string): tokenObject => {
  const decoded = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as tokenObject;
  return decoded;
};

export const signRefreshToken = (user: User): string => {
  const obj: tokenObject = {
    exp: moment().add(7, "days").unix(),
    user,
  };
  const token = jwt.sign(obj, process.env.SECRET_KEY_X as string);
  return token;
};
export const verifyRefreshToken = (
  token: string
): tokenObject | "RESFRSEH_TOKEN_EXPIRE" => {
  try {
    const decoded: tokenObject = jwt.verify(
      token,
      process.env.SECRET_KEY_X as string
    ) as tokenObject;
    console.log(decoded);
    return decoded;
  } catch (error) {
    if (error.toString().includes("jwt expired")) {
      return "RESFRSEH_TOKEN_EXPIRE";
    } else {
      throw new ApolloError(
        "INVALID_REFRESH_TOKEN_FORMAT",
        "INVALID_REFRESH_TOKEN_FORMAT"
      );
    }
  }
};
