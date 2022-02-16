import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../../user";
import { Community } from "../../community";

@ObjectType()
@Entity()
class Follow extends BaseEntity {
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

export default Follow;
