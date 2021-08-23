import DataLoader from "dataloader";
import { In } from "typeorm";
import { Profile } from "../../entities/Profile";

export const createProfileDataloader = () =>
  new DataLoader<number, Profile | null>(async (userIds) => {
    // Get all data
    const profiles = await Profile.find({
      where: {
        userId: In(userIds as number[]),
      },
    });

    // Craete a record object
    const userIdToProfile: Record<number, Profile> = {};

    // Sort Return array to proper keys
    // Sort data array
    profiles.forEach((u) => {
      userIdToProfile[u.userId] = u;
    });
    // Return map new array with proper structure
    return userIds.map((userId) => userIdToProfile[userId]);
  });
