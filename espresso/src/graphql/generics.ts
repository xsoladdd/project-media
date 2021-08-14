import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Profile } from "../entity/Profile";
import { User } from "../entity/User";
import { EncryptedID } from "./scalars";

@ObjectType()
export class ReturnStructure {
  @Field(() => String)
  message: string;
  @Field(() => Int)
  status: number;
}

@ObjectType()
export class ErrorReturnStructure {
  @Field(() => String)
  message: string;
  @Field(() => Int)
  status: number;
}

@ObjectType()
export class ReturnUserWithProfile extends ReturnStructure {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class ReturnProfile extends ReturnStructure {
  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}

@InputType()
export class InputEncryptedID {
  @Field(() => EncryptedID)
  id: string;
}
