"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptedID = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("graphql");
const utils_1 = require("../../utils");
exports.EncryptedID = new graphql_1.GraphQLScalarType({
    name: "EncryptedID",
    description: "Crypto protocol for IDS",
    serialize(value) {
        if (typeof value !== "string") {
            return utils_1.encrypt(value.toString());
        }
        return utils_1.encrypt(value);
    },
    parseValue(value) {
        const decryptedString = utils_1.decrypt(value);
        if (!decryptedString) {
            throw new apollo_server_express_1.ApolloError("Invalid ID", "INVALID_ENCRYPTED_ID_FORMAT");
        }
        return decryptedString;
    },
    parseLiteral(ast) {
        const { value } = ast;
        const decryptedString = utils_1.decrypt(value);
        if (!decryptedString) {
            throw new apollo_server_express_1.ApolloError("Invalid ID", "INVALID_ENCRYPTED_ID_FORMAT");
        }
        return decryptedString;
    },
});
//# sourceMappingURL=EncryptedID.js.map