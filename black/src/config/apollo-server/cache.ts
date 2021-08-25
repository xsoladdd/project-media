import { InMemoryCache } from "@apollo/client";
import { ReturnComments, ReturnPosts } from "../../generated/graphql";
// import { ReturnPosts } from "../../types";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        fetchPosts: {
          // Key args basically means put the variables that is important to this cache.
          // Dont put limit so it wont reflect on caching
          keyArgs: ["input.username"],
          merge(
            existing: ReturnPosts | undefined,
            incoming: ReturnPosts
            // { args }
          ): ReturnPosts {
            return {
              ...incoming,
              posts: [...(existing?.posts || []), ...incoming.posts],
            };
          },
        },
        getComments: {
          keyArgs: ["input.postId"],
          merge(
            existing: ReturnComments | undefined,
            incoming: ReturnComments
            // { args }
          ): ReturnComments {
            return {
              ...incoming,
              comments: [
                ...(existing?.comments || []),
                ...(incoming?.comments || []),
              ],
            };
          },
        },
      },
    },
  },
});
