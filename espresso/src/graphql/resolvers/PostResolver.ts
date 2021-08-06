import { hash, checkHash, sign, verify, isExpired, encrypt } from "../../utils";
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
import { EncryptedID } from "../scalars";
// import { tokenObject } from "../../types";
import { Profile } from "../../entity/Profile";
import { ReturnStructure } from "../generics";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import { contextObject } from "src/types";
// import { isNullableType } from "graphql";

@InputType()
class InputNewPost {
  @Field()
  title: string;
  @Field()
  content: string;
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
    @Ctx("user") userToken: User
  ): Promise<ReturnStructure> {
    const { content, title } = input;
    const postRepo = getRepository(Post);
    const userRepo = getRepository(User);

    // console.log(verify(token));

    const user = await userRepo.findOne({ id: userToken.id });
    const post = postRepo.create({
      title,
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
  async allPost(
    @Arg("limit", { nullable: true, defaultValue: 10 }) limit: number
  ): Promise<ReturnPosts> {
    console.log(limit);
    const postRepo = getRepository(Post);
    const posts = await postRepo
      .createQueryBuilder("post")
      .leftJoinAndSelect(`post.user`, `user`)
      .limit(limit)
      .getMany();
    return {
      message: "Fetching Success",
      posts: posts,
      status: 1,
    };
  }
}
