import React, { useEffect } from "react";
import Post from "../../components/Post/Post";
import PostLoading from "../../components/PostLoading";
import apolloClient from "../../config/apollo-server/client";
import {
  FetchPostQueryVariables,
  useFetchPostQuery,
  User,
} from "../../generated/graphql";
import Layout from "../../layout/Layout";
import Button from "../../ui/Button";
import NoPost from "../profile/NoPost";
import NewPost from "./media-feed/NewPost";

interface MainProps {}

const Dashboard: React.FC<MainProps> = ({}) => {
  const limit = 5;
  React.useEffect(() => {
    apolloClient.cache.evict({ fieldName: "fetchPost" });
    console.log("clean up fetch post");
    return () => {};
  }, []);

  const { data, loading, fetchMore } = useFetchPostQuery({
    fetchPolicy: "network-only",
    // nextFetchPolicy: "cache-first",
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
            offset: data ? data.fetchPost.posts.length : 0,
          },
        } as FetchPostQueryVariables,
      });
    }
  };
  // if (loading) {
  //   return <h1>Loading</h1>;
  // }

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
            {data?.fetchPost.posts.length === 0 && <NoPost />}
            {data?.fetchPost.posts.map(
              ({ content, user, UpdatedAt, media }, idx) => {
                return (
                  <Post
                    key={idx}
                    description={content}
                    user={user as User}
                    lastUpdateTime={UpdatedAt}
                    image={media}
                  />
                );
              }
            )}
            {loading && <PostLoading />}
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
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
