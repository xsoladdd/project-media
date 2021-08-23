"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLikeDataloader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const typeorm_1 = require("typeorm");
const createLikeDataloader = () => new dataloader_1.default(async (postId) => {
    const profiles = await Profile.find({
        where: {
            userId: typeorm_1.In(userIds),
        },
    });
    const userIdToProfile = {};
    profiles.forEach((u) => {
        userIdToProfile[u.userId] = u;
    });
    return userIds.map((userId) => userIdToProfile[userId]);
});
exports.createLikeDataloader = createLikeDataloader;
//# sourceMappingURL=createLikeDataloader.js.map