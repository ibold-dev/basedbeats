import { create } from "zustand";

type NavTabLabel = "home" | "search" | "library" | "account";

type NavTab = {
  id: NavTabLabel;
  label: string;
  href: string;
  icon: any;
  activeIcon: any;
  isActive: boolean;
};

interface NavigationState {
  navTabs: NavTab[];
  activeTab: NavTab;
  isHome: boolean;
  isSearch: boolean;
  isLibrary: boolean;
  isAccount: boolean;
  updatePath: (path: string) => void;
}

const useNavigationStore = create<NavigationState>((set, get) => ({
  navTabs: [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: null,
      activeIcon: null,
      isActive: true,
    },
    {
      id: "search",
      label: "Search",
      href: "/search",
      icon: null,
      activeIcon: null,
      isActive: false,
    },
    {
      id: "library",
      label: "Library",
      href: "/library",
      icon: null,
      activeIcon: null,
      isActive: false,
    },
    {
      id: "account",
      label: "Account",
      href: "/account",
      icon: null,
      activeIcon: null,
      isActive: false,
    },
  ],
  activeTab: {
    id: "home",
    label: "Home",
    href: "/",
    icon: null,
    activeIcon: null,
    isActive: true,
  },
  isHome: true,
  isSearch: false,
  isLibrary: false,
  isAccount: false,
  updatePath: (path: string) => {
    const tabs = get().navTabs.map((tab) => ({
      ...tab,
      isActive: tab.href === path,
    }));

    const activeTab = tabs.find((tab) => tab.isActive) || tabs[0];

    set({
      navTabs: tabs,
      activeTab,
      isHome: activeTab.id === "home",
      isSearch: activeTab.id === "search",
      isLibrary: activeTab.id === "library",
      isAccount: activeTab.id === "account",
    });
  },
}));

export { useNavigationStore };
