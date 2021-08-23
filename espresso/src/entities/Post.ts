import { Ctx, Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EncryptedID } from "../graphql/scalars";
import { S3File } from "../graphql/scalars/S3File";
import { contextObject } from "../types";
import { User } from "./User";
import { UserPostLike } from "./UserPostLike";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  @Column({ type: "text" })
  content: string;

  @Column({ type: "tinyint", default: 1 })
  is_active: number;

  @Field(() => S3File, { nullable: true })
  @Column("text", { nullable: true })
  media!: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.post, { nullable: true })
  @JoinColumn()
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => [UserPostLike])
  @OneToMany(() => UserPostLike, (upl) => upl.post)
  userConnection: UserPostLike[];
  // userConnection: Promise<UserPostLike[]>;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn({ name: "updated_at" })
  UpdatedAt!: Date;

  @Field(() => [User], { nullable: true })
  async likes(
    @Ctx() { userPostLikeDataloader }: contextObject
  ): Promise<User[] | null> {
    return await userPostLikeDataloader.load(this.id);
  }
}
