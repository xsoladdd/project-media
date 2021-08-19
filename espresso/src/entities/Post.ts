import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EncryptedID } from "../graphql/scalars";
import { User } from "./User";

@Entity()
@ObjectType()
export class Post {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  @Column({ type: "text" })
  content: string;

  @Column({ type: "tinyint", default: 1 })
  is_active: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.post, { nullable: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn({ name: "updated_at" })
  UpdatedAt!: Date;
}
