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
exports.UserPostLike = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const scalars_1 = require("../graphql/scalars");
const Post_1 = require("./Post");
const User_1 = require("./User");
let UserPostLike = class UserPostLike extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => scalars_1.EncryptedID),
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], UserPostLike.prototype, "id", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], UserPostLike.prototype, "userId", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], UserPostLike.prototype, "postId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Post_1.Post, (post) => post.userConnection, { primary: true }),
    typeorm_1.JoinColumn({ name: "postId" }),
    __metadata("design:type", Post_1.Post)
], UserPostLike.prototype, "post", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.postConnection, { primary: true }),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", User_1.User)
], UserPostLike.prototype, "user", void 0);
UserPostLike = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], UserPostLike);
exports.UserPostLike = UserPostLike;
//# sourceMappingURL=UserPostLike.js.map