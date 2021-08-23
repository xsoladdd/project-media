"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPostLikeDataloader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const typeorm_1 = require("typeorm");
const UserPostLike_1 = require("../../entities/UserPostLike");
const createUserPostLikeDataloader = () => new dataloader_1.default(async (postsId) => {
    const userPost = await UserPostLike_1.UserPostLike.find({
        join: {
            alias: "userPostLike",
            innerJoinAndSelect: {
                user: "userPostLike.user",
            },
        },
        where: {
            postId: typeorm_1.In(postsId),
        },
    });
    const userPostArray = {};
    userPost.forEach((up) => {
        if (up.postId in userPostArray) {
            userPostArray[up.postId].push(up.user);
        }
        else {
            userPostArray[up.postId] = [up.user];
        }
    });
    return postsId.map((postId) => userPostArray[postId]);
});
exports.createUserPostLikeDataloader = createUserPostLikeDataloader;
//# sourceMappingURL=createUserPostLikeDataloader.js.map