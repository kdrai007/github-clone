import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 404 });

    const { name, imageUrl } = await req.json();

    const serverId = params.serverId;
    if (!serverId) return new NextResponse("No Server Id", { status: 400 });
    const server = await db.server.findUnique({
      where: {
        id: serverId,
      },
    });
    if (server?.name === name && server?.imageUrl === imageUrl) {
      return new NextResponse("Same Data", { status: 400 });
    }

    const updateServer = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(updateServer);
  } catch (error) {
    console.log("[ServerId_Error]", error);
    return new NextResponse("Interal Server Error", { status: 500 });
  }
}
