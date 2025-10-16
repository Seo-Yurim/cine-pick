import { deleteCookie } from "cookies-next/client";
import { create } from "zustand";
import { User } from "@/types/users.type";

interface AuthState {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: undefined });
    deleteCookie("login");
  },
}));
