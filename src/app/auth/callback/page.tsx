"use client";

import { LoadingComponent } from "@/components";
import { getAccount } from "@/services/account.service";
import { postSession } from "@/services/authenticate.service";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TmdbCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestToken = searchParams.get("request_token");
  const approved = searchParams.get("approved");

  const setSessionId = useAuthStore.getState().setSessionId;
  const setAccountId = useAuthStore.getState().setAccountId;

  useEffect(() => {
    const completeLogin = async () => {
      if (!requestToken || approved !== "true") {
        alert("로그인 실패 또는 사용자가 거부했습니다.");
        return;
      }

      const res = await postSession({ request_token: requestToken });
      const sessionId = res.session_id;

      const account = await getAccount(sessionId);

      setSessionId(sessionId);
      setAccountId(account.id);

      localStorage.setItem("session_id", sessionId);
      localStorage.setItem("account_id", account.id);

      router.replace("/");
    };

    completeLogin();
  }, [requestToken, approved, router, setSessionId, setAccountId]);

  return <LoadingComponent label="현재 로그인 진행 중 ..." isIndeterminate />;
}
