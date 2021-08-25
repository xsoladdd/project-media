import DataLoader from "dataloader";
import { In } from "typeorm";
import { Comments } from "../../entities/Comments";

export const createCommentDataloader = () =>
  new DataLoader<number, Comments[] | null>(async (postIds) => {
    // Get all data
    const commments = await Comments.find({
      where: {
        postId: In(postIds as number[]),
      },
    });

    // Craete a record object
    const postCommentArray: Record<number, Comments[]> = {};

    // Sort Return array to proper keys
    // Sort data array
    commments.forEach((comment) => {
      if (comment.postId in postCommentArray) {
        postCommentArray[comment.postId].push(comment);
      } else {
        postCommentArray[comment.postId] = [comment];
      }
    });
    // Return map new array with proper structure

    return postIds.map((postId) => postCommentArray[postId]);
  });

/*
  Input
  post ids
  [1,2,3]


  Return
  {
    postId:[
    comment{1}
    comment{2}
    comment{3}
  ],postId:
  comment{4}
  }

  */
