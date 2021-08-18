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
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const generics_1 = require("../generics");
const Post_1 = require("../../entity/Post");
const User_1 = require("../../entity/User");
let InputNewPost = class InputNewPost {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputNewPost.prototype, "content", void 0);
InputNewPost = __decorate([
    type_graphql_1.InputType()
], InputNewPost);
let InputFetchPost = class InputFetchPost {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], InputFetchPost.prototype, "offset", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], InputFetchPost.prototype, "limit", void 0);
InputFetchPost = __decorate([
    type_graphql_1.InputType()
], InputFetchPost);
let ReturnPosts = class ReturnPosts extends generics_1.ReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => [Post_1.Post]),
    __metadata("design:type", Array)
], ReturnPosts.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], ReturnPosts.prototype, "has_more", void 0);
ReturnPosts = __decorate([
    type_graphql_1.ObjectType()
], ReturnPosts);
let ReturnNewPost = class ReturnNewPost extends generics_1.ReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => Post_1.Post, { nullable: true }),
    __metadata("design:type", Post_1.Post)
], ReturnNewPost.prototype, "post", void 0);
ReturnNewPost = __decorate([
    type_graphql_1.ObjectType()
], ReturnNewPost);
let PostResolver = class PostResolver {
    async newPost(input, userContext) {
        const { content } = input;
        const postRepo = typeorm_1.getRepository(Post_1.Post);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect(`user.profile`, `profile`)
            .where("user.id = :id", { id: userContext.id })
            .getOne();
        if (!user) {
            return {
                message: "No User Found",
                status: 0,
            };
        }
        const post = postRepo.create({
            content,
            user: user,
        });
        await postRepo.save(post).catch((err) => {
            return {
                message: err.message,
                status: 0,
            };
        });
        return {
            message: "Post uploaded.",
            status: 1,
            post,
        };
    }
    async fetchPost(input) {
        const postRepo = typeorm_1.getRepository(Post_1.Post);
        const posts = await postRepo
            .createQueryBuilder("post")
            .leftJoinAndSelect(`post.user`, `user`)
            .leftJoinAndSelect(`user.profile`, `profile`)
            .orderBy("post.updated_at", "DESC")
            .offset(input.offset)
            .limit(input.limit)
            .getMany();
        console.log(posts.length);
        return {
            message: "Fetching Success",
            has_more: input.limit === posts.length,
            posts: posts,
            status: 1,
        };
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => ReturnNewPost),
    __param(0, type_graphql_1.Arg("input", { nullable: false })),
    __param(1, type_graphql_1.Ctx("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputNewPost,
        User_1.User]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "newPost", null);
__decorate([
    type_graphql_1.Query(() => ReturnPosts),
    __param(0, type_graphql_1.Arg("input", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputFetchPost]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "fetchPost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=PostResolver.js.map