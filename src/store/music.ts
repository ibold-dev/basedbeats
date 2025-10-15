import { create } from "zustand";
import { Howl } from "howler";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: number; // in seconds
  explicit?: boolean;
  audioUrl?: string; // URL to audio file
}

export interface MusicState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  volume: number; // 0-1
  queue: Track[];
  currentIndex: number;
  currentHowl: Howl | null;
  isShuffled: boolean;
  repeatMode: "none" | "one" | "all";

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
  updateCurrentTime: () => void;
  loadDemoTracks: () => void;
  getActualDuration: (audioUrl: string) => Promise<number>;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const useMusicStore = create<MusicState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  volume: 0.8,
  queue: [],
  currentIndex: 0,
  currentHowl: null,
  isShuffled: false,
  repeatMode: "none",

  playTrack: (track: Track) => {
    const { currentHowl } = get();

    // Stop current track if playing
    if (currentHowl) {
      currentHowl.stop();
    }

    // Create new Howl instance for the track
    if (track.audioUrl) {
      const howl = new Howl({
        src: [track.audioUrl],
        volume: get().volume,
        onload: () => {
          // Get the actual duration from the audio file
          const actualDuration = howl.duration();

          // Update the track with the real duration
          const updatedTrack = {
            ...track,
            duration: actualDuration,
          };

          set({
            currentTrack: updatedTrack,
            isPlaying: true,
            currentTime: 0,
            currentIndex: get().queue.findIndex((t) => t.id === track.id),
            currentHowl: howl,
          });
          howl.play();
        },
        onplay: () => {
          set({ isPlaying: true });
        },
        onpause: () => {
          set({ isPlaying: false });
        },
        onstop: () => {
          set({ isPlaying: false, currentTime: 0 });
        },
        onseek: () => {
          set({ currentTime: howl.seek() });
        },
        onend: () => {
          // Handle repeat and auto-play next track
          const { repeatMode } = get();
          if (repeatMode === "one") {
            // Repeat current track
            howl.seek(0);
            howl.play();
          } else {
            // Auto-play next track if available
            get().nextTrack();
          }
        },
      });
    } else {
      // No audio URL, just update UI state
      set({
        currentTrack: track,
        isPlaying: true,
        currentTime: 0,
        currentIndex: get().queue.findIndex((t) => t.id === track.id),
        currentHowl: null,
      });
    }
  },

  pause: () => {
    const { currentHowl } = get();
    if (currentHowl) {
      currentHowl.pause();
    }
    set({ isPlaying: false });
  },

  resume: () => {
    const { currentHowl } = get();
    if (currentHowl) {
      currentHowl.play();
    }
    set({ isPlaying: true });
  },

  togglePlayPause: () => {
    const { isPlaying, currentHowl } = get();
    if (currentHowl) {
      if (isPlaying) {
        currentHowl.pause();
      } else {
        currentHowl.play();
      }
    }
    set({ isPlaying: !isPlaying });
  },

  seekTo: (time: number) => {
    const { currentHowl, currentTrack } = get();
    const seekTime = Math.max(0, Math.min(time, currentTrack?.duration || 0));

    if (currentHowl) {
      currentHowl.seek(seekTime);
    }
    set({ currentTime: seekTime });
  },

  setVolume: (volume: number) => {
    const newVolume = Math.max(0, Math.min(1, volume));
    const { currentHowl } = get();

    if (currentHowl) {
      currentHowl.volume(newVolume);
    }
    set({ volume: newVolume });
  },

  nextTrack: () => {
    const { queue, currentIndex, playTrack, isShuffled, repeatMode } = get();

    if (repeatMode === "one") {
      // If repeat one is on, just restart current track
      const currentTrack = queue[currentIndex];
      if (currentTrack) {
        playTrack(currentTrack);
      }
      return;
    }

    if (currentIndex < queue.length - 1) {
      const nextTrack = queue[currentIndex + 1];
      playTrack(nextTrack);
    } else if (repeatMode === "all" && queue.length > 0) {
      // If repeat all is on and we're at the end, go to first track
      const firstTrack = queue[0];
      playTrack(firstTrack);
    }
  },

  previousTrack: () => {
    const { queue, currentIndex, playTrack, repeatMode } = get();

    if (repeatMode === "one") {
      // If repeat one is on, just restart current track
      const currentTrack = queue[currentIndex];
      if (currentTrack) {
        playTrack(currentTrack);
      }
      return;
    }

    if (currentIndex > 0) {
      const prevTrack = queue[currentIndex - 1];
      playTrack(prevTrack);
    } else if (repeatMode === "all" && queue.length > 0) {
      // If repeat all is on and we're at the beginning, go to last track
      const lastTrack = queue[queue.length - 1];
      playTrack(lastTrack);
    }
  },

  addToQueue: (tracks: Track[]) => {
    set({ queue: [...get().queue, ...tracks] });
  },

  clearQueue: () => {
    const { currentHowl } = get();
    if (currentHowl) {
      currentHowl.stop();
    }
    set({
      queue: [],
      currentIndex: -1,
      currentTrack: null,
      isPlaying: false,
      currentHowl: null,
    });
  },

  updateCurrentTime: () => {
    const { currentHowl, isPlaying } = get();
    if (currentHowl && isPlaying) {
      const seekTime = currentHowl.seek() || 0;
      set({ currentTime: seekTime });
    }
  },

  loadDemoTracks: () => {
    const demoTracks: Track[] = [
      {
        id: "1",
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        albumArt:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
        duration: 0, // Will be set to actual duration when loaded
        explicit: true,
        audioUrl:
          "https://archive.org/download/testmp3testfile/mpthreetest.mp3", // Demo audio URL
      },
      {
        id: "2",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        albumArt:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&crop=face",
        duration: 0, // Will be set to actual duration when loaded
        explicit: false,
        audioUrl:
          "https://archive.org/download/testmp3testfile/mpthreetest.mp3", // Demo audio URL
      },
      {
        id: "3",
        title: "Starboy",
        artist: "The Weeknd",
        album: "Starboy",
        albumArt:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&crop=face",
        duration: 0, // Will be set to actual duration when loaded
        explicit: true,
        audioUrl:
          "https://archive.org/download/testmp3testfile/mpthreetest.mp3", // Demo audio URL
      },
      {
        id: "4",
        title: "After Hours",
        artist: "The Weeknd",
        album: "After Hours",
        albumArt:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
        duration: 0, // Will be set to actual duration when loaded
        explicit: true,
        audioUrl:
          "https://archive.org/download/testmp3testfile/mpthreetest.mp3", // Demo audio URL
      },
      {
        id: "5",
        title: "Heartless",
        artist: "The Weeknd",
        album: "After Hours",
        albumArt:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&crop=face",
        duration: 0, // Will be set to actual duration when loaded
        explicit: true,
        audioUrl:
          "https://archive.org/download/testmp3testfile/mpthreetest.mp3", // Demo audio URL
      },
      {
        id: "6",
        title: "In Your Eyes",
        artist: "The Weeknd",
        album: "After Hours",
        albumArt:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&crop=face",
        duration: 0, // Will be set to actual duration when loaded
        explicit: false,
        audioUrl:
          "https://archive.org/download/testmp3testfile/mpthreetest.mp3", // Demo audio URL
      },
    ];

    set({ queue: demoTracks, currentIndex: 0 });
    get().playTrack(demoTracks[0]);
  },

  getActualDuration: (audioUrl: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const howl = new Howl({
        src: [audioUrl],
        onload: () => {
          const duration = howl.duration();
          howl.unload(); // Clean up
          resolve(duration);
        },
        onloaderror: () => {
          reject(new Error("Failed to load audio"));
        },
      });
    });
  },

  toggleShuffle: () => {
    const { isShuffled, queue } = get();
    const newShuffled = !isShuffled;

    if (newShuffled && queue.length > 1) {
      // Shuffle the queue (Fisher-Yates algorithm)
      const shuffledQueue = [...queue];
      for (let i = shuffledQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQueue[i], shuffledQueue[j]] = [
          shuffledQueue[j],
          shuffledQueue[i],
        ];
      }
      set({ isShuffled: newShuffled, queue: shuffledQueue, currentIndex: 0 });
    } else {
      // Unshuffle - restore original order
      set({ isShuffled: newShuffled });
    }
  },

  toggleRepeat: () => {
    const { repeatMode } = get();
    const modes: ("none" | "one" | "all")[] = ["none", "one", "all"];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    set({ repeatMode: nextMode });
  },
}));

export { useMusicStore };
