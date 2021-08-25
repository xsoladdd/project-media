import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground";
import { ApolloError, ApolloServer } from "apollo-server-express";
import colors from "colors";
import { config } from "dotenv";
import "reflect-metadata";
import { Connection } from "typeorm";
import app from "../app";
import connection from "../config/typeorm";
import buildSchema from "../graphql";
import { createCommentDataloader } from "../graphql/dataloader/createCommentDataloader";
import { createProfileDataloader } from "../graphql/dataloader/createProfileDataloader";
import { createUserPostLikeDataloader } from "../graphql/dataloader/createUserPostLikeDataloader";
import { contextObject } from "../types";
import { verifyAccessToken } from "../utils";

config();
const PORT = process.env.PORT || 5050;
const main = async () => {
  const conn: Connection = await connection;
  const schema = await buildSchema;
  const apolloServer: ApolloServer = new ApolloServer({
    schema: schema,

    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    formatError: (err) => {
      if (err.message.includes("jwt expired")) {
        return new ApolloError("TOKEN_EXPIRE_ERROR", "TOKEN_EXPIRE_ERROR");
        // return new AuthenticationError("Token Expire Error");
        // return new Error();
      }
      if (err.message.startsWith("Database Error: ")) {
        return new ApolloError("INTERNAL_SERVICE_ERROR");
      }
      return err;
    },
    context: ({ req }) => {
      const token = req.headers.authorization;
      const user =
        typeof token !== "undefined" &&
        verifyAccessToken(token.split(" ")[1]).user;
      const context: contextObject = {
        req,
        token: token || "",
        user,
        profileDataloader: createProfileDataloader(),
        userPostLikeDataloader: createUserPostLikeDataloader(),
        commentDataloader: createCommentDataloader(),
      };
      return context;
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: { origin: true, credentials: false },
  });
  app.listen(PORT, () => {
    if (conn.isConnected) {
      console.log(colors.yellow(`Database Connected`));
    }
    console.log(
      colors.yellow(
        `🚀server is running at port ${PORT}${apolloServer.graphqlPath}`
      )
    );
  });
};
main().catch((err) => {
  console.error(err);
});
