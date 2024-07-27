import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { Toaster } from "sonner";
import { SessionProvider } from "./context/sessionContext";
import { ProgressBar } from "@/app/context/navigationProgressContext";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arc: Raiders Database",
  description:
    "Find anything and everything about Arc: Raiders items and more!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ProgressBar>
            <a
              href="#main-content"
              className="absolute -translate-y-28 focus:translate-y-0"
              style={{ zIndex: 999 }}
            >
              skip to main content
            </a>
            <Toaster position="bottom-center" duration={3000} />
            <Navbar />
            <div className="overflow-clip min-h-[calc(100vh-48px)]">
              {children}
            </div>
          </ProgressBar>
        </SessionProvider>
      </body>
    </html>
  );
}
