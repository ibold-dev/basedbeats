"use client";

import React from "react";
import { BottomNavigation } from "./bottom-navigation";
import { BottomPlayer } from "./bottom-player";
import { useModal } from "@/providers";
import { CurrentPlaying } from "../playing";

interface BottomBarProps {
  className?: string;
}

export function BottomBar({ className }: BottomBarProps) {
  const { isModalOpen, setIsModalOpen } = useModal();
  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-t border-gray-800 px-4 py-2 safe-area-pb rounded-t-[200px]${
          className || ""
        }`}
      >
        <BottomPlayer onOpenModal={() => setIsModalOpen(true)} />
        <BottomNavigation />
      </div>
      {/* Now Playing Modal */}
      <CurrentPlaying
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
