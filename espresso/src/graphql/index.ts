import { buildSchema } from "type-graphql";
import authChecker from "./authChecker";
import { UserResolver } from "./resolvers/UserResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { ResfrsehTokenResolver } from "./resolvers/RefreshTokenResolver";
import { DummyResolver } from "./resolvers/DummyResolver";

// import { EncryptedID } from "../scalars";

export default buildSchema({
  resolvers: [UserResolver, PostResolver, ResfrsehTokenResolver, DummyResolver],
  authChecker,
  // scalarsMap: [{ type: () => ID, scalar: EncryptedID }],
});
