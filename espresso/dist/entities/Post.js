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
exports.Post = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const scalars_1 = require("../graphql/scalars");
const S3File_1 = require("../graphql/scalars/S3File");
const User_1 = require("./User");
const UserPostLike_1 = require("./UserPostLike");
let Post = class Post extends typeorm_1.BaseEntity {
    async likes({ userPostLikeDataloader }) {
        return await userPostLikeDataloader.load(this.id);
    }
};
__decorate([
    type_graphql_1.Field(() => scalars_1.EncryptedID),
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", default: 1 }),
    __metadata("design:type", Number)
], Post.prototype, "is_active", void 0);
__decorate([
    type_graphql_1.Field(() => S3File_1.S3File, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "media", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.post, { nullable: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => [UserPostLike_1.UserPostLike]),
    typeorm_1.OneToMany(() => UserPostLike_1.UserPostLike, (upl) => upl.post),
    __metadata("design:type", Array)
], Post.prototype, "userConnection", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "created_at" }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn({ name: "updated_at" }),
    __metadata("design:type", Date)
], Post.prototype, "UpdatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User], { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Post.prototype, "likes", null);
Post = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map