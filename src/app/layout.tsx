import Providers from "@/queries/query-client";
import type { Metadata } from "next";
import Header from "@/components/header";
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
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
