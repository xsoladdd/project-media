"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.hash = void 0;
const argon2_1 = __importDefault(require("argon2"));
const hash = async (password) => {
    return await argon2_1.default.hash(password);
};
exports.hash = hash;
const verify = async (hashedPassword, plainPassword) => {
    return await argon2_1.default.verify(hashedPassword, plainPassword);
};
exports.verify = verify;
//# sourceMappingURL=argon2.js.map