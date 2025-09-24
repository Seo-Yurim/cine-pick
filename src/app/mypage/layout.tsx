"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      router.push("/protected");
    }
  }, [user, router]);

  if (user === undefined) return null;

  if (user === null) return null;

  return <>{children}</>;
}
