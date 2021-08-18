import { GraphQLScalarType } from "graphql";
import { ast } from "../../types";

const partialS3Link = `http://localhost:5001/public/`;
export const S3File = new GraphQLScalarType({
  name: "S3File",
  description: "Scalar for files uploaded in Amazon S3",
  serialize(value: string | number): string {
    // check the type of received value
    return `${partialS3Link}${value}`; // value sent to the client
  },
  parseValue(value: string) {
    // check the type of received value
    return value; // value from the client
  },
  parseLiteral(ast): string {
    // check the type of received value
    const { value } = ast as ast;
    return value; // value from the client query
    // return ast.value
  },
});
