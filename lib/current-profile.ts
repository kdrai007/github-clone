import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });
  if (!profile) return null;
  return profile;
};
