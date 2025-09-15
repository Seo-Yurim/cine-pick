import { create } from "zustand";

interface AuthState {
  sessionId: string | null;
  accountId: number | null;
  setSessionId: (sessionId: string) => void;
  setAccountId: (accountId: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  sessionId: null,
  accountId: null,
  setSessionId: (sessionId) => set({ sessionId }),
  setAccountId: (accountId) => set({ accountId }),
  clearAuth: () => set({ sessionId: null, accountId: null }),
}));
