import express from "express";
import cors from "cors";
// import moduleName from "graph";
import {
  decrypt,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./utils";
import { getRepository } from "typeorm";
import { User } from "./entities/User";
import { RefreshToken } from "./entities/RefreshToken";
import { graphqlUploadExpress } from "graphql-upload";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFieldSize: 10000000, maxFiles: 10 })
);
app.use("/public", express.static(path.join(__dirname, "/../assets/images")));

app.post("/refreshToken", async (req, res) => {
  const { refresh_token, user_id } = req.body;
  const decrypted = verifyRefreshToken(refresh_token);

  // If user is exist, refrseh token is good and not expired
  // Return if refrseh token is bad

  if (decrypted === "RESFRSEH_TOKEN_EXPIRE") {
    console.log("REFRESH_TOKEN_EXPIRE");

    const decrypted_user_id = parseInt(decrypt(user_id));
    if (decrypted_user_id === NaN) {
      return res.json({
        message: `Invalid user id: Decryption Failed`,
        status: 0,
      });
    }

    // Create new refresh token via user_id json data
    const user = await User.findOne({
      id: decrypted_user_id,
    });
    if (!user) {
      return res.json({
        message: `No user found with the user_id given`,
        status: 0,
      });
    }
    const refreshTokenRepo = getRepository(RefreshToken);
    // Check if refresh token on storage
    // Delete first before inserting new one
    await refreshTokenRepo
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where("userId = :id", { id: user.id })
      .execute();
    const rt = signRefreshToken(user);
    const refresh_token = refreshTokenRepo.create({
      user,
      refresh_token: rt,
    });
    await refreshTokenRepo.save(refresh_token).catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });
    return res.json({
      message: `Success`,
      status: 1,
      fresh_token: signAccessToken(user),
      resfresh_token: rt,
    });
  }
  const decryptedUserId = parseInt(decrypt(user_id));

  if (typeof decryptedUserId !== "number") {
    return res.json({
      message: `invalid user id`,
      status: 0,
    });
  }
  console.log(decryptedUserId);

  const rt = await RefreshToken.findOne({
    where: {
      userId: decryptedUserId,
    },
  });

  if (!rt) {
    return res.json({
      message: `invalid user id`,
      status: 0,
    });
  }
  if (rt.refresh_token !== refresh_token) {
    return res.json({
      message: `invalid refresh token`,
      status: 0,
    });
  }

  return res.json({
    message: `Success`,
    status: 1,
    fresh_token: signAccessToken(decrypted.user),
  });
});

export default app;
