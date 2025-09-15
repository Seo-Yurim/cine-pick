import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    const account_id = localStorage.getItem("account_id");

    setSessionId(session_id);
    setAccountId(account_id);
  }, []);

  const isLoggedIn = !!sessionId;

  const requireLogin = (callback: () => void) => {
    if (!sessionId) {
      setLoginModalOpen(true);
    } else {
      setLoginModalOpen(false);
      callback();
    }
  };

  useEffect(() => {
    if (sessionId) {
      setLoginModalOpen(false);
    }
  }, [sessionId]);

  const closeLoginModal = () => setLoginModalOpen(false);

  return {
    sessionId,
    accountId,
    isLoggedIn,
    isLoginModalOpen,
    requireLogin,
    closeLoginModal,
  };
}
