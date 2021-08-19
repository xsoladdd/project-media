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

@Resolver()
export class PostResolver {
  // Registration
  @Authorized()
  @Mutation(() => ReturnNewPost)
  async newPost(
    @Arg("input", { nullable: false }) { content }: InputNewPost,
    @Ctx("user") userContext: User
  ): Promise<ReturnNewPost> {
    if (content.length <= 0) {
      return {
        status: 0,
        errors: [createError("content", "content must not be empty")],
      };
    }

    const postRepo = getRepository(Post);
    const userRepo = getRepository(User);

    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.id = :id", { id: userContext.id })
      .getOne();

    if (!user) {
      return {
        errors: [createError("user", "user not found")],
        status: 0,
      };
    }
    const post = postRepo.create({
      content,
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
    const postRepo = getRepository(Post);
    const query = postRepo
      .createQueryBuilder("post")
      .leftJoinAndSelect(`post.user`, `user`)
      .leftJoinAndSelect(`user.profile`, `profile`)
      .orderBy("post.updated_at", "DESC");
    query.offset(offset).limit(limit);
    if (username) query.where("user.username = :username", { username });

    const posts = await query.getMany();

    return {
      has_more: limit === posts.length,
      posts: posts,
      status: 1,
    };
  }
}
