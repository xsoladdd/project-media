import React from "react";
import Layout from "../../layout/Layout";
import NextImage from "next/image";
import { useGetProfileQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  const router = useRouter();
  const { username } = router.query;

  const { data, loading, error } = useGetProfileQuery({
    fetchPolicy: "network-only",
    variables: {
      getProfileInput: typeof username === "string" ? username : "",
    },
  });

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (
    !data ||
    !data.getProfile ||
    !data.getProfile.user ||
    !data.getProfile.user.profile ||
    !data.getProfile.user.username ||
    error
  ) {
    return <h1>Profile not found</h1>;
  }
  const { nickname, last_name, middle_name, first_name, display_image } =
    data.getProfile.user.profile;
  return (
    <>
      <Layout>
        <div className="py-5 flex flex-col place-content-center place-items-center">
          <div className="w-32 h-32 rounded-full  overflow-hidden border-gray-800 border-2 flex">
            <div className="w-full h-full relative">
              {display_image ? (
                <NextImage
                  src={display_image}
                  layout="fill"
                  objectFit="cover"

                  // objectFit="unset"
                />
              ) : (
                <NextImage
                  src={defaultProfilePicture}
                  layout="fill"
                  objectFit="cover"

                  // objectFit="unset"
                />
              )}
            </div>
          </div>

          {/* Display Data */}
          <div className="py-4">
            <h3 className="capitalize font-semibold text-xl">
              {first_name} {middle_name} {last_name}{" "}
              {nickname && `(${nickname})`}
            </h3>
            {/* <p className="">
                Birthday: {moment(profile?.birthday).format("MMMM DD YYYY")}
              </p> */}
            {/* <p className="">
              </p> */}
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Main;
