import { QueryResult } from "@apollo/client";
import React, { Profiler } from "react";
import { MeQuery, useMeQuery } from "../../generated/graphql";
import { usePrivateRoute } from "../../hooks/usePrivateRoute";
import Layout from "../../layout/Layout";
import { Exact } from "../../types";
import { CustomApolloError } from "../../types/apollo";
import ProfileSetup from "./profile-setup/ProfileSetup";
// import {} from '../../types/apollo'

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  // usePrivateRoute();
  const { data, loading, error }: QueryResult<MeQuery> = useMeQuery({
    nextFetchPolicy: "cache-only",
  });
  const apolloError = error as CustomApolloError | undefined;
  // console.log(data);
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{JSON.stringify(apolloError)}</p>;
  }

  console.log(data);
  return (
    <>
      {!data?.me.user?.profile && <ProfileSetup />}
      <Layout>{JSON.stringify(data?.me.user?.profile)}</Layout>
    </>
  );
};
