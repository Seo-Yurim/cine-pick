import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components";
import { QueryClientProvider } from "@/queries/query-client";
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
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
