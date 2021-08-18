"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const dotenv_1 = require("dotenv");
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.config();
const encrypt = (toEncrypt) => {
    const algorithm = "aes-256-cbc";
    const password = process.env.SECRET_KEY;
    if (!password) {
        return "";
    }
    let key = crypto_1.default
        .createHash("md5")
        .update(password, "utf8")
        .digest("hex")
        .toUpperCase();
    let iv = Buffer.alloc(16);
    let encrypt = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encrypted = encrypt.update(`${toEncrypt}`, "utf8", "hex");
    encrypted += encrypt.final("hex");
    return encrypted;
};
exports.encrypt = encrypt;
const decrypt = (toDecrypt) => {
    try {
        const algorithm = "aes-256-cbc";
        const password = process.env.SECRET_KEY;
        if (!password) {
            return "";
        }
        let key = crypto_1.default
            .createHash("md5")
            .update(password, "utf8")
            .digest("hex")
            .toUpperCase();
        let iv = Buffer.alloc(16);
        let decrypt = crypto_1.default.createDecipheriv(algorithm, key, iv);
        let decrypted = decrypt.update(toDecrypt, "hex", "utf8");
        decrypted += decrypt.final("utf8");
        return decrypted;
    }
    catch (err) {
        return "";
    }
};
exports.decrypt = decrypt;
//# sourceMappingURL=crypto.js.map