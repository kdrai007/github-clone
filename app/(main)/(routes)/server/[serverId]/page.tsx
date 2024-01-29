import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

const ServerPage = async ({ params }: { params: { serverId: string } }) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
      },
    },
  });
  const channel = server?.channels[0];
  if (!channel) {
    return null;
  }
  redirect(`/server/${server.id}/channels/${channel.id}`);
};
export default ServerPage;
