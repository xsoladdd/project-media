import { debounce } from "lodash";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import Comments from "../../components/Comments/Comments";
import { updateLikeUnlikeCache } from "../../components/Post/updateLikeUnlikeCache";
import apolloClient from "../../config/apollo-server/client";
import {
  InputGetComments,
  // PostType,
  // PostFragmentDoc,
  useFetchPostQuery,
  useGetCommentsQuery,
  useLikeUnlikePostMutation,
  useMeQuery,
} from "../../generated/graphql";
import Layout from "../../layout/Layout";
import Avatar from "../../ui/Avatar/Avatar";
import Button from "../../ui/Button";
import NewComment from "./comments/NewComment";
import NextImage from "next/image";
import Loading from "../../components/Loading/Loading";
import MiniLoading from "../../components/MiniLoading";

const Post: NextPage<{ postId: string }, {}> = ({ postId }) => {
  const limit = 5;

  useEffect(() => {
    apolloClient.cache.evict({ fieldName: "getComments" });
    return () => {};
  }, []);

  const { data, error, loading } = useFetchPostQuery({
    fetchPolicy: "cache-first",
    variables: {
      postId: postId as string,
    },
  });

  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useMeQuery({
    fetchPolicy: "cache-first",
  });

  const {
    data: commentData,
    loading: commentLoading,
    fetchMore,
  } = useGetCommentsQuery({
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        postId,
        offset: 0,
        limit,
      },
    },
  });

  const [likeUnlike, { loading: likeUnlikeLoading }] =
    useLikeUnlikePostMutation({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      onCompleted: (data) => updateLikeUnlikeCache(data),
    });

  if (meLoading || loading) {
    return <Loading />;
  }

  if (!meData?.me.user || error || meError) {
    return <h1> Something went wrong</h1>;
  }

  if (!data) {
    return <h1>No post</h1>;
  }

  const isLiked = data.fetchPost.post?.likes?.find(
    ({ id }) => id === meData?.me.user?.id
  );

  return (
    <Layout>
      <div className="bg-white  shadow-sm px-4 py-3 rounded-lg m-3">
        <div className="flex items-center ">
          <Avatar src={data.fetchPost.post?.user?.profile?.display_image} />

          <div className="ml-2">
            <div className="text-sm ">
              <span className="font-semibold">
                {data.fetchPost.post?.user?.profile?.first_name}{" "}
                {data.fetchPost.post?.user?.profile?.middle_name}{" "}
                {data.fetchPost.post?.user?.profile?.last_name}
              </span>
              {data.fetchPost.post?.user?.profile?.nickname && (
                <span className="text-gray-500 pl-2">
                  {data.fetchPost.post?.user?.profile?.nickname}
                </span>
              )}
            </div>
            <div className="text-gray-500 text-xs ">
              @{data.fetchPost.post?.user?.username}
            </div>
          </div>
        </div>
        <div className="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed">
          {data.fetchPost.post?.media && (
            <div className="py-3">
              <div className=" relative w-full h-44 rounded-lg overflow-hidden">
                <NextImage
                  src={data.fetchPost.post?.media}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          )}
          {data.fetchPost.post?.content}
        </div>
        <div className="text-gray-700 text-xs flex items-center mt-3">
          <div className="pb-2 flex flex-row items-center">
            <button
              className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg"
              disabled={likeUnlikeLoading}
              onClick={debounce(() => {
                likeUnlike({
                  variables: {
                    postId: data.fetchPost.post?.id,
                  },
                });
              }, 300)}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <span className="ml-1">
                {data.fetchPost.post?.likes?.length
                  ? data.fetchPost.post?.likes?.length
                  : 0}
              </span>
            </button>
            <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
              <FaRegCommentDots />
              <span className="ml-1">
                {data.fetchPost.post?.commentCount
                  ? data.fetchPost.post?.commentCount
                  : 0}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-md px-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
        <div className="space-y-4">
          <NewComment user={meData?.me?.user} postId={postId} />
          {commentData?.getComments?.comments?.length === 0 && (
            <p>No comments available</p>
          )}
          {commentData?.getComments?.comments?.map(
            ({ UpdatedAt, content, id, user }) => (
              <Comments
                key={id}
                content={content}
                user={user}
                UpdatedAt={UpdatedAt}
              />
            )
          )}

          {commentLoading ? <MiniLoading /> : <></>}
          {commentData?.getComments.has_more && (
            <div className="grid py-3">
              <Button
                variant="green"
                disabled={commentLoading}
                onClick={() => {
                  fetchMore({
                    variables: {
                      input: {
                        limit,
                        postId,
                        offset: commentData?.getComments?.comments?.length,
                      } as InputGetComments,
                    },
                  });
                }}
              >
                Show more comments
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

Post.getInitialProps = async ({ query }: any) => {
  return {
    postId: query.postId as string,
  };
};

export default Post;
