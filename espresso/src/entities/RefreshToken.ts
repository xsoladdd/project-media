import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { EncryptedID } from "../graphql/scalars";
import { User } from "./User";

@Entity()
@ObjectType()
export class RefreshToken {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  @Column({ type: "text" })
  refresh_token: string;

  @OneToOne(() => User, (user) => user.refresh_token) // specify inverse side as a second parameter
  @JoinColumn() // Specifiy who will be adding the fk
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  UpdatedAt!: Date;
}
