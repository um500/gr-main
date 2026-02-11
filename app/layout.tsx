import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavbarServer from "@/components/layout/NavbarServer";
import Footer from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/ui/FloatingButtons";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Global Navbar */}
        <NavbarServer />


        {/* Page Content */}
        <main className="flex-1">{children}</main>

        

        {/* Floating Call / WhatsApp / BackToTop Buttons */}
        <FloatingButtons />
      </body>
    </html>
  );
}
