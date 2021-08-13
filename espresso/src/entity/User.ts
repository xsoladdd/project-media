import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { EncryptedID } from "../graphql/scalars";
import { Profile } from "./Profile";
import { Post } from "./Post";
import { RefreshToken } from "./RefreshToken";

@Entity()
@ObjectType()
export class User {
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

  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToOne(() => Post, (post) => post.user)
  post: Post;

  @OneToOne(() => RefreshToken, (refresh_token) => refresh_token.user)
  refresh_token: RefreshToken;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  UpdatedAt!: Date;
}
