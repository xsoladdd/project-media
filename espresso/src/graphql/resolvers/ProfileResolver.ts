import { FileUpload } from "graphql-upload";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { Profile } from "../../entities/Profile";
import { User } from "../../entities/User";
import { createError } from "../../utils/createError";
import { UploadToS3 } from "../../utils/s3Bucket";
import { ReturnUserWithProfile } from "../generics";
import { Upload } from "../scalars";

@InputType()
class InputSetupProfile {
  @Field()
  mobileNumber: string;
  @Field()
  username: string;

  @Field()
  firstName: string;
  @Field({ nullable: true })
  middleName: string;
  @Field()
  lastName: string;

  @Field({ nullable: true })
  nickname: string;
  @Field({ nullable: true })
  bio: string;

  @Field(() => Upload, { nullable: true })
  display_image?: FileUpload;

  @Field(() => Upload, { nullable: true })
  banner_image?: FileUpload;

  @Field({})
  birthday: Date;
}

@InputType()
class InputCheckUnique {
  @Field({ nullable: true })
  username: string;
  @Field({ nullable: true })
  mobile_number: string;
}

@Resolver()
export class ProfileResolver {
  @Mutation(() => ReturnUserWithProfile)
  async setupProfile(
    @Arg("input")
    {
      birthday,
      display_image,
      bio,
      banner_image,
      firstName,
      lastName,
      middleName,
      nickname,
      username,
      mobileNumber,
    }: InputSetupProfile,
    @Ctx("user") { id }: User
  ): Promise<ReturnUserWithProfile> {
    if (!id) {
      return {
        status: 0,
        errors: [createError("user", "user doesnt exist")],
      };
    }
    // const userRepo = getRepository(User);

    // const user = await userRepo
    //   .createQueryBuilder("user")
    //   .leftJoinAndSelect(`user.profile`, `profile`)
    //   .where("user.id = :id", { id })
    //   .getOne();
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (user?.profile !== null) {
      return {
        status: 0,
        errors: [createError("profile", "profile already exist")],
      };
    }

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        username,
        mobile_number: mobileNumber,
      })
      .where("id=:id", { id })
      .execute();

    const profileRepo = getRepository(Profile);
    let display_image_name;
    if (display_image) {
      display_image_name = await UploadToS3(display_image);
    }
    let banner_image_name;
    if (banner_image) {
      banner_image_name = await UploadToS3(banner_image);
    }

    const profile = profileRepo.create({
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      display_image: display_image_name,
      banner_image: banner_image_name,
      bio,
      nickname,
      birthday,
      user,
    });

    await profileRepo.save(profile);

    // const userWithProfile = await userRepo
    //   .createQueryBuilder("user")
    //   .leftJoinAndSelect(`user.profile`, `profile`)
    //   .where("user.id = :id", { id })
    //   .getOne();

    const userWithProfile = await User.findOne({ where: { id } });

    return {
      status: 1,
      user: userWithProfile,
    };
  }

  @Query(() => Boolean)
  async checkUnique(
    @Arg("input", { nullable: true }) input: InputCheckUnique
  ): Promise<Boolean> {
    const { mobile_number, username } = input;
    const userRepo = getRepository(User);

    if (username) {
      const user = await userRepo
        .createQueryBuilder("user")
        .where({ username })
        .getOne();

      if (user) {
        return false;
      }
    }

    if (mobile_number) {
      const user = await userRepo
        .createQueryBuilder("user")
        .where({ mobile_number })
        .getOne();

      if (user) {
        return false;
      }
    }

    // Check for username uniqueness
    return true;
  }

  @Query(() => ReturnUserWithProfile)
  async getProfile(
    @Arg("username") username: string
  ): Promise<ReturnUserWithProfile> {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    // const user = await getRepository(User)
    //   .createQueryBuilder("user")
    //   .leftJoinAndSelect(`user.profile`, `profile`)
    //   .where("user.username = :username", { username })
    //   .getOne();

    if (!user) {
      return {
        status: 0,
        errors: [createError("profile", `User doesn't exist`)],
      };
    }

    return {
      status: 1,
      user: user,
    };
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users = User.find();
    return users;
  }
}
