import {
  hash,
  checkHash,
  signAccessToken,
  verifyAccessToken,
  isExpired,
  encrypt,
} from "../../utils";
import {
  Resolver,
  Mutation,
  Query,
  InputType,
  Field,
  Int,
  Arg,
  ObjectType,
  Authorized,
  Args,
  Ctx,
} from "type-graphql";
import { getRepository, Raw } from "typeorm";
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
}

@ObjectType()
class ReturnPosts extends ReturnStructure {
  @Field(() => [Post])
  posts: Post[];
}

@Resolver()
export class PostResolver {
  // Registration
  @Authorized()
  @Mutation(() => ReturnStructure)
  async newPost(
    @Arg("input", { nullable: false }) input: InputNewPost,
    @Ctx("user") userContext: User
  ): Promise<ReturnStructure> {
    const { content } = input;
    const postRepo = getRepository(Post);
    const userRepo = getRepository(User);

    const user = await userRepo.findOne({ id: userContext.id });
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
    };
  }

  @Query(() => ReturnPosts)
  async fetchPost(
    @Arg("input", { nullable: true }) input: InputFetchPost
  ): Promise<ReturnPosts> {
    const postRepo = getRepository(Post);
    // console.log(input.offset);
    const posts = await postRepo
      .createQueryBuilder("post")
      .leftJoinAndSelect(`post.user`, `user`)
      .leftJoinAndSelect(`user.profile`, `profile`)
      .skip(input.offset)
      .take(5)
      .getMany();
    return {
      message: "Fetching Success",
      posts: posts,
      status: 1,
    };
  }
}
