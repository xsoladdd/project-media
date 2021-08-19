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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const scalars_1 = require("../graphql/scalars");
const Profile_1 = require("./Profile");
const Post_1 = require("./Post");
const RefreshToken_1 = require("./RefreshToken");
let User = class User {
};
__decorate([
    type_graphql_1.Field(() => scalars_1.EncryptedID),
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "mobile_number", void 0);
__decorate([
    typeorm_1.Column({ length: "255", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "is_active", void 0);
__decorate([
    type_graphql_1.Field(() => Profile_1.Profile, { nullable: true }),
    typeorm_1.OneToOne(() => Profile_1.Profile, (profile) => profile.user),
    __metadata("design:type", Profile_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    typeorm_1.OneToMany(() => Post_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "post", void 0);
__decorate([
    typeorm_1.OneToOne(() => RefreshToken_1.RefreshToken, (refresh_token) => refresh_token.user),
    __metadata("design:type", RefreshToken_1.RefreshToken)
], User.prototype, "refresh_token", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "created_at" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: "updated_at" }),
    __metadata("design:type", Date)
], User.prototype, "UpdatedAt", void 0);
User = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map