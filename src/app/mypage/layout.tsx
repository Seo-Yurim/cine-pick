"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const { sessionId } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (sessionId === null) return;
    if (!sessionId) {
      router.replace("/protected");
    }
  }, [sessionId, router]);

  if (sessionId === null) {
    return null;
  }

  return <>{children}</>;
}
