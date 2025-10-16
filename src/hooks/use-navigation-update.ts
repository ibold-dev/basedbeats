import { useNavigationStore } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useNavigationUpdate = () => {
  const pathname = usePathname();
  const updateNavigation = useNavigationStore((state) => state.updatePath);

  useEffect(() => {
    updateNavigation(pathname);
  }, [pathname, updateNavigation]);
};
