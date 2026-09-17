import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Rajdhani } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { AgentCodeProvider } from "@/components/providers/AgentCodeProvider";
import { AuthModalProvider } from "@/components/providers/AuthModalProvider";
import { UserProvider } from "@/components/providers/UserProvider";
import { MailboxCountsProvider } from "@/hooks/useMailboxCounts";
import { Toaster } from "sonner";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const noto_sans_kr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "KSKY SOLUTION",
  description: "KSKY SOLUTION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${noto_sans_kr.variable} ${rajdhani.variable} antialiased`}>
        <MotionProvider>
          <UserProvider>
            <MailboxCountsProvider>
              <AgentCodeProvider>
                <AuthModalProvider>
                  <Toaster position="top-right" richColors />
                  <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                </AuthModalProvider>
              </AgentCodeProvider>
            </MailboxCountsProvider>
          </UserProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
