"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useHasHydrated } from "@/hooks/useHasHydration";
import { ButtonComponent } from "./index";

export function Header() {
  const { user, logout } = useAuthStore();
  const hasHydrated = useHasHydrated();

  const pathname = usePathname();

  const menus = {
    guest: [
      {
        label: "로그인",
        url: `/login?redirect=${encodeURIComponent(pathname)}`,
      },
      {
        label: "회원가입",
        url: "https://www.themoviedb.org/signup",
      },
    ],
    user: [
      { label: "즐겨찾기", url: "/mypage/favorites" },
      { label: "리뷰 모아보기", url: "/mypage/reviews" },
      { label: "내 컬렉션", url: "/mypage/collections" },
      { label: "시청기록", url: "/mypage/watched" },
    ],
  };

  const isActive = (url: string) => pathname === url;

  if (!hasHydrated) {
    return (
      <header className="fixed z-50 flex h-28 w-full items-center justify-center bg-header-bg">
        <div className="flex w-full max-w-[1920px] items-center gap-8 px-8">
          <Link href="/" className="relative aspect-[3/1] w-48">
            <Image src="/logo.svg" className="object-contain" fill priority alt="logo" />
          </Link>
          <div className="w-full animate-pulse rounded-xl bg-white/10 p-8" />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed z-50 flex h-28 w-full items-center justify-center bg-header-bg">
      <div className="flex w-full max-w-[1920px] items-center gap-8 px-8">
        <Link href="/" className="relative aspect-[3/1] w-48">
          <Image src="/logo.svg" className="object-contain" fill priority alt="logo" />
        </Link>

        <nav className="flex w-full items-center justify-between gap-4 text-nowrap">
          <Link href="/movies">
            <ButtonComponent
              btnType="link"
              className={pathname === "/movies" ? "border-b-2 border-white text-white" : ""}
            >
              찾아보기
            </ButtonComponent>
          </Link>

          {user ? (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                {menus.user.map((menu) => (
                  <Link key={menu.url} href={menu.url}>
                    <ButtonComponent
                      btnType="link"
                      className={isActive(menu.url) ? "border-b-2 border-white text-white" : ""}
                    >
                      {menu.label}
                    </ButtonComponent>
                  </Link>
                ))}
              </div>
              <ButtonComponent btnType="link" onClick={logout}>
                로그아웃
              </ButtonComponent>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {menus.guest.map((menu) => (
                <Link key={menu.url} href={menu.url}>
                  <ButtonComponent
                    btnType="link"
                    className={isActive(menu.url) ? "border-b-2 border-white text-white" : ""}
                  >
                    {menu.label}
                  </ButtonComponent>
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
