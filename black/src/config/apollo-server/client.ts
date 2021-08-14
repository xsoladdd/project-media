import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import axios from "axios";
import { createUploadLink } from "apollo-upload-client";
import { from, NormalizedCacheObject } from "@apollo/client";
import { GRAPHQL_SERVER } from "../../lib/constants";
import { setContext } from "@apollo/client/link/context";
import {
  getAccessToken,
  getRefreshToken,
  getUserIdentifier,
  setAccessToken,
  setRefreshToken,
} from "../../lib/jscookies";
import { onError } from "@apollo/client/link/error";

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
  ({ response, graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err);
        switch (err.message) {
          case "TOKEN_EXPIRE_ERROR":
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver
            return fromPromise(
              getNewTokens().catch((error) => {
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

const setTokenLink = setContext(async (_, { headers }) => {
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
});

const graphqlHttpLink = createUploadLink({
  uri: `${GRAPHQL_SERVER.PROTOCOL}://${GRAPHQL_SERVER.HOST_PORT}/graphql/`,
});

const graphqlApolloLink = ApolloLink.from([
  errorLink,
  setTokenLink,
  graphqlHttpLink,
]);

apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: graphqlApolloLink,
  // uri: `http://localhost:5001/graphql/`,
});

export default apolloClient;