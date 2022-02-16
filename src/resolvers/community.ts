import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Community } from "../entities/Community";
import { isAuth } from "../middleware/isAuth";

@Resolver(Community)
export class CommunityResolver {
  @Query(() => Community, { nullable: true })
  community(@Arg("id", () => Int) id: number): Promise<Community | undefined> {
    return Community.findOne(id);
  }

  @Query(() => [Community], { nullable: true })
  async allComunnities(
    @Arg("ids", () => [Int], { nullable: true }) ids: number[]
  ): Promise<Community | Community[] | undefined> {
    if (ids) {
      return Community.findByIds(ids);
    }
    return Community.find();
  }

  @Mutation(() => Community)
  @UseMiddleware(isAuth)
  async createCommunity(
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): Promise<Community> {
    return Community.create({
      creatorId: req.session.userId,
      name,
    }).save();
  }
}
