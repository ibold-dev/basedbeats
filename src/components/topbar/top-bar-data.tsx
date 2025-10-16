"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useUserStore } from "@/store/user";
import { SignInWithBase } from "../reuseable";
import { useAccount } from "wagmi";
import { formatAddress } from "@/lib";

interface TopBarDataProps {
  className?: string;
}

export function TopBarData({ className }: TopBarDataProps) {
  const { unreadCount, markAllAsRead } = useUserStore();
  const { isConnected, address } = useAccount();

  return (
    <div
      className={`flex items-center justify-between px-4 py-4 ${
        className || ""
      }`}
    >
      {/* Left: Greeting or Sign In */}
      <div>
        {isConnected && address ? (
          <h1 className="text-white text-base sm:text-xl font-medium">
            Hello {formatAddress(address)}
          </h1>
        ) : (
          <SignInWithBase />
        )}
      </div>

      {/* Right: Notification Bell */}
      <div className="relative">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="w-10 h-10 min-w-10 bg-transparent hover:bg-gray-700/50"
          onPress={markAllAsRead}
        >
          <Icon icon="mynaui:bell" className="w-6 h-6 text-white" />
        </Button>

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}
