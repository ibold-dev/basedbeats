import { create } from "zustand";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: number; // in seconds
  explicit?: boolean;
}

export interface MusicState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  volume: number; // 0-1
  queue: Track[];
  currentIndex: number;

  // Actions
  playTrack: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  addToQueue: (tracks: Track[]) => void;
  clearQueue: () => void;
}

const useMusicStore = create<MusicState>((set, get) => ({
  currentTrack: {
    id: "1",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    albumArt:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face",
    duration: 240, // 4 minutes
    explicit: true,
  },
  isPlaying: false,
  currentTime: 80, // 1 minute 20 seconds
  volume: 0.8,
  queue: [],
  currentIndex: 0,

  playTrack: (track: Track) => {
    set({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      currentIndex: get().queue.findIndex((t) => t.id === track.id),
    });
  },

  pause: () => {
    set({ isPlaying: false });
  },

  resume: () => {
    set({ isPlaying: true });
  },

  togglePlayPause: () => {
    const { isPlaying } = get();
    set({ isPlaying: !isPlaying });
  },

  seekTo: (time: number) => {
    set({
      currentTime: Math.max(
        0,
        Math.min(time, get().currentTrack?.duration || 0)
      ),
    });
  },

  setVolume: (volume: number) => {
    set({ volume: Math.max(0, Math.min(1, volume)) });
  },

  nextTrack: () => {
    const { queue, currentIndex } = get();
    if (currentIndex < queue.length - 1) {
      const nextTrack = queue[currentIndex + 1];
      set({
        currentTrack: nextTrack,
        currentTime: 0,
        currentIndex: currentIndex + 1,
        isPlaying: true,
      });
    }
  },

  previousTrack: () => {
    const { queue, currentIndex } = get();
    if (currentIndex > 0) {
      const prevTrack = queue[currentIndex - 1];
      set({
        currentTrack: prevTrack,
        currentTime: 0,
        currentIndex: currentIndex - 1,
        isPlaying: true,
      });
    }
  },

  addToQueue: (tracks: Track[]) => {
    set({ queue: [...get().queue, ...tracks] });
  },

  clearQueue: () => {
    set({ queue: [], currentIndex: -1, currentTrack: null, isPlaying: false });
  },
}));

export { useMusicStore };
