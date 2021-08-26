import { QueryResult } from "@apollo/client";
import React from "react";
import { MeQuery, useMeQuery } from "../generated/graphql";
import ProfileSetup from "../modules/profile-setup-modal/ProfileSetup";
import { CustomApolloError } from "../types/apollo";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import Header from "./Header";
import Loading from "../components/Loading/Loading";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  usePrivateRoute();
  const { data, loading, error }: QueryResult<MeQuery> = useMeQuery({
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-only",
    notifyOnNetworkStatusChange: true,
  });
  const apolloError = error as CustomApolloError | undefined;
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{JSON.stringify(apolloError)}</p>;
  }

  return (
    <>
      {!data?.me.user?.profile && <ProfileSetup />}
      <div className="h-screen flex flex-col">
        <Header />
        {/* Body */}
        <div className="flex h-full container mx-auto">
          <div className=" w-screen max-w-3xl  min-h-full mx-auto">
            <div className="py-2 border-l border-r min-h-full pb-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
