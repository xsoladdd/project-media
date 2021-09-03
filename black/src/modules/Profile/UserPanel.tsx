import NextImage from "next/image";
import NextLink from "next/link";
import React, { useState } from "react";
import defaultProfileBanner from "../../assets/images/defaultProfileBanner.png";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import SomethingWentWrong from "../../components/Error/SomethingWentWrong";
import NewPost from "../../components/Post/NewPost";
import Post from "../../components/Post/Post";
import PostSekeletonLoading from "../../components/Post/PostSekeletonLoading";
import {
  FetchPostsQueryVariables,
  useFetchPostsQuery,
  useMeQuery,
  User,
} from "../../generated/graphql";
import { useApolloEvict } from "../../hooks/useApolloEvict";
import Button from "../../ui/Button";
import Menu from "../../ui/Menu";
import NoPost from "./NoPost";
import UploadProfileBanner from "./UploadProfileBanner";
import UploadProfile from "./UploadProfilePicture";
import { useRouter } from "next/router";

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

  useApolloEvict(`fetchPosts`);

  const [bannerModal, setBannerModal] = useState(false);
  const [displayPhotoModal, setDisplayPhotoModal] = useState(false);

  const { push } = useRouter();

  const {
    data,
    loading,
    fetchMore,
    error: PostError,
  } = useFetchPostsQuery({
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
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
            offset: data ? data.fetchPosts.posts.length : 0,
            username: user.username,
          },
        } as FetchPostsQueryVariables,
      });
    }
  };

  const { data: meData, error: MeError } = useMeQuery({
    fetchPolicy: "cache-first",
  });

  if (MeError || PostError) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <div className="w-full ">
        <div className="flex flex-col place-content-center place-items-center ">
          {/* Profile area */}

          <div className="flex justify-center bg-white">
            <div className="w-full relative   ">
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
              {/* Name Area */}
              <div className="">
                <div className="flex justify-between z-20">
                  <div className="rounded-full overflow-hidden border-4 border-white inline-block -mt-16 w-32 h-32 ml-3  ">
                    <div className="w-32 h-32 relative bg-gray-50 f ">
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
                        <div className="hidden md:block">
                          <UploadProfile
                            dismissModal={() => setDisplayPhotoModal(false)}
                            open={displayPhotoModal}
                          >
                            <div className="w-32 h-32 transition relative bg-gray-700 bg-opacity-0 hover:bg-opacity-80 hover:opacity-80 cursor-pointer flex place-items-center place-content-center opacity-0">
                              {/* <BsBoxArrowInUpLeft size="50" color="white" /> */}
                              <p className="text-white">
                                Upload new display photo
                              </p>
                            </div>
                          </UploadProfile>
                        </div>
                      )}
                    </div>
                  </div>
                  {meData?.me.user?.username === user.username && (
                    <>
                      <div className="hidden md:block">
                        <UploadProfileBanner
                          open={bannerModal}
                          dismissModal={() => {
                            setBannerModal(false);
                            console.log(`dismiss`);
                          }}
                          className="rounded-full  text-xs  px-3 py-2 mt-3 mr-3 transition hover:bg-blue-50 inline-block border-2 border-gray-600 text-gray-600 font-bold"
                        >
                          Update Banner
                        </UploadProfileBanner>
                        <NextLink href="/edit-profile">
                          <button className="rounded-full text-xs   px-3 py-2 mt-3 mr-3 transition hover:bg-blue-50 inline-block border-2 border-green-600 text-green-600 font-bold">
                            Edit Profile
                          </button>
                        </NextLink>
                      </div>
                      <div className="block md:hidden pt-3 pr-5">
                        <Menu
                          items={[
                            {
                              title: "Change Display Photo",
                              onClick: () => setDisplayPhotoModal(true),
                            },
                            {
                              title: "Update Banner",
                              onClick: () => setBannerModal(true),
                            },
                            {
                              title: "Edit Profile",
                              onClick: () => push("/edit-profile"),
                            },
                          ]}
                          direction="right"
                        >
                          Menu
                        </Menu>
                      </div>
                    </>
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
        </div>

        <div className="grid grid-cols-1 gap-6 my-6 px-4 ">
          {meData?.me.user?.username === user.username && <NewPost />}
          {loading ? (
            <>
              <PostSekeletonLoading />
              <PostSekeletonLoading />
              <PostSekeletonLoading />
            </>
          ) : (
            <>
              {data?.fetchPosts.posts.length === 0 && <NoPost />}
              {data?.fetchPosts.posts.map(
                ({
                  content,
                  user,
                  UpdatedAt,
                  media,
                  likes,
                  id,
                  commentCount,
                }) => {
                  return (
                    <Post
                      id={id}
                      key={id}
                      description={content}
                      user={user as User}
                      lastUpdateTime={UpdatedAt}
                      image={media}
                      likes={likes?.length}
                      isLiked={
                        !!likes?.find(({ id }) => id === meData?.me.user?.id)
                      }
                      commentsCount={commentCount}
                    />
                  );
                }
              )}
              {data?.fetchPosts.has_more && (
                <Button
                  onClick={handleShowMore}
                  disabled={!data?.fetchPosts.has_more}
                  className="uppercase"
                  variant="green"
                  loading={loading}
                >
                  Show More
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPanel;
