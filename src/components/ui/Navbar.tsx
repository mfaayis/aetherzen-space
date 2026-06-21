"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Assessment" },
  { href: "/courses", label: "Courses" },
  { href: "/colleges", label: "Colleges" },
  { href: "/exams", label: "Exams" },
  { href: "/counselor", label: "Counselor" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40 px-4 md:px-6 py-4 md:py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/10 shadow-2xl bg-black/40 backdrop-blur-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => setIsMobileOpen(false)}>
            <img src="/logo.png" alt="NextStep Logo" className="h-10 w-auto object-contain mix-blend-screen group-hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-2 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1 font-sans text-sm tracking-widest uppercase transition-colors shrink-0"
                >
                  <span className={`relative z-10 ${isActive ? "text-white font-bold" : "text-neutral-400 hover:text-white"}`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Navigation Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={32} />
            </button>
            
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`text-3xl font-heading font-bold uppercase tracking-widest transition-colors ${
                      isActive ? "text-white" : "text-neutral-500 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-16 text-neutral-600 font-sans text-sm uppercase tracking-widest">
              NextStep Platform
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
