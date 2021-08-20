import { InMemoryCache } from "@apollo/client";
import { FetchPostQueryVariables, ReturnPosts } from "../../generated/graphql";
// import { ReturnPosts } from "../../types";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // fetchPost: relayStylePagination(),
        fetchPost: {
          // Key args basically means put the variables that is important to this cache.
          // Dont put limit so it wont reflect on caching
          keyArgs: ["input.username"],
          merge(
            existing: ReturnPosts | undefined,
            incoming: ReturnPosts
            // { args }
          ): ReturnPosts {
            // const {
            //   input: { username },
            // } = args as FetchPostQueryVariables;
            // if()
            // console.log("Parameter Username: ", username);
            // console.log(`incoming: `, incoming);
            // console.log(`existing: `, existing);
            return {
              ...incoming,
              posts: [...(existing?.posts || []), ...incoming.posts],
            };
          },
        },
      },
    },
  },
});
