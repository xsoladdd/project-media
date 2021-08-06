import { buildSchema } from "type-graphql";
import authChecker from "./authChecker";
import { UserResolver } from "./resolvers/UserResolver";
import { PostResolver } from "./resolvers/PostResolver";

// import { EncryptedID } from "../scalars";

export default buildSchema({
  resolvers: [UserResolver, PostResolver],
  authChecker,
  // scalarsMap: [{ type: () => ID, scalar: EncryptedID }],
});
