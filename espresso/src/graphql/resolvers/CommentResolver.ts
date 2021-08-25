import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Comments } from "../../entities/Comments";
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";
import { ReturnStructure } from "../generics";
import { EncryptedID } from "../scalars";

@InputType()
class InputComment {
  @Field()
  content: string;
  @Field(() => EncryptedID)
  postId: number;
}

@InputType()
class InputGetComments {
  @Field()
  offset: number;

  @Field()
  limit: number;

  @Field(() => EncryptedID)
  postId: number;
}

@ObjectType()
class ReturnComment extends ReturnStructure {
  @Field()
  comment?: Comments;
}

@ObjectType()
class ReturnComments extends ReturnStructure {
  @Field(() => [Comments], { nullable: true })
  comments?: Comments[];
  @Field(() => Boolean)
  has_more: boolean;
}

@Resolver()
export class CommentResolver {
  @Mutation(() => ReturnComment)
  async addComment(
    @Arg("input") { postId, content }: InputComment,
    @Ctx("user") { id }: User
  ): Promise<ReturnComment> {
    const user = await User.findOne({ id });
    const post = await Post.findOne({ id: postId });
    const comment = await Comments.create({
      content,
      user,
      post,
    }).save();
    return {
      status: 1,
      comment,
    };
  }
  @Query(() => ReturnComments)
  async getComments(
    @Arg("input") { limit, offset, postId }: InputGetComments
  ): Promise<ReturnComments> {
    const comments = await Comments.find({
      relations: ["user", "user.profile"],
      where: {
        postId,
      },
      order: {
        UpdatedAt: "DESC",
      },
      take: limit,
      skip: offset,
    });

    // const post = await CommentPost.find({
    //   join: {
    //     alias: "commentPost",
    //     leftJoinAndSelect: {
    //       comment: "commentPost.comment",
    //       user: "comment.user",
    //       profile: "user.profile",
    //     },
    //   },
    //   where: {
    //     postId,
    //   },
    //   order:{
    //   }
    //   take: limit,
    //   skip: offset,
    // });
    // const comments = post.map(({ comment }) => comment);
    return {
      status: 1,
      has_more: limit === comments.length,
      comments,
    };
  }
}
