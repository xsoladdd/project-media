"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const utils_1 = require("../utils");
const authChecker = ({ context }) => {
    const { token } = context;
    const tokenValue = token.split(" ")[1];
    if (!tokenValue) {
        throw new apollo_server_express_1.ApolloError("Invalid authorization header, Format must be Bearer <jwt>", "BAD TOKEN");
    }
    const tokenData = utils_1.verifyAccessToken(tokenValue);
    return utils_1.isExpired(tokenData.exp);
};
exports.default = authChecker;
//# sourceMappingURL=authChecker.js.map