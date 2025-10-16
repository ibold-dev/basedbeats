"use client";

import React from "react";
import { Button } from "@heroui/react";

interface TopBarTabsProps {
  className?: string;
}

export function TopBarTabs({ className }: TopBarTabsProps) {
  const tabs = [
    "Top Picks",
    // "Explore",
    // "Charts",
    // "Weekly",
    // "Chi",
    // "Trending",
    // "New Releases",
    // "Genres",
  ];

  const activeTab = "Top Picks";

  return (
    <div className={`px-4 pb-3 ${className || ""}`}>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;

          return (
            <Button
              key={tab}
              variant="light"
              size="sm"
              className={`
                flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-black/80 text-white border border-white/20 shadow-lg"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                }
              `}
            >
              {tab}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
