"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadToS3 = void 0;
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
const files_1 = require("./files");
const UploadToS3 = async (file) => {
    const { createReadStream, filename } = file;
    const stream = createReadStream();
    const storedFileName = `${uuid_1.v4()}.${files_1.getFileExtension(filename)}`;
    const storedFileUrl = constants_1.AWS_S3_BASE_URL + `${storedFileName}`;
    await new Promise((resolve, reject) => {
        const writeStream = fs_1.createWriteStream(storedFileUrl);
        writeStream.on("finish", resolve);
        writeStream.on("error", (error) => {
            fs_1.unlink(storedFileUrl, () => {
                reject(error);
            });
        });
        stream.on("error", (error) => writeStream.destroy(error));
        stream.pipe(writeStream);
    });
    return storedFileName;
};
exports.UploadToS3 = UploadToS3;
//# sourceMappingURL=s3Bucket.js.map