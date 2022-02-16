import { Arg, Int, Query, Resolver } from "type-graphql";
import { Follow } from "../entities/Follow";

@Resolver(Follow)
export class FollowResolver {
  @Query(() => Follow, { nullable: true })
  async follow(
    @Arg("userId", () => Int) userId: number,
    @Arg("communityId", () => Int) communityId: number
  ) {
    const follow = await Follow.findOne(
      { userId, communityId },
      { relations: ["user", "community"] }
    );

    if (!follow) {
      throw new Error("follow not found");
    }

    return follow;
  }
}
