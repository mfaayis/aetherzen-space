"use client";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center bg-black z-10 overflow-hidden pt-32 pb-12">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-neutral-400 uppercase tracking-[0.3em] text-sm md:text-base mb-6"
        >
          Ready for the next level?
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-9xl font-heading font-bold uppercase tracking-tighter mb-16 leading-[0.9]"
        >
          Let&apos;s <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
            Create.
          </span>
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="group relative px-12 py-5 rounded-full border border-white/30 bg-transparent text-white font-sans font-semibold tracking-wide overflow-hidden"
        >
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            START A PROJECT
          </span>
          <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-6 mt-auto pt-32 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm font-sans">
        <p>© {new Date().getFullYear()} Aetherzen. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
