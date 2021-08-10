import "reflect-metadata";
import app from "../app";
import { config } from "dotenv";
import colors from "colors";
import { Connection } from "typeorm";
import connection from "../config/typeorm";
import {
  ApolloError,
  ApolloServer,
  AuthenticationError,
} from "apollo-server-express";
import buildSchema from "../graphql";
import { contextObject } from "../types";
import { verify } from "../utils";

config();
const PORT = process.env.PORT || 5050;
const main = async () => {
  const conn: Connection = await connection;
  const schema = await buildSchema;
  const apolloServer: ApolloServer = new ApolloServer({
    schema: schema,
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
        typeof token !== "undefined" && verify(token.split(" ")[1]).user;
      const context: contextObject = {
        req,
        token: token || "",
        user,
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
