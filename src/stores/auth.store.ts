import { create } from "zustand";

interface AuthState {
  sessionId: string | null;
  accountId: string | null;
  isAuthInitialized: boolean;
  setSession: (sessionId: string | null, accountId: string | null) => void;
  setAuthInitialized: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  sessionId: null,
  accountId: null,
  isAuthInitialized: false,
  setSession: (sessionId, accountId) => {
    if (sessionId) localStorage.setItem("session_id", sessionId);
    else localStorage.removeItem("session_id");

    if (accountId) localStorage.setItem("account_id", accountId);
    else localStorage.removeItem("account_id");

    set({ sessionId, accountId });
  },
  setAuthInitialized: (value) => set({ isAuthInitialized: value }),
  logout: () => {
    localStorage.removeItem("session_id");
    localStorage.removeItem("account_id");
    set({ sessionId: null, accountId: null });
  },
}));
