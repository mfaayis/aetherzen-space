import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/50 backdrop-blur-md py-12 px-6 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-heading font-bold text-xs">
            N
          </div>
          <span className="text-white font-heading font-bold text-lg tracking-tighter">
            NextStep
          </span>
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
