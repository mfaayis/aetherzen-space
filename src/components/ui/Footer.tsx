import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/50 backdrop-blur-md py-12 px-6 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="NextStep Logo" className="h-16 sm:h-20 w-auto object-contain invert drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
        </div>
        
        <div className="flex items-center gap-6 text-sm font-sans text-neutral-400">
          <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
        
        <div className="text-neutral-500 text-xs font-sans">
          © {new Date().getFullYear()} NextStep Career Guidance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
