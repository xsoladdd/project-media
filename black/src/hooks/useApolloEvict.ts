import { useEffect } from "react";
import apolloClient from "../config/apollo-server/client";

export const useApolloEvict = (cacheFieldName: string) => {
  useEffect(() => {
    console.log("clean");
    apolloClient.cache.evict({ fieldName: cacheFieldName });
    return () => {
      // apolloClient.cache.evict({ fieldName: cacheFieldName });
    };
  }, []);
};
