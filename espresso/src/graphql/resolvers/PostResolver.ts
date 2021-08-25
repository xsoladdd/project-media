import { FileUpload } from "graphql-upload";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";
import { UserPostLike } from "../../entities/UserPostLike";
import { createError } from "../../utils/createError";
import { UploadToS3 } from "../../utils/s3Bucket";
import { sleep } from "../../utils/sleep";
import { ReturnStructure } from "../generics";
import { EncryptedID, Upload } from "../scalars";
@InputType()
class InputNewPost {
  @Field()
  content: string;
  @Field(() => Upload, { nullable: true })
  media?: FileUpload;
}

@InputType()
class InputFetchPost {
  @Field()
  offset: number;

  @Field()
  limit: number;

  @Field({ nullable: true })
  username?: string;
}

@ObjectType()
class ReturnPosts extends ReturnStructure {
  @Field(() => [Post])
  posts: Post[];
  @Field(() => Boolean)
  has_more: boolean;
}

@ObjectType()
class ReturnPost extends ReturnStructure {
  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver(User)
export class PostResolver {
  // Registration
  @Authorized()
  @Mutation(() => ReturnPost)
  async newPost(
    @Arg("input", { nullable: false }) { content, media }: InputNewPost,
    @Ctx("user") { id }: User
  ): Promise<ReturnPost> {
    if (content.length <= 0) {
      return {
        status: 0,
        errors: [createError("content", "content must not be empty")],
      };
    }

    const user = await User.findOne({
      relations: ["profile"],
      where: { id },
    });

    if (!user) {
      return {
        errors: [createError("user", "user not found")],
        status: 0,
      };
    }
    let media_file_name;
    if (media) {
      media_file_name = await UploadToS3(media);
    }
    const post = await Post.create({
      content,
      media: media_file_name,
      user: user,
    }).save();

    return {
      status: 1,
      post,
    };
  }

  @Authorized()
  @Mutation(() => ReturnPost)
  async likeUnlikePost(
    @Arg("postId", () => EncryptedID) postId: number,
    @Ctx("user") { id }: User
  ): Promise<ReturnPost> {
    const post = await Post.findOne({
      relations: ["userConnection"],
      where: { id: postId },
    });
    if (!post) {
      return {
        status: 0,
        errors: [createError("post", "no post found")],
      };
    }
    const user = await User.findOne({
      relations: ["profile"],
      where: {
        id,
      },
    });
    if (!user?.profile) {
      return {
        status: 0,
        errors: [createError("profile", "no profile found")],
      };
    }
    let existing = false;
    post.userConnection.forEach(({ userId }) => {
      if (userId === user.id) {
        return (existing = true);
      }
    });
    if (!existing) {
      await UserPostLike.create({
        userId: id,
        postId,
      }).save();
    } else {
      // Remove Like
      await UserPostLike.delete({
        userId: id,
        postId,
      });
    }
    return {
      status: 1,
      post,
    };
  }

  @Authorized()
  @Query(() => ReturnPosts)
  async fetchPosts(
    @Arg("input", { nullable: true })
    { limit, offset, username }: InputFetchPost
  ): Promise<ReturnPosts> {
    const posts = await Post.find({
      relations: ["user", "user.profile"],
      where: username && {
        user: {
          username: username,
        },
      },
      order: {
        UpdatedAt: "DESC",
      },
      skip: offset,
      take: limit,
      cache: true,
    });
    await sleep(500);
    return {
      has_more: limit === posts.length,
      posts: posts,
      // posts: posts,
      status: 1,
    };
  }

  @Query(() => ReturnPost)
  async fetchPost(
    @Arg("postId", () => EncryptedID) postId: number
  ): Promise<ReturnPost> {
    const post = await Post.findOne({
      relations: ["user", "user.profile"],
      where: {
        id: postId,
      },
    });
    if (!post) {
      return {
        status: 0,
        errors: [createError("post", "no post found")],
      };
    }

    return {
      status: 1,
      post,
    };
  }
}
