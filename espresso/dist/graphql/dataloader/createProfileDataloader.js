"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileDataloader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const typeorm_1 = require("typeorm");
const Profile_1 = require("../../entities/Profile");
const createProfileDataloader = () => new dataloader_1.default(async (userIds) => {
    const profiles = await Profile_1.Profile.find({
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
exports.createProfileDataloader = createProfileDataloader;
//# sourceMappingURL=createProfileDataloader.js.map