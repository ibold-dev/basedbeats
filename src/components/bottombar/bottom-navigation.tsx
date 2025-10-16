"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useNavigationStore } from "@/store/navigation";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useNavigationUpdate } from "@/hooks";

export function BottomNavigation() {
  useNavigationUpdate();

  const router = useRouter();

  const { activeTab, updatePath } = useNavigationStore();

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: "mynaui:home",
      activeIcon: "mynaui:home-solid",
      href: "/",
    },
    // {
    //   id: "search",
    //   label: "Search",
    //   icon: "mynaui:search",
    //   activeIcon: "mynaui:search-solid",
    //   href: "/search",
    // },
    // {
    //   id: "library",
    //   label: "Library",
    //   icon: "mynaui:layers-three",
    //   activeIcon: "mynaui:layers-three-solid",
    //   href: "/library",
    // },
    {
      id: "account",
      label: "Account",
      icon: "mynaui:user-circle",
      activeIcon: "mynaui:user-circle-solid",
      href: "/account",
    },
  ];

  return (
    <nav className="flex items-center justify-around max-w-md mx-auto">
      {tabs.map((tab) => {
        const isActive = activeTab.id === tab.id;
        const iconName = isActive ? tab.activeIcon : tab.icon;

        return (
          <Button
            radius="full"
            key={tab.id}
            onPress={() => {
              updatePath(tab.href);
              router.push(tab.href);
            }}
            variant="light"
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px] h-auto ${
              isActive
                ? "bg-gray-700/50 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <div
              className={`flex items-center justify-center w-6 h-6 mb-1 ${
                isActive && "scale-110"
              }`}
            >
              <Icon icon={iconName} className="w-6 h-6" />
            </div>
            <span
              className={`text-xs font-medium transition-colors duration-200 ${
                isActive ? "text-white" : "text-gray-400"
              }`}
            >
              {tab.label}
            </span>
          </Button>
        );
      })}
    </nav>
  );
}
