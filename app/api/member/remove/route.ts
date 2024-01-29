import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId)
      return new NextResponse("Server Id missing", { status: 404 });

    const updatedServer = await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(updatedServer);
  } catch (error) {
    console.log("[Member_Remove]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
