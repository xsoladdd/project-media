import Cookies from "js-cookie";

export const setAccessToken = (token: string) => {
  Cookies.set("access_token", token, { expires: 7, path: "" });
};
export const getAccessToken = (): string | boolean => {
  const token = Cookies.get("access_token");
  if (typeof token === "undefined") {
    return false;
  }
  return token;
};
