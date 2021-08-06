import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class ReturnStructure {
  @Field(() => String)
  message: string;
  @Field(() => Int)
  status: number;
}
