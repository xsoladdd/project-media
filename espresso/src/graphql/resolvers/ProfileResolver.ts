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
import { Profile } from "../../entity/Profile";
import { User } from "../../entity/User";
import { UploadToS3 } from "../../utils/s3Bucket";
import { ReturnStructure, ReturnUserWithProfile } from "../generics";
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
  @Field(() => Upload, { nullable: true })
  display_image?: FileUpload;
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
  // Registration

  @Mutation(() => ReturnUserWithProfile)
  async setupProfile(
    @Arg("input", { nullable: true }) input: InputSetupProfile,
    @Ctx("user") { id }: User
  ): Promise<ReturnUserWithProfile> {
    if (!id) {
      return {
        message: "Invalid User ID",
        status: 0,
      };
    }
    const userRepo = getRepository(User);

    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.id = :id", { id })
      .getOne();
    console.log(user);
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
      username,
      mobileNumber,
    } = input;

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

    const profile = profileRepo.create({
      first_name: firstName,
      display_image: display_image_name,
      last_name: lastName,
      middle_name: middleName,
      nickname,
      birthday,
      user,
    });

    await profileRepo.save(profile).catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });
    const userWithProfile = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.id = :id", { id })
      .getOne();

    return {
      message: "Profile succesfully save",
      status: 1,
      user: userWithProfile,
    };
  }

  @Query(() => ReturnStructure)
  async checkUnique(
    @Arg("input", { nullable: true }) input: InputCheckUnique
  ): Promise<ReturnStructure> {
    const { mobile_number, username } = input;
    const userRepo = getRepository(User);

    if (username) {
      const user = await userRepo
        .createQueryBuilder("user")
        .where({ username })
        .getOne();

      if (user) {
        return {
          message: "Username already used",
          status: 0,
        };
      }
    }

    if (mobile_number) {
      const user = await userRepo
        .createQueryBuilder("user")
        .where({ mobile_number })
        .getOne();

      if (user) {
        return {
          message: "Mobile number already used",
          status: 0,
        };
      }
    }

    // Check for username uniqueness
    return {
      message: "Data unique",
      status: 1,
    };
  }

  @Query(() => ReturnUserWithProfile)
  async getProfile(
    @Arg("input", { nullable: false }) username: string
  ): Promise<ReturnUserWithProfile> {
    console.log(username);

    const userRepo = getRepository(User);

    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect(`user.profile`, `profile`)
      .where("user.username = :username", { username })
      .getOne();
    if (!user) {
      return {
        message: "Error. No profile found",
        status: 0,
        // profile: selectedProfile,
      };
    }

    return {
      message: "Success",
      status: 1,
      user,
    };
  }
}
