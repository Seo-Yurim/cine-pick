"use client";

import { useAuth } from "@/hooks/useAuth";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "./button/button.component";

export function Header() {
  const { sessionId, logout } = useAuth();
  const { handleLogin } = useLogin();

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
                <Link href="/">
                  <ButtonComponent>마이페이지</ButtonComponent>
                </Link>
                <ButtonComponent onClick={logout}>로그아웃</ButtonComponent>
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
