import React from "react";
import { getAccessToken } from "../utils/jscookies";
import {
  ApolloProvider as LibApolloProvider,
  InMemoryCache,
  ApolloClient,
} from "@apollo/client";

// const client = createClient({
//   url: "http://localhost:5001/graphql",
//   fetchOptions: () => {
//     const token = getAccessToken();
//     const bearer = token ? `Bearer ${token}` : "";
//     if (token) {
//       return {
//         headers: { authorization: bearer },
//       };
//     } else {
//       return {};
//     }
//   },
// });

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache(),
});

const ApolloProvider: React.FC = ({ children }) => {
  return <LibApolloProvider client={client}>{children}</LibApolloProvider>;
};
export default ApolloProvider;
