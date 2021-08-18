"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_S3_BASE_URL = exports.isProduction = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.isProduction = process.env.NODE_ENV === "production";
exports.AWS_S3_BASE_URL = process.env.AWS_S3_BASE_URL || `${__dirname}/assets/images/`;
//# sourceMappingURL=constants.js.map