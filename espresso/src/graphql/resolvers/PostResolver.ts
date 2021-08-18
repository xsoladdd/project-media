import {
  Resolver,
  Mutation,
  Query,
  InputType,
  Field,
  Arg,
  ObjectType,
  Authorized,
  Ctx,
} from "type-graphql";
import { getRepository } from "typeorm";
import { ReturnStructure } from "../generics";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
// import { isNullableType } from "graphql";

@InputType()
class InputNewPost {
  @Field()
  content: string;
}

@InputType()
class InputFetchPost {
  @Field()
  offset: number;

  @Field()
  limit: number;
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

@Resolver()
export class PostResolver {
  // Registration
  @Authorized()
  @Mutation(() => ReturnNewPost)
  async newPost(
    @Arg("input", { nullable: false }) input: InputNewPost,
    @Ctx("user") userContext: User
  ): Promise<ReturnNewPost> {
    const { content } = input;
    const postRepo = getRepository(Post);
    const userRepo = getRepository(User);

    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.id = :id", { id: userContext.id })
      .getOne();

    if (!user) {
      return {
        message: "No User Found",
        status: 0,
      };
    }
    const post = postRepo.create({
      content,
      user: user,
    });
    await postRepo.save(post).catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });

    return {
      message: "Post uploaded.",
      status: 1,
      post,
    };
  }

  @Query(() => ReturnPosts)
  async fetchPost(
    @Arg("input", { nullable: true }) input: InputFetchPost
  ): Promise<ReturnPosts> {
    const postRepo = getRepository(Post);
    const posts = await postRepo
      .createQueryBuilder("post")
      .leftJoinAndSelect(`post.user`, `user`)
      .leftJoinAndSelect(`user.profile`, `profile`)
      .orderBy("post.updated_at", "DESC")
      // .orderBy("post.content", "DESC")
      .offset(input.offset)
      .limit(input.limit)
      .getMany();

    console.log(posts.length);
    return {
      message: "Fetching Success",
      has_more: input.limit === posts.length,
      posts: posts,
      status: 1,
    };
  }
}
