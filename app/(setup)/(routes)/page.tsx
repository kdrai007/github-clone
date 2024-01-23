import { InitialModel } from "@/components/models/initial-model";
import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const profile = await InitialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/server/${server.id}`);
  }
  return <InitialModel />;
}
