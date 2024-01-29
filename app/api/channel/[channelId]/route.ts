import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name, type }: { name: string; type: ChannelType } =
      await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("ServerId missing", { status: 400 });
    if (!params.channelId)
      return new NextResponse("ChannelId missing", { status: 400 });
    if (!name || !type)
      return new NextResponse("Fill require fields", { status: 400 });
    if (name === "general") {
      return new NextResponse("Plese choose other name", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile?.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[Channel_Create", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
