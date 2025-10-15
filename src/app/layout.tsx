import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@/queries/query-client";
import { Header } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "시네픽 (Cine Pick)",
  description: "영화 추천 사이트입니다.",
};

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});
async function getCookieData() {
  const cookieMap = await cookies();
  const cookieData = cookieMap.get("login");

  try {
    return cookieData;
  } catch (error) {
    console.error(error);
  }
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieData = await getCookieData();
  return (
    <html lang="ko" className={`dark ${notoSans.variable}`}>
      <body className="font-sans">
        <QueryClientProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Header cookieData={cookieData} />
          <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-16 py-40">
            {children}
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
