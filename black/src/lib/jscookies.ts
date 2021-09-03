import Cookies from "js-cookie";

export const setAccessToken = (token: string) => {
  Cookies.set("access_token", token, { expires: 7, path: "/" });
};

export const getAccessToken = (): string | boolean => {
  const token = Cookies.get("access_token");
  if (typeof token === "undefined") {
    return false;
  }
  return token;
};

export const removeAccessToken = (): boolean => {
  Cookies.remove("access_token");
  const token = Cookies.get("access_token");
  return typeof token === "undefined";
};

export const setRefreshToken = (token: string) => {
  Cookies.set("refresh_token", token, { expires: 7, path: "/" });
};

export const getRefreshToken = (): string | boolean => {
  const token = Cookies.get("refresh_token");
  if (typeof token === "undefined") {
    return false;
  }
  return token;
};

export const removeRefreshToken = (): boolean => {
  Cookies.remove("refresh_token");
  const token = Cookies.get("refresh_token");
  return typeof token === "undefined";
};

export const setUserIdentifier = (token: string) => {
  Cookies.set("user_identifier", token, { expires: 7, path: "/" });
};

export const getUserIdentifier = (): string | boolean => {
  const id = Cookies.get("user_identifier");
  if (typeof id === "undefined") {
    return false;
  }
  return id;
};

export const removeUserIdentifier = (): boolean => {
  Cookies.remove("user_identifier");
  const id = Cookies.get("user_identifier");
  return typeof id === "undefined";
};

export const setDarkMode = (isDarkMode: boolean) => {
  return Cookies.set("isDarkMode", `${isDarkMode}`);
};

export const getDarkModeStatus = (): boolean => {
  const isDarkMode = Cookies.get("isDarkMode");

  return isDarkMode === "true";
};
