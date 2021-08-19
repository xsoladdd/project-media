import { FileUpload } from "graphql-upload";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { decrypt, encrypt } from "../../utils";
import { ReturnStructure } from "../generics";
import { Upload } from "../scalars";

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
    console.log(input);
    return {
      status: 1,
    };
  }
  @Query(() => String)
  async getEncryptedValue(
    @Arg("id", { nullable: false }) id: string
  ): Promise<String> {
    return encrypt(id);
  }

  @Query(() => String)
  async getDecryptedValue(
    @Arg("id", { nullable: false }) id: string
  ): Promise<String> {
    return decrypt(id);
  }

  @Query(() => String)
  async ping(): Promise<String> {
    return "Ping successfull. hey thanks for the ping";
  }
}
