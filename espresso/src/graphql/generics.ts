import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";
import { EncryptedID } from "./scalars";

@ObjectType()
export class ReturnStructure {
  @Field(() => Int)
  status: number;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class ReturnUserWithProfile extends ReturnStructure {
  @Field(() => User, { nullable: true })
  user?: User;
}
@ObjectType()
export class ReturnUsersWithProfile extends ReturnStructure {
  @Field(() => [User], { nullable: true })
  users?: User[];
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
