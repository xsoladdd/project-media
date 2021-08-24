import { NextPage } from "next";
import React from "react";
import {
  // PostType,
  PostFragmentDoc,
  useFetchPostQuery,
  useLikeUnlikePostMutation,
  useMeQuery,
} from "../../generated/graphql";
import Layout from "../../layout/Layout";
import NextImage from "next/image";
import { debounce } from "lodash";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { updateLikeUnlikeCache } from "../../components/Post/updateLikeUnlikeCache";
import Avatar from "../../ui/Avatar/Avatar";

const Post: NextPage<{ postId: string }, {}> = ({ postId }) => {
  const { data, loading } = useFetchPostQuery({
    fetchPolicy: "cache-first",
    variables: {
      postId: postId as string,
    },
  });
  const { data: meData } = useMeQuery({
    fetchPolicy: "cache-first",
  });

  const [likeUnlike, { loading: likeUnlikeLoading }] =
    useLikeUnlikePostMutation({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      onCompleted: (data) => updateLikeUnlikeCache(data),
    });

  if (!data) {
    return <h1>No post</h1>;
  }
  // if (loading) {
  //   return <h1>Loading</h1>;
  // }

  console.log(`fetched data`, data.fetchPost.post);

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
            {/* <div className="text-gray-500 text-xs flex">
              <span className="inline-block">3d • Edited • </span>
              <svg
                className="inline-block ml-1 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                data-supported-dps="16x16"
                fill="currentColor"
                width="16"
                height="16"
                focusable="false"
              >
                <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
              </svg>
            </div> */}
          </div>
        </div>
        <p className="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed">
          {data.fetchPost.post?.content}
        </p>
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
              {/* {false ? <FaHeart /> : <FaRegHeart />} */}
              <span className="ml-1">
                {data.fetchPost.post?.likes?.length
                  ? data.fetchPost.post?.likes?.length
                  : 0}
              </span>
            </button>
            <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
              <FaRegCommentDots />
              <span className="ml-1">{100}</span>
            </button>
          </div>
          {/*
          <span className="ml-1">47 • 26 comments</span> */}
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
