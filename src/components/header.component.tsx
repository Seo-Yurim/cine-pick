"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "@/stores/auth.store";
import { ButtonComponent } from "./index";

export function Header({ cookieData }: { cookieData: any }) {
  const { user, logout } = useAuthStore();

  const pathname = usePathname();

  const menus = [
    {
      label: "로그인",
      url: `/login?redirect=${encodeURIComponent(pathname)}`,
    },
    {
      label: "회원가입",
      url: "/signup",
    },
  ];

  const isActive = (url: string) => pathname === url;

  return (
    <header className="fixed z-50 flex h-28 w-full items-center justify-center bg-header-bg">
      <div className="flex w-full max-w-[1920px] items-center gap-8 px-8">
        <Link href="/" className="relative aspect-[3/1] w-48">
          <Image src="/logo.svg" className="object-contain" fill priority alt="logo" />
        </Link>

        <nav className="flex w-full items-center justify-between gap-4 text-nowrap">
          {cookieData || user ? (
            <div className="gap -8 flex w-full items-center justify-end">
              <FaUserCircle size={32} />
              <ButtonComponent btnType="link" onClick={logout}>
                로그아웃
              </ButtonComponent>
            </div>
          ) : (
            <div className="flex w-full items-center justify-end gap-4">
              {menus.map((menu) => (
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
