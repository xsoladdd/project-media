"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const path_1 = __importDefault(require("path"));
const User_1 = require("../entities/User");
const Profile_1 = require("../entities/Profile");
const RefreshToken_1 = require("../entities/RefreshToken");
const Post_1 = require("../entities/Post");
const Comments_1 = require("../entities/Comments");
const UserPostLike_1 = require("../entities/UserPostLike");
dotenv_1.config();
exports.default = typeorm_1.createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: !constants_1.isProduction,
    entities: [User_1.User, Profile_1.Profile, Comments_1.Comments, Post_1.Post, RefreshToken_1.RefreshToken, UserPostLike_1.UserPostLike],
    migrations: [path_1.default.join(__dirname + `../migration/**/*.ts`)],
});
//# sourceMappingURL=typeorm.js.map