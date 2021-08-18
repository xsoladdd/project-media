"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.signRefreshToken = exports.verifyAccessToken = exports.signAccessToken = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
dotenv_1.config();
const signAccessToken = (user) => {
    const obj = {
        exp: moment_1.default().add(1, "month").unix(),
        user,
    };
    const token = jsonwebtoken_1.default.sign(obj, process.env.SECRET_KEY);
    return token;
};
exports.signAccessToken = signAccessToken;
const verifyAccessToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    return decoded;
};
exports.verifyAccessToken = verifyAccessToken;
const signRefreshToken = (user) => {
    const obj = {
        exp: moment_1.default().add(7, "days").unix(),
        user,
    };
    const token = jsonwebtoken_1.default.sign(obj, process.env.SECRET_KEY_X);
    return token;
};
exports.signRefreshToken = signRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_X);
        console.log(decoded);
        return decoded;
    }
    catch (error) {
        if (error.toString().includes("jwt expired")) {
            return "RESFRSEH_TOKEN_EXPIRE";
        }
        else {
            throw new apollo_server_core_1.ApolloError("INVALID_REFRESH_TOKEN_FORMAT", "INVALID_REFRESH_TOKEN_FORMAT");
        }
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.js.map