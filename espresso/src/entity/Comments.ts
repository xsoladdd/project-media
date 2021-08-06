import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { EncryptedID } from "../graphql/scalars";

@Entity()
@ObjectType()
export class Comments {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  @Column({})
  title: string;

  @Field(() => String)
  @Column({ type: "text" })
  content: string;

  @Column({ type: "tinyint", default: 1 })
  is_active: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  UpdatedAt!: Date;
}
