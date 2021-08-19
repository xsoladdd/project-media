import argon2 from "argon2";

export const hash = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const verify = async (
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, plainPassword);
};
