import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { RefreshToken } from "../../entity/RefreshToken";
import { signAccessToken, verifyRefreshToken } from "../../utils";
import { ReturnStructure } from "../generics";

@ObjectType()
class ReturnFreshToken extends ReturnStructure {
  @Field(() => String, { nullable: true })
  fresh_token?: String | null;
}

@InputType()
class InputGetFreshToken implements Partial<RefreshToken> {
  @Field()
  refresh_token: string;
}

@Resolver()
export class ResfrsehTokenResolver {
  // Registration
  @Mutation(() => ReturnFreshToken)
  async getFreshToken(
    @Arg("input", { nullable: false }) input: InputGetFreshToken
  ): Promise<ReturnFreshToken> {
    const { refresh_token } = input;
    const decrypted = verifyRefreshToken(refresh_token);

    // If user is exist, refrseh token is good and not expired
    // Return if refrseh token is bad
    if (!decrypted) {
    }
    return {
      message: `Success`,
      status: 1,
      fresh_token: signAccessToken(
        decrypted !== "RESFRSEH_TOKEN_EXPIRE" && decrypted.user
      ),
    };
  }
}
