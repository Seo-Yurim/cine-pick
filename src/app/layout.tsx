import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@/queries/query-client";
import { Header } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "시네픽 (Cine Pick)",
  description: "영화 추천 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="font-sans">
        <QueryClientProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 py-28">
            {children}
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
