import { deleteCookie } from "cookies-next/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/users.type";

interface AuthState {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        deleteCookie("login");
      },
    }),
    {
      name: "user-data",
      partialize: (state) => ({
        user: state.user
          ? {
              ...state.user,
              password: undefined,
            }
          : null,
      }),
    },
  ),
);
