"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = void 0;
const getFileExtension = (fileName) => {
    const arrayHolder = fileName.split(".");
    return arrayHolder[arrayHolder.length - 1];
};
exports.getFileExtension = getFileExtension;
//# sourceMappingURL=files.js.map