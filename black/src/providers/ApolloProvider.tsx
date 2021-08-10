import React from "react";
import {
  ApolloProvider as LibApolloProvider,
  createHttpLink,
} from "@apollo/client";
// import apolloClient from "../config/apollo-server/auth";
import apolloClient from "../config/apollo-server/client";

const ApolloProvider: React.FC = ({ children }) => {
  return (
    <LibApolloProvider client={apolloClient}>{children}</LibApolloProvider>
  );
};
export default ApolloProvider;
