"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { ActionTooltip } from "../tooltip-action";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();

  const handleClick = () => {
    router.push(`/server/${id}`);
  };
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        className=" group relative flex items-center"
        onClick={handleClick}
      >
        <div
          className={cn(
            "absolute left-0 rounded-r-full bg-primary transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} alt="server Image" fill />
        </div>
      </button>
    </ActionTooltip>
  );
};
