"use client";
import { useState } from "react";
export function useSideBar() {
  const [activeSideBar, setActiveSideBar] = useState<boolean>(true);

  const handleSideBar = (state: boolean) => {
    setActiveSideBar(state);
  };

  return { handleSideBar, activeSideBar };
}
