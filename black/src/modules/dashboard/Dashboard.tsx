import React, { useEffect } from "react";
import Post from "../../components/Post/Post";
import PostLoading from "../../components/PostLoading";
import apolloClient from "../../config/apollo-server/client";
import {
  FetchPostsQueryVariables,
  useFetchPostsQuery,
  useMeQuery,
  User,
} from "../../generated/graphql";
import Layout from "../../layout/Layout";
import Button from "../../ui/Button";
import NoPost from "../profile/NoPost";
import NewPost from "./media-feed/NewPost";

interface MainProps {}

const Dashboard: React.FC<MainProps> = ({}) => {
  const limit = 5;
  useEffect(() => {
    return () => {
      apolloClient.cache.evict({ fieldName: "fetchPosts" });
    };
  }, []);

  const { data: meData } = useMeQuery();
  const { data, loading, fetchMore } = useFetchPostsQuery({
    fetchPolicy: "cache-first",
    // fetchPolicy: "network-only",
    variables: {
      input: {
        offset: 0,
        limit,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleShowMore = () => {
    {
      fetchMore({
        variables: {
          input: {
            limit,
            offset: data ? data.fetchPosts.posts.length : 0,
          },
        } as FetchPostsQueryVariables,
      });
    }
  };
  return (
    <>
      <Layout>
        <div className=" flex flex-col place-content-center place-items-center py-4">
          <h1 className="text-3xl font-semibold uppercase">Media Feed</h1>
          {/* New Post */}
          <div className="pt-5">
            <NewPost />
          </div>
        </div>

        <div className="">
          {/* Post item */}
          <div className="grid grid-cols-1 gap-6 my-6 px-4 ">
            {data?.fetchPosts.posts.length === 0 && <NoPost />}
            {data?.fetchPosts.posts.map(
              ({ content, user, UpdatedAt, media, likes, id }) => {
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
                  />
                );
              }
            )}
            {loading && <PostLoading />}
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
