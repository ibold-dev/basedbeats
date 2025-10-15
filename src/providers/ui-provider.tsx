"use client";

import * as React from "react";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider
        placement="top-right"
        toastProps={{
          radius: "none",
          size: "sm",
        }}
      />
      {children}
    </HeroUIProvider>
  );
}
