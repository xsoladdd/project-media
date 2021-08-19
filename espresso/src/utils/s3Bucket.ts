import { createWriteStream, unlink } from "fs";
import { FileUpload } from "graphql-upload";
import { v4 } from "uuid";
import { AWS_S3_BASE_URL } from "../constants";
import { getFileExtension } from "./files";
// import stream from "stream";

export const UploadToS3 = async (file: FileUpload) => {
  const { createReadStream, filename } = await file;
  const stream = createReadStream();
  console.log(`File name: `, filename);
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
  // console.log(file.createReadStream);
  // return new Promise(async (resolve, reject) => {
  //   new stream.PassThrough()
  //     .pipe(createWriteStream(__dirname + `/../../../images/${file.filename}`))
  //     .on("finish", () => resolve(true))
  //     .on("error", () => reject(false));
  // });

  // const S3 = new AWS.S3({
  //   s3ForcePathStyle: true,
  //   accessKeyId: "S3RVER", // This specific key is required when working offline
  //   secretAccessKey: "S3RVER",
  //   endpoint: new AWS.Endpoint("http://localhost:4569"),
  // });
  // S3.putObject(
  //   {
  //     Bucket: "local-bucket",
  //     Key: "1234",
  //     Body: new Buffer("abcd"),
  //   },
  //   () => {}
  // );
};

// export const s3hook = (event, context) =>{
//     console.log(JSON.stringify(event));
//     console.log(JSON.stringify(context));
// }
