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
import { getRepository } from "typeorm";
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";
import { createError } from "../../utils/createError";
import { ReturnStructure } from "../generics";
import { FileUpload } from "graphql-upload";
import { EncryptedID, Upload } from "../scalars";
import { UploadToS3 } from "../../utils/s3Bucket";
import { sleep } from "../../utils/sleep";
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
    @Ctx("user") userTest: User
  ): Promise<ReturnPost> {
    if (content.length <= 0) {
      return {
        status: 0,
        errors: [createError("content", "content must not be empty")],
      };
    }
    // console.log("id", id);
    console.log("userFromContext", userTest);

    const user = await User.findOne({
      relations: ["profile"],
      where: { id: 4 },
    });

    console.log("user", user);

    if (!user) {
      return {
        errors: [createError("user", "user not found")],
        status: 0,
      };
    }
    const postRepo = getRepository(Post);
    let media_file_name;
    if (media) {
      media_file_name = await UploadToS3(media);
    }
    const post = postRepo.create({
      content,
      media: media_file_name,
      user: user,
    });
    await postRepo.save(post);
    return {
      status: 1,
      post,
    };
  }

  @Mutation(() => ReturnPost)
  async likePost(
    @Arg("postId", () => EncryptedID) postId: number
  ): Promise<ReturnPost> {
    const post = await Post.findOne({ id: postId });

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

  @Query(() => ReturnPosts)
  async fetchPost(
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
}
