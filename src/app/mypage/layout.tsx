"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth.store";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      toast.error("접근 불가한 페이지입니다.");
      router.replace("/protected");
    }
  }, [user, router]);

  if (user === undefined) return null;

  if (user === null) return null;

  return <>{children}</>;
}
