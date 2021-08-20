"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const utils_1 = require("../../utils");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entities/User");
const generics_1 = require("../generics");
const RefreshToken_1 = require("../../entities/RefreshToken");
const validation_1 = require("../../utils/validation");
const createError_1 = require("../../utils/createError");
const Profile_1 = require("../../entities/Profile");
let LoginRegistrationInput = class LoginRegistrationInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginRegistrationInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginRegistrationInput.prototype, "password", void 0);
LoginRegistrationInput = __decorate([
    type_graphql_1.InputType()
], LoginRegistrationInput);
let ReturnRegisterLogin = class ReturnRegisterLogin extends generics_1.ReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ReturnRegisterLogin.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ReturnRegisterLogin.prototype, "refresh_token", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", Object)
], ReturnRegisterLogin.prototype, "user", void 0);
ReturnRegisterLogin = __decorate([
    type_graphql_1.ObjectType()
], ReturnRegisterLogin);
let UserResolver = class UserResolver {
    async profile(user, { profileDataloader }) {
        return profileDataloader.load(user.id);
    }
    async registerUser({ email, password }) {
        if (!validation_1.validateEmail(email)) {
            return {
                status: 0,
                errors: [createError_1.createError("email", "invald email format")],
            };
        }
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = userRepo.create({
            email,
            password: await utils_1.hash(password),
        });
        try {
            await userRepo.save(user);
        }
        catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return {
                    status: 0,
                    errors: [createError_1.createError("email", "email already exist")],
                };
            }
        }
        return {
            status: 1,
            token: utils_1.signAccessToken(user),
            refresh_token: utils_1.signRefreshToken(user),
            user,
        };
    }
    async loginNormal({ email, password }) {
        if (!validation_1.validateEmail(email)) {
            return {
                status: 0,
                errors: [createError_1.createError("email", "invald email format")],
            };
        }
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect(`user.profile`, `profile`)
            .where("user.email = :email", { email })
            .getOne();
        if (!user) {
            return {
                status: 0,
                errors: [createError_1.createError("email", `account doesn't exist`)],
            };
        }
        if (!user.password) {
            return {
                status: 0,
                errors: [
                    createError_1.createError("email", `email is associated with another login method. please login using that and add password`),
                ],
            };
        }
        const isVerify = await utils_1.verify(user.password, password);
        if (!isVerify) {
            return {
                status: 0,
                errors: [createError_1.createError("password", `invalid password`)],
            };
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
        await refreshTokenRepo.save(refresh_token);
        return {
            status: 1,
            token: utils_1.signAccessToken(user),
            refresh_token: rt,
            user,
        };
    }
    async oauthHandler(email) {
        if (!validation_1.validateEmail(email)) {
            return {
                status: 0,
                errors: [createError_1.createError("email", "invald email format")],
            };
        }
        const userRepo = typeorm_1.getRepository(User_1.User);
        let user = await userRepo
            .createQueryBuilder("user")
            .where("user.email = :email", { email })
            .getOne();
        if (!user) {
            user = userRepo.create({
                email,
            });
            await userRepo.save(user).catch((err) => {
                return {
                    message: err.message,
                    status: 0,
                };
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
        await refreshTokenRepo.save(refresh_token);
        return {
            status: 1,
            token: utils_1.signAccessToken(user),
            refresh_token: rt,
            user,
        };
    }
    async me({ id }) {
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect(`user.profile`, `profile`)
            .where("user.id = :id", { id })
            .getOne();
        if (!user) {
            return {
                status: 0,
            };
        }
        return {
            status: 1,
            user,
        };
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => Profile_1.Profile, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "profile", null);
__decorate([
    type_graphql_1.Mutation(() => ReturnRegisterLogin),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRegistrationInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
__decorate([
    type_graphql_1.Mutation(() => ReturnRegisterLogin),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRegistrationInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginNormal", null);
__decorate([
    type_graphql_1.Mutation(() => ReturnRegisterLogin),
    __param(0, type_graphql_1.Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "oauthHandler", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(() => generics_1.ReturnUserWithProfile),
    __param(0, type_graphql_1.Ctx("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map