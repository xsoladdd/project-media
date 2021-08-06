import "reflect-metadata";
import app from "../app";
import { config } from "dotenv";
import colors from "colors";
import { Connection } from "typeorm";
import connection from "../config/typeorm";
import { ApolloServer } from "apollo-server-express";
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
  apolloServer.applyMiddleware({ app });
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
