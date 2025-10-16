import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
    theme: "dark" | "light";
    language: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  timestamp: Date;
}

export interface UserState {
  user: User | null;
  notifications: Notification[];
  unreadCount: number;

  // Actions
  setUser: (user: User) => void;
  clearUser: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">
  ) => void;
  markNotificationAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {
    id: "1",
    name: "Mukul",
    email: "mukul@example.com",
    preferences: {
      theme: "dark",
      language: "en",
    },
  },
  notifications: [
    {
      id: "1",
      title: "New Music Release",
      message: "Your favorite artist just dropped a new album!",
      type: "info",
      read: false,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "2",
      title: "Playlist Update",
      message: "Someone added songs to your shared playlist.",
      type: "info",
      read: false,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
  ],
  unreadCount: 2,

  setUser: (user: User) => {
    set({ user });
  },

  clearUser: () => {
    set({ user: null, notifications: [], unreadCount: 0 });
  },

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markNotificationAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
      unreadCount: 0,
    }));
  },

  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
  },
}));

export { useUserStore };
