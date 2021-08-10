import express from "express";
import cors from "cors";
import refreshToken from "./rest/refreshtoken";
import { decrypt, sign, signRefreshToken, verifyRefreshToken } from "./utils";
import { getRepository } from "typeorm";
import { User } from "./entity/User";
import { RefreshToken } from "./entity/RefreshToken";

// import moment from "moment";
// import { sign } from "./utils/jwt";
const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyPa)
app.get("/", async (_, res) => {
  res.send("hello world");
});

app.post("/refreshToken", async (req, res) => {
  const { refresh_token, user_id } = req.body;
  const decrypted = verifyRefreshToken(refresh_token);

  // If user is exist, refrseh token is good and not expired
  // Return if refrseh token is bad
  if (decrypted === "RESFRSEH_TOKEN_EXPIRE") {
    const decrypted_user_id = parseInt(decrypt(user_id));
    if (decrypted_user_id === NaN) {
      return res.json({
        message: `Invalid user id: Decryption Failed`,
        status: 0,
      });
    }

    // Create new refresh token via user_id json data
    const user = await getRepository(User).findOne({ id: decrypted_user_id });
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
      fresh_token: sign(user),
      resfresh_token: rt,
    });
  }
  return res.json({
    message: `Success`,
    status: 1,
    fresh_token: sign(decrypted.user),
  });
});

export default app;
