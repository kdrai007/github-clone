"use client";
import { useEffect, useState } from "react";

import { CreateServerModal } from "../models/create-server-modal";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
    </>
  );
};
