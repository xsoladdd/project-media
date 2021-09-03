import React from "react";
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
import Layout from "../../layout/Layout";
import Button from "../../ui/Button";
import NoPost from "../profile/NoPost";

interface MainProps {}

const Dashboard: React.FC<MainProps> = ({}) => {
  const limit = 5;

  useApolloEvict(`fetchPosts`);

  const { data: meData, error: MeError } = useMeQuery();
  const { data, loading, fetchMore, error } = useFetchPostsQuery({
    fetchPolicy: "cache-first",
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
        {error || MeError ? (
          <SomethingWentWrong />
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
                {loading && (
                  <>
                    <PostSekeletonLoading />
                    <PostSekeletonLoading />
                    <PostSekeletonLoading />
                  </>
                )}
                {/* {true &&} */}
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
