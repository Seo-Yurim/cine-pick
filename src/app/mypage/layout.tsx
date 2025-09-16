"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const { sessionId } = useAuth();
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
