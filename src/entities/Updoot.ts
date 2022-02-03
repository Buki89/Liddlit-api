import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

// m to n
// many to many
// user <-> posts
// user -> join table <- posts
// user -> updoot <- posts

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
  @Field()
  @Column({ type: "int" })
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.updoots)
  user: User;

  @Field()
  @PrimaryColumn()
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.updoots, { onDelete: "CASCADE" })
  post: Post;
}

//MIKROORM
// @ObjectType()
// @Entity()
// export class Post {
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
//   @Property({ type: "text" })
//   title!: string;
// }
