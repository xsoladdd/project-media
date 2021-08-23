import { NextPage } from "next";
import React from "react";
import Loading from "../../components/Loading/Loading";
import { useGetProfileQuery } from "../../generated/graphql";
import Layout from "../../layout/Layout";
import NoUser from "./NoUser";
import UserPanel from "./UserPanel";

const Profile: NextPage<{ username: string }, {}> = ({ username }) => {
  const { data, loading } = useGetProfileQuery({
    fetchPolicy: "cache-first",
    variables: {
      username,
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Layout>
        {data && data.getProfile.user ? (
          <UserPanel user={data.getProfile.user} />
        ) : (
          <NoUser />
        )}
      </Layout>
    </>
  );
};

Profile.getInitialProps = async ({ query }: any) => {
  return {
    username: query.username as string,
  };
};

export default Profile;
