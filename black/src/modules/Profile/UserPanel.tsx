import React from "react";
import {
  FetchPostQueryVariables,
  useFetchPostQuery,
  useMeQuery,
  User,
} from "../../generated/graphql";
import NextImage from "next/image";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import defaultProfileBanner from "../../assets/images/defaultProfileBanner.png";
import Post from "../../components/Post/Post";
import Button from "../../ui/Button";
import NoPost from "./NoPost";
import apolloClient from "../../config/apollo-server/client";
import UploadProfile from "./UploadProfile";

interface UserPanelProps {
  user: User;
}

const UserPanel: React.FC<UserPanelProps> = ({ user }) => {
  const { profile, username } = user;

  const limit = 5;
  if (!profile) {
    return <h1> No Profile </h1>;
  }
  const { first_name, last_name, display_image, middle_name, nickname } =
    profile;

  React.useEffect(() => {
    apolloClient.cache.evict({ fieldName: "fetchPost" });
    return () => {};
  }, []);

  const { data, loading, fetchMore } = useFetchPostQuery({
    // fetchPolicy: "network-only",
    variables: {
      input: {
        limit: 5,
        offset: 0,
        username: user.username,
      },
    },
  });
  const handleShowMore = () => {
    {
      fetchMore({
        variables: {
          input: {
            limit,
            offset: data ? data.fetchPost.posts.length : 0,
            username: user.username,
          },
        } as FetchPostQueryVariables,
      });
    }
  };

  const { data: meData } = useMeQuery({
    fetchPolicy: "cache-first",
  });

  return (
    <>
      <div className="w-full ">
        <div className="flex flex-col place-content-center place-items-center ">
          {/* Profile area */}

          <div className="flex justify-center bg-white">
            <div className="w-full  ">
              <div className="w-full h-44 relative overflow-hidden border-b ">
                {profile.banner_image ? (
                  <NextImage
                    src={profile.banner_image}
                    width="1920"
                    height="1080"
                  />
                ) : (
                  <NextImage src={defaultProfileBanner} />
                )}
              </div>

              <div className="flex justify-between">
                <div className="rounded-full overflow-hidden border-4 border-white inline-block -mt-16 w-32 h-32 ml-3  ">
                  <div className="w-32 h-32 relative">
                    {profile.display_image ? (
                      <NextImage
                        src={display_image}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <NextImage
                        src={defaultProfilePicture}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                    {meData?.me.user?.username === user.username && (
                      <UploadProfile>
                        <div className="w-32 h-32 transition relative bg-gray-700 bg-opacity-0 hover:bg-opacity-50 cursor-pointer"></div>
                      </UploadProfile>
                    )}
                  </div>
                </div>
                {meData?.me.user?.username === user.username && (
                  <div>
                    <button className="rounded-full px-3 py-2 mt-3 mr-3 transition hover:bg-blue-50 inline-block border-2 border-green-600 text-green-600 font-bold">
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              <div className="ml-3">
                <p className="font-bold text-lg">
                  {first_name} {middle_name} {last_name}{" "}
                  {nickname && `(${nickname})`}
                </p>
                <p className="text-gray-500">@{username?.toLowerCase()}</p>
              </div>

              <div className="px-3 mt-3">
                <p>{user.profile?.bio}</p>
              </div>
            </div>
          </div>
        </div>
        {data?.fetchPost.posts.length === 0 && <NoPost />}
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <div className="grid grid-cols-1 gap-6 my-6 px-4 ">
            {data?.fetchPost.posts.map(({ content, user, UpdatedAt }, idx) => {
              return (
                <Post
                  key={idx}
                  description={content}
                  user={user as User}
                  lastUpdateTime={UpdatedAt}
                />
              );
            })}
            {data?.fetchPost.has_more && (
              <Button
                onClick={handleShowMore}
                disabled={!data?.fetchPost.has_more}
                className="uppercase"
                variant="green"
                loading={loading}
              >
                Show More
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserPanel;
