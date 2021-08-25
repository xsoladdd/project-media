import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EncryptedID } from "../graphql/scalars";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
@ObjectType()
export class Comments extends BaseEntity {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  @Column({ type: "text" })
  content: string;

  @Column({ type: "tinyint", default: 1 })
  is_active: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn({ name: "updated_at" })
  UpdatedAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { nullable: true })
  @JoinColumn()
  post: Post;

  @Field(() => Int)
  @Column()
  postId: number;
}
