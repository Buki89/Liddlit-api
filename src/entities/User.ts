import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { Updoot } from "./Updoot";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Updoot, (updoot) => updoot.user)
  updoots: Updoot[];

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

// MIKRO ORM
// @ObjectType()
// @Entity()
// export class User {
//   @Field(() => String)
//   @PrimaryKey({ type: "uuid" })
//   id = v4();

//   @Field(() => String)
//   @Property({ type: "date" })
//   createdAt = new Date();

//   @Field(() => String)
//   @Property({ type: "date", onUpdate: () => new Date() })
//   updatedAt = new Date();

//   @Field()
//   @Property({ type: "text", unique: true })
//   username!: string;

//   @Field()
//   @Property({ type: "text", unique: true })
//   email!: string;

//   @Property({ type: "text" })
//   password!: string;
// }
