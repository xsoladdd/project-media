import { config } from "dotenv";
import CryptoJS from "crypto-js";
import { ApolloError } from "apollo-server-core";
config();

export const encrypt = (normalString: string): string => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(
      normalString,
      process.env.SECRET_KEY as string
    ).toString();
    return ciphertext;
  } catch (error) {
    throw new ApolloError(
      "INVALID_ECRYPTED_ID_FORMAT",
      "INVALID_ECRYPTED_ID_FORMAT"
    );
  }
};

export const decrypt = (encryptedString: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedString,
      process.env.SECRET_KEY as string
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new ApolloError(
      "INVALID_ECRYPTED_ID_FORMAT",
      "INVALID_ECRYPTED_ID_FORMAT"
    );
  }
};
