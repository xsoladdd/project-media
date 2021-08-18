import { config } from "dotenv";
import crypto from "crypto";
config();

export const encrypt = (toEncrypt: string) => {
  const algorithm = "aes-256-cbc";
  const password = process.env.SECRET_KEY;
  if (!password) {
    return "";
  }
  let key = crypto
    .createHash("md5")
    .update(password, "utf8")
    .digest("hex")
    .toUpperCase();

  let iv = Buffer.alloc(16);

  let encrypt = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = encrypt.update(`${toEncrypt}`, "utf8", "hex");
  encrypted += encrypt.final("hex");
  return encrypted;
};

export const decrypt = (toDecrypt: string): string => {
  try {
    const algorithm = "aes-256-cbc";
    const password = process.env.SECRET_KEY;
    if (!password) {
      return "";
    }
    let key = crypto
      .createHash("md5")
      .update(password, "utf8")
      .digest("hex")
      .toUpperCase();

    let iv = Buffer.alloc(16);

    let decrypt = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decrypt.update(toDecrypt, "hex", "utf8");
    decrypted += decrypt.final("utf8");
    return decrypted;
  } catch (err) {
    return "";
  }
};
