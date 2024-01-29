import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { Separator } from "../ui/separator";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerHeader } from "@/components/server/server-header";
import { SearchServer } from "./search-server";
import { ServerSection } from "./server-section";
import { channel } from "diagnostics_channel";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />,
};
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-rose-400" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  const textChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const videoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const audioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );
  if (!server) return redirect("/");

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <SearchServer
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannel?.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: audioChannel?.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannel?.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  icon: roleIconMap[member.role],
                  name: member.profile.name,
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannel?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channel"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />

            <div className="space-y-2">
              {textChannel.map((channel) => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannel?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channel"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-2">
              {audioChannel.map((channel) => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}

        {!!videoChannel?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channel"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-2">
              {videoChannel.map((channel) => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="member"
              server={server}
              role={role}
              label="Members"
            />
            {members.map((member) => (
              <ServerMember member={member} server={server} key={member.id} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
