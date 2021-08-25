import { buildSchema } from "type-graphql";
import authChecker from "./authChecker";
import { UserResolver } from "./resolvers/UserResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { DummyResolver } from "./resolvers/DummyResolver";
import { ProfileResolver } from "./resolvers/ProfileResolver";
import { CommentResolver } from "./resolvers/CommentResolver";

// import { EncryptedID } from "../scalars";

export default buildSchema({
  resolvers: [
    UserResolver,
    PostResolver,
    DummyResolver,
    ProfileResolver,
    CommentResolver,
  ],
  authChecker,
  // scalarsMap: [{ type: () => ID, scalar: EncryptedID }],
});
