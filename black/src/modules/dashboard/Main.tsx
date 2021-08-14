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
  return (
    <>
      <Layout>
        <h1>Dashboard</h1>
      </Layout>
    </>
  );
};
