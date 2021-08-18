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
exports.ResfrsehTokenResolver = void 0;
const type_graphql_1 = require("type-graphql");
const utils_1 = require("../../utils");
const generics_1 = require("../generics");
let ReturnFreshToken = class ReturnFreshToken extends generics_1.ReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ReturnFreshToken.prototype, "fresh_token", void 0);
ReturnFreshToken = __decorate([
    type_graphql_1.ObjectType()
], ReturnFreshToken);
let InputGetFreshToken = class InputGetFreshToken {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputGetFreshToken.prototype, "refresh_token", void 0);
InputGetFreshToken = __decorate([
    type_graphql_1.InputType()
], InputGetFreshToken);
let ResfrsehTokenResolver = class ResfrsehTokenResolver {
    async getFreshToken(input) {
        const { refresh_token } = input;
        const decrypted = utils_1.verifyRefreshToken(refresh_token);
        if (!decrypted) {
        }
        return {
            message: `Success`,
            status: 1,
            fresh_token: utils_1.signAccessToken(decrypted !== "RESFRSEH_TOKEN_EXPIRE" && decrypted.user),
        };
    }
};
__decorate([
    type_graphql_1.Mutation(() => ReturnFreshToken),
    __param(0, type_graphql_1.Arg("input", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputGetFreshToken]),
    __metadata("design:returntype", Promise)
], ResfrsehTokenResolver.prototype, "getFreshToken", null);
ResfrsehTokenResolver = __decorate([
    type_graphql_1.Resolver()
], ResfrsehTokenResolver);
exports.ResfrsehTokenResolver = ResfrsehTokenResolver;
//# sourceMappingURL=RefreshTokenResolver.js.map