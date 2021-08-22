import React from "react";
import Loading from "../../../components/Loading/Loading";
import { useMeQuery } from "../../../generated/graphql";
import Layout from "../../../layout/Layout";
import NoUser from "../NoUser";
import EditProfileForm from "./EditProfileForm";

interface EditProfileProps {}

const EditProfile: React.FC<EditProfileProps> = ({}) => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Layout>{data?.me.user ? <EditProfileForm /> : <NoUser />}</Layout>
    </>
  );
};
export default EditProfile;
