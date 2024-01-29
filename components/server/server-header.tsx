"use client";

import { ServerWithAndProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  Delete,
  LogOut,
  PlusCircle,
  Settings,
  Trash2,
  User,
  UserPlus,
} from "lucide-react";
import { useModal } from "@/hooks/use-model-store";

interface ServerHeaderProps {
  server: ServerWithAndProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex items-center px-3 w-full text-sm font-semibold h-12 border-neutrai-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen("invite", { server })}
          >
            invite people
            <UserPlus className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen("editServer", { server })}
          >
            Server Settings
            <Settings className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer "
            onClick={() => onOpen("manageMember", { server })}
          >
            Manage Members
            <User className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen("createChannel")}
          >
            Create Channel
            <PlusCircle className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer text-rose-500"
            onClick={() => onOpen("deleteServer", { server: server })}
          >
            Delete Server
            <Trash2 className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer text-rose-500"
            onClick={() => onOpen("leaveServer", { server })}
          >
            Leave Server
            <LogOut className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
