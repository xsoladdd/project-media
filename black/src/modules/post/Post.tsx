import { NextPage } from "next";
import React from "react";
import { useFetchPostQuery } from "../../generated/graphql";

const Post: NextPage<{ postId: string }, {}> = ({ postId }) => {
  const { data, loading } = useFetchPostQuery({
    variables: {
      postId: postId as string,
    },
  });
  if (!data) {
    return <h1>No post</h1>;
  }
  if (loading) {
    return <h1>Loading</h1>;
  }

  return <h1>{JSON.stringify(data)}</h1>;
};

Post.getInitialProps = async ({ query }: any) => {
  return {
    postId: query.postId as string,
  };
};

export default Post;
