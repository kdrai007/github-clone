"use client";

import qs from "query-string";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useModal } from "@/hooks/use-model-store";
import { Button } from "../ui/button";

export const DeleteServerChannel = () => {
  const router = useRouter();
  const { isOpen, type, onClose, data } = useModal();
  const { channel, server } = data;

  const isModelOpen = isOpen && type === "deleteChannel";

  const [isLoading, setisLoading] = useState(false);

  const deleteChannel = async () => {
    try {
      setisLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channel/${channel?.id}/delete`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(url);
      onClose();
      router.push(`/server/${server?.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bk-[#313338]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure you want to do delete this channel <br />
            <span className="font-semibold text-indigo-500">
              {" "}
              #{channel?.name}{" "}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              onClick={() => onClose()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={deleteChannel}
              disabled={isLoading}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
