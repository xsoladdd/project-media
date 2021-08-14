import React from "react";
import Layout from "../../layout/Layout";
import NextImage from "next/image";
import { useGetProfileQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import Loading from "../../pages/test";
import UserPanel from "./UserPanel";
import NoUser from "./NoUser";

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  const router = useRouter();
  const { username } = router.query;

  const { data, loading, error } = useGetProfileQuery({
    fetchPolicy: "cache-first",
    variables: {
      getProfileInput: typeof username === "string" ? username : "",
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (!data || !data.getProfile || error) {
    return <h1>Profile not found</h1>;
  }

  const { user } = data.getProfile;
  return (
    <>
      <Layout>{user ? <UserPanel user={user} /> : <NoUser />}</Layout>
    </>
  );
};
export default Main;
