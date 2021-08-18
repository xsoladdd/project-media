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
exports.ProfileResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Profile_1 = require("../../entity/Profile");
const User_1 = require("../../entity/User");
const s3Bucket_1 = require("../../utils/s3Bucket");
const generics_1 = require("../generics");
const scalars_1 = require("../scalars");
let InputSetupProfile = class InputSetupProfile {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputSetupProfile.prototype, "mobileNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputSetupProfile.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputSetupProfile.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputSetupProfile.prototype, "middleName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputSetupProfile.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputSetupProfile.prototype, "nickname", void 0);
__decorate([
    type_graphql_1.Field(() => scalars_1.Upload, { nullable: true }),
    __metadata("design:type", Object)
], InputSetupProfile.prototype, "display_image", void 0);
__decorate([
    type_graphql_1.Field({}),
    __metadata("design:type", Date)
], InputSetupProfile.prototype, "birthday", void 0);
InputSetupProfile = __decorate([
    type_graphql_1.InputType()
], InputSetupProfile);
let InputCheckUnique = class InputCheckUnique {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputCheckUnique.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputCheckUnique.prototype, "mobile_number", void 0);
InputCheckUnique = __decorate([
    type_graphql_1.InputType()
], InputCheckUnique);
let ProfileResolver = class ProfileResolver {
    async setupProfile(input, { id }) {
        if (!id) {
            return {
                message: "Invalid User ID",
                status: 0,
            };
        }
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect(`user.profile`, `profile`)
            .where("user.id = :id", { id })
            .getOne();
        console.log(user);
        if ((user === null || user === void 0 ? void 0 : user.profile) !== null) {
            return {
                message: "Profile already setup",
                status: 0,
            };
        }
        const { birthday, display_image, firstName, lastName, middleName, nickname, username, mobileNumber, } = input;
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            username,
            mobile_number: mobileNumber,
        })
            .where("id=:id", { id })
            .execute();
        const profileRepo = typeorm_1.getRepository(Profile_1.Profile);
        let display_image_name;
        if (display_image) {
            display_image_name = await s3Bucket_1.UploadToS3(display_image);
        }
        const profile = profileRepo.create({
            first_name: firstName,
            display_image: display_image_name,
            last_name: lastName,
            middle_name: middleName,
            nickname,
            birthday,
            user,
        });
        await profileRepo.save(profile).catch((err) => {
            return {
                message: err.message,
                status: 0,
            };
        });
        const userWithProfile = await userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect(`user.profile`, `profile`)
            .where("user.id = :id", { id })
            .getOne();
        return {
            message: "Profile succesfully save",
            status: 1,
            user: userWithProfile,
        };
    }
    async checkUnique(input) {
        const { mobile_number, username } = input;
        const userRepo = typeorm_1.getRepository(User_1.User);
        if (username) {
            const user = await userRepo
                .createQueryBuilder("user")
                .where({ username })
                .getOne();
            if (user) {
                return {
                    message: "Username already used",
                    status: 0,
                };
            }
        }
        if (mobile_number) {
            const user = await userRepo
                .createQueryBuilder("user")
                .where({ mobile_number })
                .getOne();
            if (user) {
                return {
                    message: "Mobile number already used",
                    status: 0,
                };
            }
        }
        return {
            message: "Data unique",
            status: 1,
        };
    }
    async getProfile(username) {
        console.log(username);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect(`user.profile`, `profile`)
            .where("user.username = :username", { username })
            .getOne();
        if (!user) {
            return {
                message: "Error. No profile found",
                status: 0,
            };
        }
        return {
            message: "Success",
            status: 1,
            user,
        };
    }
};
__decorate([
    type_graphql_1.Mutation(() => generics_1.ReturnUserWithProfile),
    __param(0, type_graphql_1.Arg("input", { nullable: true })),
    __param(1, type_graphql_1.Ctx("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputSetupProfile,
        User_1.User]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "setupProfile", null);
__decorate([
    type_graphql_1.Query(() => generics_1.ReturnStructure),
    __param(0, type_graphql_1.Arg("input", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputCheckUnique]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "checkUnique", null);
__decorate([
    type_graphql_1.Query(() => generics_1.ReturnUserWithProfile),
    __param(0, type_graphql_1.Arg("input", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "getProfile", null);
ProfileResolver = __decorate([
    type_graphql_1.Resolver()
], ProfileResolver);
exports.ProfileResolver = ProfileResolver;
//# sourceMappingURL=ProfileResolver.js.map