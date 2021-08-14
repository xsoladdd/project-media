import { ApolloError } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import { encrypt, decrypt } from "../../utils";
import { ast } from "../../types";
import { AWS_S3_BASE_URL } from "../../constants";

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
