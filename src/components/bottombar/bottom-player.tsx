"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMusicStore } from "@/store/music";
import { useModal } from "@/providers";
import { useAudioProgress } from "@/hooks";

interface BottomPlayerProps {
  className?: string;
  onOpenModal?: () => void;
}

export function BottomPlayer({ className, onOpenModal }: BottomPlayerProps) {
  const { currentTrack, isPlaying, currentTime, togglePlayPause } =
    useMusicStore();
  const { isModalOpen, setIsModalOpen } = useModal();

  // Update progress every second when playing
  useAudioProgress();

  // Show nothing if no track is playing or modal is open
  if (!currentTrack || isModalOpen) {
    return null;
  }

  const progress =
    currentTrack.duration > 0 ? (currentTime / currentTrack.duration) * 100 : 0;

  return (
    <div
      className={`bg-gray-800/95 backdrop-blur-sm rounded-lg p-3 mb-3 cursor-pointer hover:bg-gray-700/95 transition-colors ${
        className || ""
      }`}
      onClick={onOpenModal}
    >
      <div className="flex items-center gap-3">
        {/* Album Art */}
        <div className="relative flex-shrink-0">
          <Image
            src={currentTrack.albumArt}
            alt={`${currentTrack.album} album cover`}
            width={60}
            height={60}
            className="rounded-lg object-cover"
          />
          {/* Parental Advisory Label */}
          <div className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-1 rounded text-[8px] font-bold">
            PA
          </div>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm truncate">
            {currentTrack.title}
          </h3>
          <p className="text-gray-400 text-xs truncate">
            {currentTrack.artist}, {currentTrack.album}
          </p>

          {/* Progress Bar */}
          <div className="mt-2">
            <div className="w-full bg-gray-600 rounded-full h-1">
              <div
                className="bg-amber-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* More Options Button */}
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="w-8 h-8 min-w-8 bg-transparent hover:bg-gray-700/50"
          >
            <Icon
              icon="mynaui:dots-horizontal"
              className="w-5 h-5 text-white"
            />
          </Button>

          {/* Play/Pause Button */}
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="w-8 h-8 min-w-8 bg-gray-700 hover:bg-gray-600"
            onPress={() => togglePlayPause()}
          >
            <Icon
              icon={isPlaying ? "mynaui:pause" : "mynaui:play"}
              className="w-4 h-4 text-white"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
