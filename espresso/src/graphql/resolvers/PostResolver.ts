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
import { Upload } from "../scalars";
import { UploadToS3 } from "../../utils/s3Bucket";
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
class ReturnNewPost extends ReturnStructure {
  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver(User)
export class PostResolver {
  // Registration
  @Authorized()
  @Mutation(() => ReturnNewPost)
  async newPost(
    @Arg("input", { nullable: false }) { content, media }: InputNewPost,
    @Ctx("user") userContext: User
  ): Promise<ReturnNewPost> {
    if (content.length <= 0) {
      return {
        status: 0,
        errors: [createError("content", "content must not be empty")],
      };
    }

    const postRepo = getRepository(Post);
    // const userRepo = getRepository(User);

    // const user = await userRepo
    //   .createQueryBuilder("user")
    //   .leftJoinAndSelect(`user.profile`, `profile`)
    //   .where("user.id = :id", { id: userContext.id })
    //   .getOne();

    const user = await User.findOne({
      relations: ["profile"],
      where: { id: userContext.id },
    });

    console.log(user);

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

    return {
      has_more: limit === posts.length,
      posts: posts,
      // posts: posts,
      status: 1,
    };
  }
}
