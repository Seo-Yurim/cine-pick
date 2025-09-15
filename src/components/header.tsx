"use client";

import { getRequestToken } from "@/services/authenticate.service";
import { useAuthStore } from "@/stores/auth.store";
import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "./button/button.component";

export function Header() {
  const { sessionId } = useAuthStore();

  const handleLogin = async () => {
    const res = await getRequestToken();
    const requestToken = res.request_token;

    const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    )}`;

    window.location.href = redirectUrl;
  };

  const handleLogout = () => {
    const { clearAuth } = useAuthStore.getState();

    clearAuth();
    localStorage.removeItem("session_id");
    localStorage.removeItem("account_id");

    window.location.href = "/";
  };

  console.log(sessionId);

  return (
    <header className="bg-header-bg p-8">
      <div className="mx-auto flex w-full max-w-[1920px] items-center gap-8">
        <Link href="/" className="relative aspect-[3/1] w-48">
          <Image src="/logo.svg" className="object-contain" fill priority alt="logo" />
        </Link>
        <nav className="flex w-full items-center justify-between">
          <Link href="/movies">
            <ButtonComponent>찾아보기</ButtonComponent>
          </Link>
          <div className="flex items-center gap-4">
            {sessionId ? (
              <>
                <Link href="/profile">
                  <ButtonComponent>마이페이지</ButtonComponent>
                </Link>
                <ButtonComponent onClick={handleLogout}>로그아웃</ButtonComponent>
              </>
            ) : (
              <>
                <ButtonComponent onClick={handleLogin}>로그인</ButtonComponent>
                <Link href="https://www.themoviedb.org/signup">
                  <ButtonComponent>회원가입</ButtonComponent>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
