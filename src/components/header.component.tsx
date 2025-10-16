"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { ButtonComponent } from "./index";

const myMenus = [
  { label: "⭐ 즐겨찾기", url: "/mypage/favorites" },
  { label: "📂 내 컬렉션", url: "/mypage/collections" },
  { label: "📝 내가 쓴 리뷰", url: "/mypage/reviews" },
  { label: "🎥 시청기록", url: "/mypage/watched" },
];

export function Header({ cookieData }: { cookieData: any }) {
  const { user, logout } = useAuthStore();
  const { modals, closeModal, toggleModal } = useModalStore();

  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (cookieData?.value && !user) {
      try {
        const parsed = JSON.parse(cookieData.value);
        useAuthStore.getState().setUser(parsed);
      } catch (e) {
        console.error("Invalid cookieData JSON:", e);
      }
    }
    setIsHydrated(true);
  }, []);

  const isLoggedIn = isHydrated ? !!user : !!cookieData;

  const handleLogout = () => {
    closeModal("myMenu");
    logout();
    router.push("/login");
  };

  return (
    <header className="flex w-full items-center justify-center bg-header-bg">
      <div className="flex w-full max-w-[1920px] items-center gap-8 p-8">
        <Link href="/" className="relative aspect-[3/1] w-48">
          <Image src="/logo.svg" className="object-contain" fill priority alt="logo" />
        </Link>

        <nav className="flex w-full items-center justify-between gap-4 text-nowrap">
          {isLoggedIn ? (
            <div className="flex w-full items-center justify-end gap-8">
              <div className="relative">
                <FaUserCircle
                  onClick={() => toggleModal("myMenu")}
                  size={48}
                  className="cursor-pointer"
                />
                {modals.myMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => closeModal("myMenu")} />

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute left-1/2 top-full z-50 mt-2 flex w-40 -translate-x-1/2 flex-col gap-4 rounded-xl border-2 border-point-color bg-background p-3"
                    >
                      <p className="text-center text-xl font-semibold text-point-color">
                        {user?.name} 님
                      </p>
                      <div className="flex flex-col">
                        {myMenus.map((menu) => (
                          <Link
                            key={menu.url}
                            href={menu.url}
                            onClick={() => closeModal("myMenu")}
                            className="rounded-lg p-1 transition-colors duration-300 hover:bg-white/30"
                          >
                            {menu.label}
                          </Link>
                        ))}
                      </div>
                      <Button
                        className="rounded-lg bg-point-color p-1 font-medium text-white transition-colors duration-300 hover:bg-point-color/70"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-end gap-4">
              <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
                <ButtonComponent btnType="link">로그인</ButtonComponent>
              </Link>
              <Link href={"/signup"}>
                <ButtonComponent btnType="link">회원가입</ButtonComponent>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
