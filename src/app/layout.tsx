import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import { CustomCursor } from "@/components/ui/CustomCursor";
import { Background3D } from "@/components/canvas/Background3D";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/ui/Navbar";
import { AIChat } from "@/components/ui/AIChat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextStep | Career Guidance Platform",
  description: "AI-powered career assessment and guidance for your post-12th journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen relative selection:bg-white selection:text-black">
        <SmoothScroll>
          <Navbar />
          <Background3D />
          <CustomCursor />
          {children}
          <AIChat />
        </SmoothScroll>
      </body>
    </html>
  );
}
