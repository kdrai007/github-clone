"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../tooltip-action";
import { useModal } from "@/hooks/use-model-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="add a server">
        <button
          className="flex items-center group"
          onClick={() => onOpen("createServer")}
        >
          <div className="flex w-[48px] h-[48px] mx-3 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
