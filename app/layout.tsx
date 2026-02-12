import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavbarServer from "@/components/layout/NavbarServer";
import Footer from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/ui/FloatingButtons";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { ThemeProvider } from "next-themes";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GR Premium Properties",
  description:
    "Discover premium real estate properties in Dubai from top developers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F172A] text-white`}>

    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

      <AnnouncementBar />
      <NavbarServer />

      <main className="w-full">{children}</main>

      <FloatingButtons />

    </ThemeProvider>
  </body>
</html>

  );
}
