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
const User_1 = require("../../entity/User");
const generics_1 = require("../generics");
const RefreshToken_1 = require("../../entity/RefreshToken");
const validation_1 = require("../../utils/validation");
let InputRegistration = class InputRegistration {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputRegistration.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputRegistration.prototype, "password", void 0);
InputRegistration = __decorate([
    type_graphql_1.InputType()
], InputRegistration);
let InputLoginNormal = class InputLoginNormal {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputLoginNormal.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputLoginNormal.prototype, "password", void 0);
InputLoginNormal = __decorate([
    type_graphql_1.InputType()
], InputLoginNormal);
let InputLoginSocialmedia = class InputLoginSocialmedia {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputLoginSocialmedia.prototype, "email", void 0);
InputLoginSocialmedia = __decorate([
    type_graphql_1.InputType()
], InputLoginSocialmedia);
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
    async registerUser(input) {
        const { email, password } = input;
        const userRepo = typeorm_1.getRepository(User_1.User);
        const userRes = await userRepo.findOne({ email });
        if (userRes) {
            return {
                message: "Email already used",
                status: 0,
            };
        }
        const user = userRepo.create({
            email,
            password: typeof password !== "undefined" ? await utils_1.hash(password) : undefined,
        });
        await userRepo.save(user).catch((err) => {
            return {
                message: err.message,
                status: 0,
            };
        });
        console.log(user);
        return {
            message: "Succesfully",
            status: 1,
            token: utils_1.signAccessToken(user),
            refresh_token: utils_1.signRefreshToken(user),
            user,
        };
    }
    async loginNormal(input) {
        const { password, email } = input;
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect(`user.profile`, `profile`)
            .where("user.email = :email", { email })
            .getOne();
        if (!user) {
            return {
                message: "Account doesn't exist",
                status: 0,
            };
        }
        if (!user.password) {
            return {
                message: "Seems like account is associated with OAuth Login.Please kindly login via that and setup password under profile -> password ",
                status: 0,
            };
        }
        if (!(await utils_1.checkHash(password, user.password))) {
            return {
                message: "Invalid password",
                status: 0,
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
        await refreshTokenRepo.save(refresh_token).catch((err) => {
            return {
                message: err.message,
                status: 0,
            };
        });
        return {
            message: "Succesfully",
            status: 1,
            token: utils_1.signAccessToken(user),
            refresh_token: rt,
            user,
        };
    }
    async oauthHandler(input) {
        const { email } = input;
        if (!validation_1.validateEmail(email)) {
            return {
                message: "INVALID EMAIL FORMAT",
                status: 0,
            };
        }
        const userRepo = typeorm_1.getRepository(User_1.User);
        const refreshTokenRepo = typeorm_1.getRepository(RefreshToken_1.RefreshToken);
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
        return {
            message: "Account succesfully created",
            status: 1,
            token: utils_1.signAccessToken(user),
            refresh_token: rt,
            user,
        };
    }
    async me({ id }) {
        const userRepo = typeorm_1.getRepository(User_1.User);
        console.log(id);
        const user = await userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect(`user.profile`, `profile`)
            .where("user.id = :id", { id })
            .getOne();
        if (!user) {
            return {
                message: "No User",
                status: 0,
            };
        }
        return {
            message: "Succsefully fetched",
            status: 1,
            user,
        };
    }
};
__decorate([
    type_graphql_1.Mutation(() => ReturnRegisterLogin),
    __param(0, type_graphql_1.Arg("input", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputRegistration]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
__decorate([
    type_graphql_1.Query(() => ReturnRegisterLogin),
    __param(0, type_graphql_1.Arg("input", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputLoginNormal]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginNormal", null);
__decorate([
    type_graphql_1.Mutation(() => ReturnRegisterLogin),
    __param(0, type_graphql_1.Arg("input", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputLoginSocialmedia]),
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
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map