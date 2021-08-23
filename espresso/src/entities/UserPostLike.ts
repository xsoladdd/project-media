import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
} from "typeorm";
import { EncryptedID } from "../graphql/scalars";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
@ObjectType()
export class UserPostLike extends BaseEntity {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.userConnection, { primary: true })
  @JoinColumn({ name: "postId" })
  post: Post;

  @ManyToOne(() => User, (user) => user.postConnection, { primary: true })
  @JoinColumn({ name: "userId" })
  user: User;
}
