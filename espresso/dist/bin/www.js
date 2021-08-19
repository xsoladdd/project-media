"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const colors_1 = __importDefault(require("colors"));
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("../app"));
const typeorm_1 = __importDefault(require("../config/typeorm"));
const graphql_1 = __importDefault(require("../graphql"));
const utils_1 = require("../utils");
const graphqlPlayground_1 = require("apollo-server-core/dist/plugin/landingPage/graphqlPlayground");
dotenv_1.config();
const PORT = process.env.PORT || 5050;
const main = async () => {
    const conn = await typeorm_1.default;
    const schema = await graphql_1.default;
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: schema,
        plugins: [graphqlPlayground_1.ApolloServerPluginLandingPageGraphQLPlayground],
        formatError: (err) => {
            if (err.message.includes("jwt expired")) {
                return new apollo_server_express_1.ApolloError("TOKEN_EXPIRE_ERROR", "TOKEN_EXPIRE_ERROR");
            }
            if (err.message.startsWith("Database Error: ")) {
                return new apollo_server_express_1.ApolloError("INTERNAL_SERVICE_ERROR");
            }
            return err;
        },
        context: ({ req }) => {
            const token = req.headers.authorization;
            const user = typeof token !== "undefined" &&
                utils_1.verifyAccessToken(token.split(" ")[1]).user;
            const context = {
                req,
                token: token || "",
                user,
            };
            return context;
        },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: app_1.default,
        cors: { origin: true, credentials: false },
    });
    app_1.default.listen(PORT, () => {
        if (conn.isConnected) {
            console.log(colors_1.default.yellow(`Database Connected`));
        }
        console.log(colors_1.default.yellow(`🚀server is running at port ${PORT}${apolloServer.graphqlPath}`));
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=www.js.map