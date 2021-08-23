import { createWriteStream, unlink } from "fs";
import { FileUpload } from "graphql-upload";
import { v4 } from "uuid";
import { AWS_S3_BASE_URL } from "../constants";
import { getFileExtension } from "./files";

export const UploadToS3 = async (file: FileUpload) => {
  const { createReadStream, filename } = file;
  const stream = createReadStream();
  const storedFileName = `${v4()}.${getFileExtension(filename)}`;
  const storedFileUrl = AWS_S3_BASE_URL + `${storedFileName}`;
  await new Promise((resolve, reject) => {
    const writeStream = createWriteStream(storedFileUrl);
    writeStream.on("finish", resolve);
    writeStream.on("error", (error) => {
      unlink(storedFileUrl, () => {
        reject(error);
      });
    });

    stream.on("error", (error) => writeStream.destroy(error));
    stream.pipe(writeStream);
  });

  return storedFileName;
};
