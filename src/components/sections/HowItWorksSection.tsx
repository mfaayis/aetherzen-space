"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Take the Assessment",
    desc: "Answer a series of questions designed to analyze your cognitive strengths, interests, and preferred working styles.",
  },
  {
    number: "02",
    title: "Data Analysis",
    desc: "Our algorithm cross-references your profile with hundreds of career paths and university degrees to find the perfect matches.",
  },
  {
    number: "03",
    title: "Your Blueprint",
    desc: "Receive a tailored educational trajectory, including recommended courses, entrance exams, and future career prospects.",
  }
];

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-32 z-10 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter text-white">
            How It Works
          </h2>
          <p className="text-neutral-400 font-sans mt-4">Three simple steps to clarity.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-black border border-white/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <span className="text-3xl font-heading font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4 uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-neutral-400 font-sans leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
