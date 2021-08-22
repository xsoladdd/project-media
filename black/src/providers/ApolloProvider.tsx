import { ApolloProvider as LibApolloProvider } from "@apollo/client";
import React from "react";
// import apolloClient from "../config/apollo-server/auth";
import apolloClient from "../config/apollo-server/client";

const ApolloProvider: React.FC = ({ children }) => {
  return (
    <LibApolloProvider client={apolloClient}>{children}</LibApolloProvider>
  );
};
export default ApolloProvider;
