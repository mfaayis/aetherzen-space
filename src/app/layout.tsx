import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import dynamic from "next/dynamic";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const Background3D = dynamic(() => import("@/components/canvas/Background3D").then(mod => mod.Background3D));

const AIChat = dynamic(() => import("@/components/ui/AIChat").then(mod => mod.AIChat));

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
          <Footer />
          <AIChat />
        </SmoothScroll>
      </body>
    </html>
  );
}
