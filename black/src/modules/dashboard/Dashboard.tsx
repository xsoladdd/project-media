import React, { useEffect } from "react";
import Post from "../../components/Post/Post";
import MiniLoading from "../../components/MiniLoading";
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
import NewPost from "../../components/Post/NewPost";
import Error from "../../components/Error/Error";

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
        {false ? (
          <Error />
        ) : (
          <>
            <div className=" flex flex-col place-content-center place-items-center py-4">
              <h1 className="text-3xl font-semibold uppercase">Media Feed</h1>
              {/* </div> */}
            </div>

            <div className="">
              {/* Post item */}
              <div className="grid grid-cols-1 gap-6 my-6 px-4 ">
                {/* New post */}
                <NewPost />

                {/* Post  */}
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
                {loading && <MiniLoading />}
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
          </>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
