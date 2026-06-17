"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Assessment" },
  { href: "/courses", label: "Courses" },
  { href: "/exams", label: "Exams" },
  { href: "/counselor", label: "Counselor" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-6 py-4 rounded-full border border-white/10 shadow-2xl bg-black/40 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-heading font-bold group-hover:scale-110 transition-transform">
            A
          </div>
          <span className="text-white font-heading font-bold text-xl tracking-tighter hidden md:block">
            Aetherzen
          </span>
        </Link>

        <nav className="flex items-center gap-2 md:gap-8 bg-white/5 px-4 md:px-8 py-2 rounded-full border border-white/10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1 font-sans text-sm tracking-widest uppercase transition-colors"
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
        
        <div className="hidden md:block">
          <Link href="/#assessment" className="px-6 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors">
            Start Now
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
