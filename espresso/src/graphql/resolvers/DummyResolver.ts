import {
  hash,
  checkHash,
  signAccessToken,
  verifyAccessToken,
  isExpired,
  encrypt,
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
import { ReturnStructure } from "../generics";
import { Upload } from "../scalars";
import { FileUpload } from "graphql-upload";

@InputType()
class InputFileUpload {
  @Field(() => Upload)
  file: FileUpload;
}

@Resolver()
export class DummyResolver {
  @Mutation(() => ReturnStructure)
  async TestFileUpload(
    @Arg("input", { nullable: false }) input: InputFileUpload
  ): Promise<ReturnStructure> {
    console.log(input.file);
    return {
      message: "hey",
      status: 1,
    };
  }
}
