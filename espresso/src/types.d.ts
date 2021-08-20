import User from "./entities/User";
import { createProfileDataloader } from "./graphql/dataloader/createProfileDataloader";

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
  profileDataloader: ReturnType<typeof createProfileDataloader>;
};
