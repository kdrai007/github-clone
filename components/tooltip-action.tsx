"use client";

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Children } from "react";

interface TooltipActionProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "right" | "left";
  align?: "start" | "center" | "end";
}
export const ActionTooltip = ({
  label,
  children,
  side,
  align,
}: TooltipActionProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
