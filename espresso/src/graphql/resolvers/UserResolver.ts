import {
  hash,
  // checkHash,
  signAccessToken,
  signRefreshToken,
  verify,
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
  FieldResolver,
  Root,
} from "type-graphql";
import { getRepository, Like } from "typeorm";
import { User } from "../../entities/User";
import {
  ReturnStructure,
  ReturnUsersWithProfile,
  ReturnUserWithProfile,
} from "../generics";
import { RefreshToken } from "../../entities/RefreshToken";
import { validateEmail } from "../../utils/validation";
import { createError } from "../../utils/createError";
import { Profile } from "../../entities/Profile";
import { contextObject } from "../../types";

@InputType()
class LoginRegistrationInput {
  @Field()
  email: string;
  @Field()
  password: string;
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

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => Profile, { nullable: true })
  async profile(
    @Root() user: User,
    @Ctx() { profileDataloader }: contextObject
  ) {
    return profileDataloader.load(user.id);
  }
  @Mutation(() => ReturnRegisterLogin)
  async registerUser(
    @Arg("input") { email, password }: LoginRegistrationInput
  ): Promise<ReturnRegisterLogin> {
    if (!validateEmail(email)) {
      return {
        status: 0,
        errors: [createError("email", "invald email format")],
      };
    }

    try {
      const user = await User.create({
        email,
        password: await hash(password),
      }).save();

      return {
        status: 1,
        token: signAccessToken(user),
        refresh_token: signRefreshToken(user),
        user,
      };
    } catch (err) {
      // if()
      if (err.code === "ER_DUP_ENTRY") {
        return {
          status: 0,
          errors: [createError("email", "email already exist")],
        };
      }
      return {
        status: 0,
        errors: [createError("email", "invald email format")],
      };
    }
  }

  @Mutation(() => ReturnRegisterLogin)
  async loginNormal(
    @Arg("input") { email, password }: LoginRegistrationInput
  ): Promise<ReturnRegisterLogin> {
    if (!validateEmail(email)) {
      return {
        status: 0,
        errors: [createError("email", "invald email format")],
      };
    }
    const userRepo = getRepository(User);
    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.email = :email", { email })
      .getOne();
    if (!user) {
      return {
        status: 0,
        errors: [createError("email", `account doesn't exist`)],
      };
    }

    if (!user.password) {
      return {
        status: 0,
        errors: [
          createError(
            "email",
            `email is associated with another login method. please login using that and add password`
          ),
        ],
      };
    }
    const isVerify = await verify(user.password, password);

    if (!isVerify) {
      return {
        status: 0,
        errors: [createError("password", `invalid password`)],
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
    await refreshTokenRepo.save(refresh_token);
    return {
      status: 1,
      token: signAccessToken(user),
      refresh_token: rt,
      user,
    };
  }

  @Mutation(() => ReturnRegisterLogin)
  async oauthHandler(
    @Arg("email") email: string
  ): Promise<ReturnRegisterLogin> {
    if (!validateEmail(email)) {
      return {
        status: 0,
        errors: [createError("email", "invald email format")],
      };
    }
    const userRepo = getRepository(User);
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

    const refreshTokenRepo = getRepository(RefreshToken);
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
    await refreshTokenRepo.save(refresh_token);
    return {
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
    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.id = :id", { id })
      .getOne();
    if (!user) {
      return {
        status: 0,
      };
    }
    return {
      status: 1,
      user,
    };
  }

  @Query(() => ReturnUsersWithProfile)
  async search(
    @Arg(`keyword`) keyword: string
  ): Promise<ReturnUsersWithProfile> {
    if (keyword === "") {
      return {
        status: 1,
        users: [],
      };
    }

    const users = await User.find({
      relations: ["profile"],
      where: [
        {
          profile: {
            nickname: Like(`%${keyword}%`),
          },
        },
        {
          profile: {
            first_name: Like(`%${keyword}%`),
          },
        },
        {
          profile: {
            middle_name: Like(`%${keyword}%`),
          },
        },
        {
          profile: {
            last_name: Like(`%${keyword}%`),
          },
        },
      ],
    });
    console.log(users);
    return {
      status: 1,
      users,
    };
  }
}
