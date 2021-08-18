"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3File = void 0;
const graphql_1 = require("graphql");
const partialS3Link = `http://localhost:5001/public/`;
exports.S3File = new graphql_1.GraphQLScalarType({
    name: "S3File",
    description: "Scalar for files uploaded in Amazon S3",
    serialize(value) {
        return `${partialS3Link}${value}`;
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        const { value } = ast;
        return value;
    },
});
//# sourceMappingURL=S3File.js.map