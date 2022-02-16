import DataLoader from "dataloader";
import { Vote } from "../vote";

export const createUpdootLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Vote | null>(
    async (keys) => {
      const updoots = await Vote.findByIds(keys as any);
      const updootIdsToUpdoot: Record<string, Vote> = {};
      updoots.forEach((updoot) => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      return keys.map(
        (key) => updootIdsToUpdoot[`${key.userId}|${key.postId}`]
      );
    }
  );
