"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {
  const { sessionId } = useAuth();

  if (!sessionId) {
    redirect("/protected");
  }

  return <>{children}</>;
}
