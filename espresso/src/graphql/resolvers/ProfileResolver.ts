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
class InputProfile {
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
}
@InputType()
class InputUniqueData extends InputProfile {
  @Field()
  mobileNumber: string;

  @Field()
  username: string;

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
    }: InputUniqueData,
    @Ctx("user") { id }: User
  ): Promise<ReturnUserWithProfile> {
    if (!id) {
      return {
        status: 0,
        errors: [createError("user", "user doesnt exist")],
      };
    }

    const user = await User.findOne({
      relations: ["profile"],
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

    const userWithProfile = await User.findOne({ where: { id } });

    return {
      status: 1,
      user: userWithProfile,
    };
  }

  @Mutation(() => ReturnUserWithProfile)
  async updateProfile(
    @Arg("input")
    { bio, firstName, lastName, middleName, nickname }: InputProfile,
    @Ctx("user") { id }: User
  ): Promise<ReturnUserWithProfile> {
    if (!id) {
      return {
        status: 0,
        errors: [createError("user", "user doesnt exist")],
      };
    }

    const update = await Profile.update(
      {
        userId: id,
      },
      {
        bio,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        nickname,
      }
    );

    if (update.affected === 0) {
      return {
        status: 0,
        errors: [createError("profile", "updating profile failed")],
      };
    }
    const user = await User.findOne({ where: { id } });

    return {
      status: 1,
      user,
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

  @Mutation(() => ReturnUserWithProfile)
  async uploadProfilePicture(
    @Arg("profilePicture", () => Upload) profilePicture: FileUpload,
    @Ctx("user") { id }: User
  ): Promise<ReturnUserWithProfile> {
    let profilePictureName = "";
    if (profilePicture) {
      profilePictureName = await UploadToS3(profilePicture);
    }
    const update = await Profile.update(
      {
        userId: id,
      },
      {
        display_image: profilePictureName,
      }
    );
    if (update.affected === 0) {
      return {
        status: 0,
        errors: [createError("profile", "something went wrong")],
      };
    }
    const user = await User.findOne({
      relations: ["profile"],
      where: {
        id,
      },
    });
    if (!user) {
      return {
        status: 0,
        errors: [createError("user", "no user found")],
      };
    }
    return {
      status: 1,
      user,
    };
  }

  @Mutation(() => ReturnUserWithProfile)
  async uploadProfileBanner(
    @Arg("profileBanner", () => Upload) profileBanner: FileUpload,
    @Ctx("user") { id }: User
  ): Promise<ReturnUserWithProfile> {
    let profileBannerName = "";
    if (profileBanner) {
      profileBannerName = await UploadToS3(profileBanner);
    }
    const update = await Profile.update(
      {
        userId: id,
      },
      {
        banner_image: profileBannerName,
      }
    );
    if (update.affected === 0) {
      return {
        status: 0,
        errors: [createError("profile", "something went wrong")],
      };
    }
    const user = await User.findOne({
      relations: ["profile"],
      where: {
        id,
      },
    });
    if (!user) {
      return {
        status: 0,
        errors: [createError("user", "no user found")],
      };
    }
    return {
      status: 1,
      user,
    };
  }
}
