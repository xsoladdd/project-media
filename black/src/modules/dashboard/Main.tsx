import { QueryResult } from "@apollo/client";
import React from "react";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import { usePrivateRoute } from "../../hooks/usePrivateRoute";
import Layout from "../../layout/Layout";
import { Exact } from "../../types";
import { CustomApolloError } from "../../types/apollo";
// import {} from '../../types/apollo'

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  // usePrivateRoute();
  const { data, loading, error }: QueryResult<MeQuery> = useMeQuery();
  const apolloError = error as CustomApolloError | undefined;

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{JSON.stringify(apolloError)}</p>;
  }
  return <Layout>{JSON.stringify(data)}</Layout>;
};
