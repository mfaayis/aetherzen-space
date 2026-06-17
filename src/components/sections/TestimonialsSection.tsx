"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I was completely lost after 12th Commerce. The assessment pointed me towards B.Des, and I realized my true passion is design, not finance.",
    author: "Rohan M.",
    role: "B.Des Student"
  },
  {
    quote: "The blueprint was incredibly accurate. It mapped my logical skills and tech interest directly to a BCA program. Best decision I made.",
    author: "Priya S.",
    role: "BCA Graduate"
  },
  {
    quote: "I thought MBBS was my only option after PCB. The platform opened my eyes to Bioinformatics, perfectly blending my love for bio and computers.",
    author: "Aman K.",
    role: "Bioinformatics Researcher"
  }
];

export function TestimonialsSection() {
  return (
    <section className="relative w-full py-32 z-10 bg-neutral-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter mb-20 text-center text-white">
          Student Success
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="glass-panel p-10 rounded-2xl border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
              <svg className="w-8 h-8 text-neutral-600 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg md:text-xl font-sans text-neutral-300 mb-8 leading-relaxed">
                &quot;{t.quote}&quot;
              </p>
              <div>
                <h4 className="text-white font-heading font-bold text-lg">{t.author}</h4>
                <p className="text-neutral-500 font-sans text-sm tracking-wide uppercase">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
