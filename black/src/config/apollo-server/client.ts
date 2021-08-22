import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  NormalizedCacheObject,
} from "@apollo/client";
import { ContextSetter, setContext } from "@apollo/client/link/context";
import { ErrorHandler, onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import axios from "axios";
import { GRAPHQL_SERVER } from "../../lib/constants";
import {
  getAccessToken,
  getRefreshToken,
  getUserIdentifier,
  setAccessToken,
  setRefreshToken,
} from "../../lib/jscookies";
import { cache } from "./cache";

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface tokenReturnInterface {
  refresh_token: string;
  fresh_token: string;
}

const getNewTokens = async (): Promise<tokenReturnInterface> => {
  const user_id = getUserIdentifier();
  const res = await axios.post(
    `http://localhost:5001/refreshToken`,
    {
      refresh_token: getRefreshToken(),
      user_id,
    },
    {}
  );
  const { fresh_token, refresh_token } = res.data;
  return { fresh_token, refresh_token };
  // return res.data;
};

// errorLink for global error handler
const errorLink = onError(
  // ({ response, graphQLErrors, networkError, forward, operation }) => {
  ({ graphQLErrors, forward, operation }): ReturnType<ErrorHandler> => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err);
        switch (err.message) {
          case "TOKEN_EXPIRE_ERROR":
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver
            return fromPromise(
              getNewTokens().catch(() => {
                // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((tokens) => {
                if (!tokens) {
                  return forward(operation);
                }
                setAccessToken(tokens.fresh_token);
                if (tokens.refresh_token) setRefreshToken(tokens.refresh_token);
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${tokens.fresh_token}`,
                  },
                });
                return forward(operation);
              });
          default:
            break;
        }
      }
    }
  }
);

const setTokenLink = setContext(
  async (_, { headers }): Promise<ReturnType<ContextSetter>> => {
    try {
      const accessToken = getAccessToken();

      if (accessToken) {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${accessToken}`,
          },
        };
      }
      return {
        headers: {
          ...headers,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
);

const graphqlHttpLink = createUploadLink({
  uri: `${GRAPHQL_SERVER.PROTOCOL}://${GRAPHQL_SERVER.HOST_PORT}/graphql/`,
});

const graphqlApolloLink = ApolloLink.from([
  errorLink,
  setTokenLink,
  graphqlHttpLink,
]);

apolloClient = new ApolloClient({
  cache,
  link: graphqlApolloLink,
  // uri: `http://localhost:5001/graphql/`,
});

export default apolloClient;
