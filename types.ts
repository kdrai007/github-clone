import { Member, Profile, Server } from "@prisma/client";

export type ServerWithAndProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
