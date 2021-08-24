import apolloClient from "../../config/apollo-server/client";
import {
  LikeUnlikePostMutation,
  Post,
  PostFragmentDoc,
} from "../../generated/graphql";

export const updateLikeUnlikeCache = ({
  likeUnlikePost,
}: LikeUnlikePostMutation) => {
  if (!likeUnlikePost.post) {
    return;
  }
  const data = apolloClient.readFragment({
    fragmentName: `post`,
    id: `Post:${likeUnlikePost.post.id}`,
    fragment: PostFragmentDoc,
  }) as Post;
  apolloClient.writeFragment({
    fragmentName: `post`,
    id: `Post:${likeUnlikePost.post.id}`,
    fragment: PostFragmentDoc,
    data: {
      ...data,
      likes: likeUnlikePost.post.likes,
    } as Post,
  });
};
