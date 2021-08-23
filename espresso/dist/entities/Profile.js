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
exports.Profile = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const scalars_1 = require("../graphql/scalars");
const S3File_1 = require("../graphql/scalars/S3File");
const User_1 = require("./User");
let Profile = class Profile extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => scalars_1.EncryptedID),
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({}),
    __metadata("design:type", String)
], Profile.prototype, "first_name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "middle_name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Profile.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Profile.prototype, "birthday", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "nickname", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    type_graphql_1.Field(() => S3File_1.S3File, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "banner_image", void 0);
__decorate([
    type_graphql_1.Field(() => S3File_1.S3File, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "display_image", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Profile.prototype, "userId", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_1.User, (user) => user.profile),
    typeorm_1.JoinColumn({}),
    __metadata("design:type", User_1.User)
], Profile.prototype, "user", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "created_at" }),
    __metadata("design:type", Date)
], Profile.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: "updated_at" }),
    __metadata("design:type", Date)
], Profile.prototype, "UpdatedAt", void 0);
Profile = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map