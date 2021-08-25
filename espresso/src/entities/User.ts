import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EncryptedID } from "../graphql/scalars";
import { Comments } from "./Comments";
import { Post } from "./Post";
import { Profile } from "./Profile";
import { RefreshToken } from "./RefreshToken";
import { UserPostLike } from "./UserPostLike";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  mobile_number: string;

  @Column({ length: "255", nullable: true })
  password: string;

  @Column({ type: "tinyint", default: 1 })
  is_active: number;

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToOne(() => RefreshToken, (refresh_token) => refresh_token.user)
  refresh_token: RefreshToken;

  @OneToMany(() => UserPostLike, (upl) => upl.post)
  postConnection: UserPostLike[];
  // postConnection: Promise<UserPostLike[]>;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  UpdatedAt!: Date;

  @Field(() => Comments, { nullable: true })
  @OneToMany(() => Comments, (comments) => comments.user, { nullable: true })
  comments: Comments[];
}
