"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMusicStore } from "@/store/music";
import { useAudioProgress } from "@/hooks";

interface CurrentPlayingProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CurrentPlaying({ isOpen, onClose }: CurrentPlayingProps) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    togglePlayPause,
    seekTo,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
    isShuffled,
    repeatMode,
  } = useMusicStore();

  // Update progress every second when playing
  useAudioProgress();

  const duration = currentTrack?.duration || 0;

  if (!isOpen || !currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/20" />

      {/* Main content overlay */}
      <div className="relative w-full h-full bg-gray-900/40 backdrop-blur-sm rounded-3xl my-4 overflow-y-auto pb-20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <Button
            variant="light"
            size="sm"
            className="text-white"
            onPress={onClose}
          >
            <Icon icon="mynaui:chevron-left" className="w-8 h-8 mr-2" />
          </Button>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Album Art */}
        <div className="flex justify-center px-8 py-4">
          <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={currentTrack.albumArt}
              alt={`${currentTrack.album} album cover`}
              fill
              className="object-cover"
            />
            {/* Parental Advisory Label */}
            {currentTrack.explicit && (
              <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded text-[8px] font-bold">
                PARENTAL ADVISORY EXPLICIT CONTENT
              </div>
            )}
          </div>
        </div>

        {/* Song Information */}
        <div className="px-8 text-center mb-6">
          <h2 className="text-white text-xl font-bold mb-2">
            {currentTrack.title}
          </h2>
          <p className="text-white text-base">
            {currentTrack.artist}, {currentTrack.album}
          </p>
        </div>

        {/* Main Playback Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            isIconOnly
            variant="light"
            size="lg"
            className={`hover:bg-white/10 ${
              isShuffled ? "text-amber-400" : "text-white"
            }`}
            onPress={toggleShuffle}
          >
            <Icon icon="mynaui:shuffle" className="w-6 h-6" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="lg"
            className="text-white hover:bg-white/10"
            onPress={previousTrack}
          >
            <Icon icon="mynaui:skip-back" className="w-6 h-6" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="lg"
            className="w-16 h-16 bg-white/20 hover:bg-white/30 text-white"
            onPress={togglePlayPause}
          >
            <Icon
              icon={isPlaying ? "mynaui:pause" : "mynaui:play"}
              className="w-8 h-8"
            />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="lg"
            className="text-white hover:bg-white/10"
            onPress={nextTrack}
          >
            <Icon icon="mynaui:skip-forward" className="w-6 h-6" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="lg"
            className={`hover:bg-white/10 ${
              repeatMode !== "none" ? "text-amber-400" : "text-white"
            }`}
            onPress={toggleRepeat}
          >
            <Icon
              icon={
                repeatMode === "one" ? "mynaui:repeat-solid" : "mynaui:repeat"
              }
              className="w-6 h-6"
            />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-8 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-white text-sm">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 relative cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                const newTime = percentage * duration;
                seekTo(newTime);
              }}
            >
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div
                  className="bg-amber-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Progress handle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{ left: `calc(${progress}% - 8px)` }}
              />
            </div>
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center justify-center gap-8 px-8 pb-8">
          <Button
            isIconOnly
            variant="light"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            <Icon icon="mynaui:equalizer" className="w-6 h-6" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            <Icon icon="mynaui:share" className="w-6 h-6" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            <Icon icon="mynaui:heart" className="w-6 h-6" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            <Icon icon="mynaui:dots-horizontal" className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
