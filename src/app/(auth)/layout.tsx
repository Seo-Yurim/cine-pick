"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth.store";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      toast.error("이미 로그인 된 상태입니다!");
      router.replace("/");
    }
  }, [user, router]);

  if (user === undefined) {
    return;
  }

  if (user) {
    return;
  }

  return <>{children}</>;
}
