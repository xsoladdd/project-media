import { useRouter } from "next/router";
import React from "react";
import { useGetProfileQuery } from "../../generated/graphql";
import Layout from "../../layout/Layout";
import Loading from "../../pages/test";
import NoUser from "./NoUser";
import UserPanel from "./UserPanel";

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  const router = useRouter();
  const { username } = router.query;

  const { data, loading } = useGetProfileQuery({
    fetchPolicy: "cache-first",
    variables: {
      username: typeof username === "string" ? username : "",
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
export default Main;
