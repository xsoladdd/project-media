"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const authChecker_1 = __importDefault(require("./authChecker"));
const UserResolver_1 = require("./resolvers/UserResolver");
const PostResolver_1 = require("./resolvers/PostResolver");
const RefreshTokenResolver_1 = require("./resolvers/RefreshTokenResolver");
const DummyResolver_1 = require("./resolvers/DummyResolver");
const ProfileResolver_1 = require("./resolvers/ProfileResolver");
exports.default = type_graphql_1.buildSchema({
    resolvers: [
        UserResolver_1.UserResolver,
        PostResolver_1.PostResolver,
        RefreshTokenResolver_1.ResfrsehTokenResolver,
        DummyResolver_1.DummyResolver,
        ProfileResolver_1.ProfileResolver,
    ],
    authChecker: authChecker_1.default,
});
//# sourceMappingURL=index.js.map