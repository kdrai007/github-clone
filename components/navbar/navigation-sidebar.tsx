import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../toggle-theme";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="w-full h-full flex flex-col items-center text-primary py-3 space-y-4 dark:bg-[#1e1f22] bg-[#e3e5e8]">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((s) => (
          <div key={s.id} className="mb-4">
            <NavigationItem id={s.id} name={s.name} imageUrl={s.imageUrl} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 flex items-center  flex-col gap-y-4 mt-auto">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
