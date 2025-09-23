"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonComponent } from "./button/button.component";
import { ModalComponent } from "./modal/modal.component";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginRequiredModalComponent({ isOpen, onClose }: LoginRequiredModalProps) {
  const pathname = usePathname();

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <p className="text-center text-xl font-semibold text-background">
        로그인이 필요한 서비스입니다.
      </p>
      <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
        <ButtonComponent className="w-full rounded-xl bg-point-color p-2 text-white">
          로그인하러가기
        </ButtonComponent>
      </Link>
    </ModalComponent>
  );
}
