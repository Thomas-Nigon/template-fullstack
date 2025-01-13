import { InputType, ObjectType } from "type-graphql";
import { ID } from "type-graphql";
import { Field } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import argon2 from "argon2";

@InputType()
export class UserInput extends BaseEntity {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ length: 255 })
  username!: string;

  @Field()
  @Column({ length: 64, unique: true })
  email!: string;

  @Field()
  @Column({ length: 255 })
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
