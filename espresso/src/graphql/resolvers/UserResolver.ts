import {
  hash,
  checkHash,
  sign,
  verify,
  isExpired,
  encrypt,
  signRefreshToken,
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
import { User } from "../../entity/User";
import { EncryptedID } from "../scalars";
// import { tokenObject } from "../../types";
import { Profile } from "../../entity/Profile";
import { ErrorReturnStructure, ReturnStructure } from "../generics";
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
class InputSetupProfile implements Partial<Profile> {
  @Field()
  firstName: string;
  @Field({ nullable: true })
  middleName: string;
  @Field()
  lastName: string;
  @Field({ nullable: true })
  nickname: string;
  @Field({ nullable: true })
  display_image: string;
  @Field({})
  birthday: Date;
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

@ObjectType()
class ReturnMe extends ReturnStructure {
  @Field(() => User, { nullable: true })
  user?: User;
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
      token: sign(user),
      refresh_token: signRefreshToken(user),
      user,
    };
  }

  @Mutation(() => ReturnStructure)
  async setupProfile(
    @Arg("input", { nullable: true }) input: InputSetupProfile,
    @Ctx("user") { id }: User
  ): Promise<ReturnStructure> {
    const userRepo = getRepository(User);

    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.id = :id", { id })
      .getOne();

    if (user?.profile !== null) {
      return {
        message: "Profile already setup",
        status: 0,
      };
    }

    const {
      birthday,
      display_image,
      firstName,
      lastName,
      middleName,
      nickname,
    } = input;

    const profileRepo = getRepository(Profile);

    console.log(user);

    const profile = profileRepo.create({
      first_name: firstName,
      display_image,
      last_name: lastName,
      middle_name: middleName,
      nickname,
      birthday,
    });

    await profileRepo.save(profile).catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });

    return {
      message: "Profile succesfully save",
      status: 1,
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
    // Create Token
    console.log(user);
    return {
      message: "Succesfully",
      status: 1,
      token: sign(user),
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
      token: sign(user),
      refresh_token: rt,
      user,
    };
  }

  @Query(() => String)
  async ping(): Promise<String> {
    return "Ping successfull. hey thanks for the ping";
  }

  @Authorized()
  @Query(() => ReturnMe)
  async me(@Ctx("user") { id }: User): Promise<ReturnMe> {
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

  // @Mutation(() => RUser)
  // async newUser(
  //   @Arg("input", { nullable: false }) input: IUser
  // ): Promise<RUser> {
  //   const { age, firstName, lastName, email, password } = input;
  //   const userRepository = getRepository(User);
  //   const hashedPassword: string = await hash(password);
  //   const user: User = userRepository.create({
  //     email,
  //     password: hashedPassword,
  //   });
  //   await userRepository.save(user).catch((err) => {
  //     return {
  //       message: err.message,
  //       user: null,
  //       status: 0,
  //     };
  //   });
  //   return {
  //     message: "Succesfully inserted",
  //     user: user,
  //     status: 1,
  //   };
  // }
}
