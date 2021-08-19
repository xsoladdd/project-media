"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const RefreshToken_1 = require("./entities/RefreshToken");
const graphql_upload_1 = require("graphql-upload");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/graphql", graphql_upload_1.graphqlUploadExpress({ maxFieldSize: 10000000, maxFiles: 10 }));
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "/../assets/images")));
app.post("/refreshToken", async (req, res) => {
    const { refresh_token, user_id } = req.body;
    const decrypted = utils_1.verifyRefreshToken(refresh_token);
    if (decrypted === "RESFRSEH_TOKEN_EXPIRE") {
        const decrypted_user_id = parseInt(utils_1.decrypt(user_id));
        if (decrypted_user_id === NaN) {
            return res.json({
                message: `Invalid user id: Decryption Failed`,
                status: 0,
            });
        }
        const user = await typeorm_1.getRepository(User_1.User).findOne({ id: decrypted_user_id });
        if (!user) {
            return res.json({
                message: `No user found with the user_id given`,
                status: 0,
            });
        }
        const refreshTokenRepo = typeorm_1.getRepository(RefreshToken_1.RefreshToken);
        await refreshTokenRepo
            .createQueryBuilder()
            .delete()
            .from(RefreshToken_1.RefreshToken)
            .where("userId = :id", { id: user.id })
            .execute();
        const rt = utils_1.signRefreshToken(user);
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
            fresh_token: utils_1.signAccessToken(user),
            resfresh_token: rt,
        });
    }
    return res.json({
        message: `Success`,
        status: 1,
        fresh_token: utils_1.signAccessToken(decrypted.user),
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map