"use client";

import React from "react";
import Image from "next/image";
import { Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMusicStore } from "@/store/music";

const AccountUI = () => {
  const { playTrack } = useMusicStore();

  // Mock liked songs data
  const likedSongs = [
    {
      id: "1",
      title: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face",
      duration: 248,
      explicit: true,
      likedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop&crop=face",
      duration: 200,
      explicit: false,
      likedAt: "2024-01-14",
    },
    {
      id: "3",
      title: "Starboy",
      artist: "The Weeknd",
      album: "Starboy",
      albumArt:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop&crop=face",
      duration: 230,
      explicit: true,
      likedAt: "2024-01-13",
    },
    {
      id: "4",
      title: "After Hours",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face",
      duration: 360,
      explicit: true,
      likedAt: "2024-01-12",
    },
    {
      id: "5",
      title: "Heartless",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop&crop=face",
      duration: 198,
      explicit: true,
      likedAt: "2024-01-11",
    },
    {
      id: "6",
      title: "In Your Eyes",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop&crop=face",
      duration: 237,
      explicit: false,
      likedAt: "2024-01-10",
    },
  ];

  const handleDeleteAccount = () => {
    console.log("Delete account requested");
  };

  const handleSignOut = () => {
    console.log("Sign out requested");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-[320px] mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="py-4 border-b border-gray-700">
        <h1 className="text-white text-xl font-bold">Liked Songs</h1>
        <p className="text-gray-400 text-sm">{likedSongs.length} songs</p>
      </div>

      {/* Liked Songs List - Scrollable */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="space-y-2">
          {likedSongs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer group"
              onClick={() => playTrack(song)}
            >
              {/* Track Number / Play Button */}
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-400 text-sm group-hover:hidden">
                  {index + 1}
                </span>
                <Icon
                  icon="mynaui:play"
                  className="w-4 h-4 text-white hidden group-hover:block"
                />
              </div>

              {/* Album Art */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={song.albumArt}
                  alt={`${song.album} album cover`}
                  fill
                  className="rounded-md object-cover"
                />
              </div>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  {song.artist} • {song.album}
                </p>
              </div>

              {/* Duration */}
              <div className="text-gray-400 text-xs flex-shrink-0">
                {formatTime(song.duration)}
              </div>

              {/* More Options */}
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="w-8 h-8 min-w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon
                  icon="mynaui:dots-horizontal"
                  className="w-4 h-4 text-gray-400"
                />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Account Actions - Fixed at Bottom */}
      <div className="py-4 border-t border-gray-700">
        <div className="space-y-3">
          <Button
            variant="light"
            className="w-full justify-start text-white hover:bg-gray-700"
            startContent={<Icon icon="mynaui:logout" className="w-5 h-5" />}
            onPress={handleSignOut}
          >
            Sign Out
          </Button>
          <Divider className="bg-gray-600" />
          <Button
            variant="light"
            className="w-full justify-start text-red-400 hover:bg-red-800/30"
            startContent={<Icon icon="mynaui:trash" className="w-5 h-5" />}
            onPress={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export { AccountUI };
