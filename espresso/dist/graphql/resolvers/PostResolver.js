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
const Post_1 = require("../../entities/Post");
const User_1 = require("../../entities/User");
const createError_1 = require("../../utils/createError");
const generics_1 = require("../generics");
const scalars_1 = require("../scalars");
const s3Bucket_1 = require("../../utils/s3Bucket");
const sleep_1 = require("../../utils/sleep");
let InputNewPost = class InputNewPost {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputNewPost.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(() => scalars_1.Upload, { nullable: true }),
    __metadata("design:type", Object)
], InputNewPost.prototype, "media", void 0);
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
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputFetchPost.prototype, "username", void 0);
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
let ReturnPost = class ReturnPost extends generics_1.ReturnStructure {
};
__decorate([
    type_graphql_1.Field(() => Post_1.Post, { nullable: true }),
    __metadata("design:type", Post_1.Post)
], ReturnPost.prototype, "post", void 0);
ReturnPost = __decorate([
    type_graphql_1.ObjectType()
], ReturnPost);
let PostResolver = class PostResolver {
    async newPost({ content, media }, userTest) {
        if (content.length <= 0) {
            return {
                status: 0,
                errors: [createError_1.createError("content", "content must not be empty")],
            };
        }
        console.log("userFromContext", userTest);
        const user = await User_1.User.findOne({
            relations: ["profile"],
            where: { id: 4 },
        });
        console.log("user", user);
        if (!user) {
            return {
                errors: [createError_1.createError("user", "user not found")],
                status: 0,
            };
        }
        const postRepo = typeorm_1.getRepository(Post_1.Post);
        let media_file_name;
        if (media) {
            media_file_name = await s3Bucket_1.UploadToS3(media);
        }
        const post = postRepo.create({
            content,
            media: media_file_name,
            user: user,
        });
        await postRepo.save(post);
        return {
            status: 1,
            post,
        };
    }
    async likePost(postId) {
        const post = await Post_1.Post.findOne({ id: postId });
        if (!post) {
            return {
                status: 0,
                errors: [createError_1.createError("post", "no post found")],
            };
        }
        return {
            status: 1,
            post,
        };
    }
    async fetchPost({ limit, offset, username }) {
        const posts = await Post_1.Post.find({
            relations: ["user", "user.profile"],
            where: username && {
                user: {
                    username: username,
                },
            },
            order: {
                UpdatedAt: "DESC",
            },
            skip: offset,
            take: limit,
            cache: true,
        });
        await sleep_1.sleep(500);
        return {
            has_more: limit === posts.length,
            posts: posts,
            status: 1,
        };
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => ReturnPost),
    __param(0, type_graphql_1.Arg("input", { nullable: false })),
    __param(1, type_graphql_1.Ctx("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputNewPost,
        User_1.User]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "newPost", null);
__decorate([
    type_graphql_1.Mutation(() => ReturnPost),
    __param(0, type_graphql_1.Arg("postId", () => scalars_1.EncryptedID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "likePost", null);
__decorate([
    type_graphql_1.Query(() => ReturnPosts),
    __param(0, type_graphql_1.Arg("input", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputFetchPost]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "fetchPost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=PostResolver.js.map