import User from "./entities/User";

export type ast = {
  value: string;
};

export type tokenObject = {
  user: User;
  exp: number;
};

export type contextObject = {
  req: !{};
  token: !string;
  user: User | null;
};

const;
