import {
  hash,
  checkHash,
  signAccessToken,
  signRefreshToken,
} from "../../utils";
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
import { User } from "../../entity/User";
import { Profile } from "../../entity/Profile";
import { ReturnStructure, ReturnUserWithProfile } from "../generics";
import { RefreshToken } from "../../entity/RefreshToken";

// import { isNullableType } from "graphql";

@InputType()
class InputRegistration implements Partial<User & Profile> {
  // User Side
  @Field()
  email: string;
  @Field({ nullable: true })
  password: string;
}

@InputType()
class InputLoginNormal {
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
class InputLoginSocialmedia {
  @Field()
  email: string;
}

@ObjectType()
class ReturnRegisterLogin extends ReturnStructure {
  @Field(() => String, { nullable: true })
  token?: string;
  @Field(() => String, { nullable: true })
  refresh_token?: string;
  @Field(() => User, { nullable: true })
  user?: User | null;
}

@Resolver()
export class UserResolver {
  // Registration
  @Mutation(() => ReturnRegisterLogin)
  async registerUser(
    @Arg("input", { nullable: false }) input: InputRegistration
  ): Promise<ReturnRegisterLogin> {
    const { email, password } = input;
    const userRepo = getRepository(User);

    // Check if email existing
    const userRes = await userRepo.findOne({ email });
    if (userRes) {
      return {
        message: "Email already used",
        status: 0,
      };
    }
    const user: User = userRepo.create({
      email,
      password:
        typeof password !== "undefined" ? await hash(password) : undefined,
    });
    await userRepo.save(user).catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });
    console.log(user);

    return {
      message: "Succesfully",
      status: 1,
      token: signAccessToken(user),
      refresh_token: signRefreshToken(user),
      user,
    };
  }

  @Query(() => ReturnRegisterLogin)
  async loginNormal(
    @Arg("input", { nullable: false }) input: InputLoginNormal
  ): Promise<ReturnRegisterLogin> {
    const { password, email } = input;
    const userRepo = getRepository(User);
    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.email = :email", { email })
      .getOne();
    if (!user) {
      return {
        message: "Account doesn't exist",
        status: 0,
      };
    }
    if (!user.password) {
      return {
        message:
          "Seems like account is associated with OAuth Login.Please kindly login via that and setup password under profile -> password ",
        status: 0,
      };
    }

    if (!(await checkHash(password, user.password))) {
      return {
        message: "Invalid password",
        status: 0,
      };
    }
    const refreshTokenRepo = getRepository(RefreshToken);
    // Check if refresh token on storage
    // Delete first before inserting new one
    await refreshTokenRepo
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where("userId = :id", { id: user.id })
      .execute();
    const rt = signRefreshToken(user);
    const refresh_token = refreshTokenRepo.create({
      user,
      refresh_token: rt,
    });
    await refreshTokenRepo.save(refresh_token).catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });
    return {
      message: "Succesfully",
      status: 1,
      token: signAccessToken(user),
      refresh_token: rt,
      user,
    };
  }

  @Mutation(() => ReturnRegisterLogin)
  async oauthHandler(
    @Arg("input", { nullable: false }) input: InputLoginSocialmedia
  ): Promise<ReturnRegisterLogin> {
    const { email } = input;
    const userRepo = getRepository(User);
    const refreshTokenRepo = getRepository(RefreshToken);
    let user = await userRepo
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
    // Guard for social media Oauth
    if (!user) {
      // Insert Record if not existing
      user = userRepo.create({
        email,
      });
      await userRepo.save(user).catch((err) => {
        return {
          message: err.message,
          status: 0,
        };
      });
    }
    // Delete old token first
    await refreshTokenRepo
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where("userId = :id", { id: user.id })
      .execute();
    // Save refresh token
    const rt = signRefreshToken(user);
    const refresh_token = refreshTokenRepo.create({
      user,
      refresh_token: rt,
    });
    await refreshTokenRepo.save(refresh_token).catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });
    return {
      message: "Account succesfully created",
      status: 1,
      token: signAccessToken(user),
      refresh_token: rt,
      user,
    };
  }

  @Authorized()
  @Query(() => ReturnUserWithProfile)
  async me(@Ctx("user") { id }: User): Promise<ReturnUserWithProfile> {
    const userRepo = getRepository(User);
    console.log(id);
    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.id = :id", { id })
      .getOne();
    if (!user) {
      return {
        message: "No User",
        status: 0,
      };
    }
    return {
      message: "Succsefully fetched",
      status: 1,
      user,
    };
  }
}
