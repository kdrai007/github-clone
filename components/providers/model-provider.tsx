"use client";
import { useEffect, useState } from "react";

import { CreateServerModal } from "../models/create-server-modal";
import { InviteModal } from "../models/invite-server-modal";
import { EditServerModal } from "../models/edit-server-modal";
import { ManageServerModal } from "../models/manage-server-modal";
import { CreateChannelModal } from "../models/create-channel-modal";
import { LeaveServerModal } from "../models/leave-server-modal";
import { DeleteServerModal } from "../models/delete-server-modal";
import { DeleteServerChannel } from "../models/delete-channel-server";
import { UpdateChannelModal } from "../models/update-channel-modal";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <ManageServerModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteServerChannel />
      <UpdateChannelModal />
    </>
  );
};
