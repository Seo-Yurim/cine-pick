"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export function AuthInitializer() {
  const setSession = useAuthStore((state) => state.setSession);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    const accountId = localStorage.getItem("account_id");
    setSession(sessionId, accountId);
    setAuthInitialized(true);
  }, []);

  return null;
}
