"use client";

import React from "react";
import { TopBarData } from "./top-bar-data";
import { TopBarTabs } from "./top-bar-tabs";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-gray-800 ${
        className || ""
      }`}
    >
      <TopBarData />
      <TopBarTabs />
    </div>
  );
}
