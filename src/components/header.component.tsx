"use client";

import { useAuthStore } from "@/stores/auth.store";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { ButtonComponent } from "./button/button.component";

export function Header() {
  const sessionId = useAuthStore((state) => state.sessionId);
  const logout = useAuthStore((state) => state.logout);
  const { handleLogin } = useLogin();

  const isLoggedIn = !!sessionId;

  return (
    <header className="bg-header-bg p-8">
      <div className="mx-auto flex w-full max-w-[1920px] items-center gap-8">
        <Link href="/" className="relative aspect-[3/1] w-48">
          <Image src="/logo.svg" className="object-contain" fill priority alt="logo" />
        </Link>

        <nav className="flex w-full items-center justify-between gap-4 text-nowrap">
          <Link href="/movies">
            <ButtonComponent>찾아보기</ButtonComponent>
          </Link>

          {isLoggedIn ? (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/mypage/favorites">
                  <ButtonComponent>즐겨찾기</ButtonComponent>
                </Link>
                <Link href="/mypage/reviews">
                  <ButtonComponent>리뷰 모아보기</ButtonComponent>
                </Link>
                <Link href="/mypage/collections">
                  <ButtonComponent>내 컬렉션</ButtonComponent>
                </Link>
                <Link href="/mypage/watched">
                  <ButtonComponent>시청기록</ButtonComponent>
                </Link>
              </div>
              <ButtonComponent onClick={logout}>로그아웃</ButtonComponent>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ButtonComponent onClick={handleLogin}>로그인</ButtonComponent>
              <Link href="https://www.themoviedb.org/signup">
                <ButtonComponent>회원가입</ButtonComponent>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
