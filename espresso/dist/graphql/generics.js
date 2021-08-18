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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputEncryptedID = exports.ReturnProfile = exports.ReturnUserWithProfile = exports.ErrorReturnStructure = exports.ReturnStructure = void 0;
const type_graphql_1 = require("type-graphql");
const Profile_1 = require("../entity/Profile");
const User_1 = require("../entity/User");
const scalars_1 = require("./scalars");
let ReturnStructure = class ReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ReturnStructure.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ReturnStructure.prototype, "status", void 0);
ReturnStructure = __decorate([
    type_graphql_1.ObjectType()
], ReturnStructure);
exports.ReturnStructure = ReturnStructure;
let ErrorReturnStructure = class ErrorReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ErrorReturnStructure.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ErrorReturnStructure.prototype, "status", void 0);
ErrorReturnStructure = __decorate([
    type_graphql_1.ObjectType()
], ErrorReturnStructure);
exports.ErrorReturnStructure = ErrorReturnStructure;
let ReturnUserWithProfile = class ReturnUserWithProfile extends ReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], ReturnUserWithProfile.prototype, "user", void 0);
ReturnUserWithProfile = __decorate([
    type_graphql_1.ObjectType()
], ReturnUserWithProfile);
exports.ReturnUserWithProfile = ReturnUserWithProfile;
let ReturnProfile = class ReturnProfile extends ReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => Profile_1.Profile, { nullable: true }),
    __metadata("design:type", Profile_1.Profile)
], ReturnProfile.prototype, "profile", void 0);
ReturnProfile = __decorate([
    type_graphql_1.ObjectType()
], ReturnProfile);
exports.ReturnProfile = ReturnProfile;
let InputEncryptedID = class InputEncryptedID {
};
__decorate([
    type_graphql_1.Field(() => scalars_1.EncryptedID),
    __metadata("design:type", String)
], InputEncryptedID.prototype, "id", void 0);
InputEncryptedID = __decorate([
    type_graphql_1.InputType()
], InputEncryptedID);
exports.InputEncryptedID = InputEncryptedID;
//# sourceMappingURL=generics.js.map