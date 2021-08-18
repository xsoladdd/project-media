"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHash = exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const hash = async (password) => {
    const hash = await bcrypt_1.default.hash(password, saltRounds);
    return hash;
};
exports.hash = hash;
const checkHash = async (password, hashedPassword) => {
    return await bcrypt_1.default.compare(password, hashedPassword);
};
exports.checkHash = checkHash;
//# sourceMappingURL=bcrypt.js.map