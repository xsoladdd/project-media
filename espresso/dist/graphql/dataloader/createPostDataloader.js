"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostDataloader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const createPostDataloader = () => new dataloader_1.default(async (userIds) => {
    console.log(userIds);
    const userIdToProfile = {};
    return userIds.map((userId) => userIdToProfile[userId]);
});
exports.createPostDataloader = createPostDataloader;
//# sourceMappingURL=createPostDataloader.js.map