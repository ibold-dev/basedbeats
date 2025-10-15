import { useEffect } from "react";
import { useMusicStore } from "@/store/music";

export function useAudioProgress() {
  const { isPlaying, updateCurrentTime } = useMusicStore();

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      updateCurrentTime();
    }, 50); // Update

    return () => clearInterval(interval);
  }, [isPlaying, updateCurrentTime]);
}
