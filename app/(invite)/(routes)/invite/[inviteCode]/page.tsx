import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn, redirectToSignIn } from "@clerk/nextjs";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

const InviteCodePage = async ({
  params,
}: {
  params: { inviteCode: string };
}) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  if (!params.inviteCode) {
    return redirect("/");
  }
  const existingMember = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingMember) {
    return redirect(`/server/${existingMember.id}`);
  }
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });
  if (server) return redirect(`/server/${server.id}`);
  return <div>invite page</div>;
};

export default InviteCodePage;
