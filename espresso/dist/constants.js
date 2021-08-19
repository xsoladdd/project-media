"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_S3_BASE_URL = exports.isProduction = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
dotenv_1.config();
exports.isProduction = process.env.NODE_ENV === "production";
exports.AWS_S3_BASE_URL = process.env.AWS_S3_BASE_URL || path_1.default.join(__dirname, "/../assets/images/");
//# sourceMappingURL=constants.js.map