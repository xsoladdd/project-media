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
exports.Comments = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const scalars_1 = require("../graphql/scalars");
let Comments = class Comments {
};
__decorate([
    type_graphql_1.Field(() => scalars_1.EncryptedID),
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Comments.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({}),
    __metadata("design:type", String)
], Comments.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Comments.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", default: 1 }),
    __metadata("design:type", Number)
], Comments.prototype, "is_active", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "created_at" }),
    __metadata("design:type", Date)
], Comments.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: "updated_at" }),
    __metadata("design:type", Date)
], Comments.prototype, "UpdatedAt", void 0);
Comments = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Comments);
exports.Comments = Comments;
//# sourceMappingURL=Comments.js.map