import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    const { serverId } = params;
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId)
      return new NextResponse("Server Id missing", { status: 404 });

    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[Server_Id_Delete]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
