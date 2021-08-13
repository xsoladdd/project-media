export const __prod__ = process.env.NODE_ENV === "production";
export const linkRegex =
  /(^|\s)(https?:\/\/)(www\.)?([-a-z0-9]{1,63}\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}(\/[-\\w@\\+\\.~#\\?&/=%]*)?[^\s()]+/;
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const codeBlockRegex = /`([^`]*)`/g;
export const mentionRegex = /^(?!.*\bRT\b)(?:.+\s)?#?@\w+/i;

export const GRAPHQL_SERVER = {
  PROTOCOL: `http`,
  HOST_PORT: `localhost:5001`,
};
