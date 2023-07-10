"use client";

import { useEffect } from "react";

import { UseStoreModel } from "@/hooks/use-store-model";

const SetupPage = () => {
  const onOpen = UseStoreModel((state) => state.onOpen);
  const isOpen = UseStoreModel((state) => state.isOpen);
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}

export default SetupPage;