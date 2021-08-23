import DataLoader from "dataloader";
import { In } from "typeorm";
import { User } from "../../entities/User";
import { UserPostLike } from "../../entities/UserPostLike";

export const createUserPostLikeDataloader = () =>
  new DataLoader<number, User[] | null>(async (postsId) => {
    // Get all data
    const userPost = await UserPostLike.find({
      join: {
        alias: "userPostLike",
        innerJoinAndSelect: {
          user: "userPostLike.user",
        },
      },
      where: {
        postId: In(postsId as number[]),
      },
    });

    /*
      Create an object with record type
      Structure:
      1 [{
        user
      },]
   */

    const userPostArray: Record<number, User[]> = {};

    /*
    Populate record structure with a foreach loop
    */
    userPost.forEach((up) => {
      if (up.postId in userPostArray) {
        userPostArray[up.postId].push(up.user);
      } else {
        userPostArray[up.postId] = [up.user];
      }
    });
    // Return map new array with proper structur
    /*
    Return a map function to restrucutre base on index
    Undefined index from transaction above will return undefined so can be handle with nullable:true
    */
    return postsId.map((postId) => userPostArray[postId]);
  });
