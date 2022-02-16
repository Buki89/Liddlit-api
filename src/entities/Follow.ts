import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Community } from "./Community";
import { User } from "./User";

@ObjectType()
@Entity()
export class Follow extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.follow)
  user: User;

  @Field(() => Int)
  @PrimaryColumn()
  communityId: number;

  @Field(() => Community)
  @ManyToOne(() => Community, (community) => community.follow, {
    onDelete: "CASCADE",
  })
  community: Community;
}
