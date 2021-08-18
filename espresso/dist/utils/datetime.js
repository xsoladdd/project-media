"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpired = void 0;
const moment_1 = __importDefault(require("moment"));
const isExpired = (time) => {
    const timeNow = moment_1.default().unix();
    if (timeNow < time)
        return true;
    return false;
};
exports.isExpired = isExpired;
//# sourceMappingURL=datetime.js.map