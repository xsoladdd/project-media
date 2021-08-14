import { QueryResult } from "@apollo/client";
import React from "react";
import { MeQuery, useMeQuery } from "../generated/graphql";
import ProfileSetup from "../modules/dashboard/profile-setup/ProfileSetup";
import { CustomApolloError } from "../types/apollo";
import Header from "./Header";
import NextImage from "next/image";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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

  console.log(data?.me.user?.profile?.display_image);

  return (
    <>
      {!data?.me.user?.profile && <ProfileSetup />}
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        {/* {data?.me.user?.profile?.display_image && (
          <NextImage
            src={data?.me.user?.profile?.display_image}
            alt=""
            width="500"
            height="500"
          />
        )} */}
        <Header />
        {/* Body */}
        <div className="flex h-full container mx-auto  max-w-6xl">
          <div className="w-screen overflow-hidden md:w-9/12 ">{children}</div>
          <div className="hidden md:block  md:w-3/12"></div>
        </div>
      </div>
    </>
  );
};
export default Layout;
