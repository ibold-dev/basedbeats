"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { StackedCovers } from "./stacked-covers";

interface TrendingItem {
  id: string;
  rank: number;
  title: string;
  artist: string;
  imageUrl: string;
  artistColor?: string;
}

interface RowCoversProps {
  title: string;
  items: TrendingItem[];
  className?: string;
  showStackedCovers?: boolean;
  stackedImages?: string[];
}

export function RowCovers({
  title,
  items,
  className,
  showStackedCovers = false,
  stackedImages = [],
}: RowCoversProps) {
  return (
    <div className={`w-full pb-3 ${className || ""}`}>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <Icon
          icon="mynaui:chevron-right"
          className="w-6 h-6 text-white cursor-pointer hover:text-gray-300"
        />
      </div>

      {/* Horizontal Scrollable Row */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth min-w-0">
        {/* Trending Items */}
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0">
            {/* Card */}
            <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={item.imageUrl}
                alt={`${item.title} cover`}
                fill
                className="object-cover"
              />

              {/* Rank */}
              <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {item.rank}
                </span>
              </div>

              {/* Artist Name Overlay */}
              {item.artistColor && (
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white font-semibold text-sm truncate">
                    {item.artist}
                  </p>
                  <p
                    className="text-sm font-bold truncate"
                    style={{ color: item.artistColor }}
                  >
                    {item.title}
                  </p>
                </div>
              )}
            </div>

            {/* Title and Artist Below Card */}
            <div className="mt-2 w-40">
              <p className="text-white font-medium text-sm truncate">
                {item.title}
              </p>
              <p className="text-gray-400 text-xs truncate">{item.artist}</p>
            </div>
          </div>
        ))}

        {/* StackedCovers Component as Last Item */}
        {showStackedCovers && stackedImages.length > 0 && (
          <div className="flex-shrink-0">
            <StackedCovers
              width={160}
              height={160}
              images={stackedImages}
              className="rounded-xl"
            />
            <div className="mt-2 w-40">
              <p className="text-white font-medium text-sm truncate">
                More Albums
              </p>
              <p className="text-gray-400 text-xs truncate">Tap to explore</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
