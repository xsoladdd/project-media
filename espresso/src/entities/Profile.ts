import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EncryptedID } from "../graphql/scalars";
import { S3File } from "../graphql/scalars/S3File";
import { User } from "./User";

@Entity()
@ObjectType()
export class Profile extends BaseEntity {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  @Column({})
  first_name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  middle_name?: string;

  @Field(() => String)
  @Column()
  last_name: string;

  @Field(() => Date)
  @Column()
  birthday: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  nickname: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  bio!: string;

  @Field(() => S3File, { nullable: true })
  @Column("text", { nullable: true })
  banner_image!: string;

  @Field(() => S3File, { nullable: true })
  @Column("text", { nullable: true })
  display_image!: string;

  // This will make userId column
  @Field(() => Int)
  @Column()
  userId: number;

  // This will make the relationship
  @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
  @JoinColumn({})
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  UpdatedAt!: Date;
}
