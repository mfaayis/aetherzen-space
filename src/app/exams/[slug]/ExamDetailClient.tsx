"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, ExternalLink } from "lucide-react";

export default function ExamDetailClient({ exam }: { exam: any }) {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 z-10 relative bg-black/50">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/exams"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 font-sans uppercase tracking-widest text-sm"
        >
          <ArrowLeft size={16} /> Back to Exams
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm tracking-widest uppercase">
              {exam.month}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-sm tracking-widest uppercase">
              {exam.eligibility}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter text-white leading-none">
            {exam.name}
          </h1>
          <p className="text-xl text-neutral-400 font-sans mt-6 max-w-2xl leading-relaxed">
            {exam.desc}
          </p>

          <a 
            href={exam.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors font-sans font-bold text-sm tracking-widest uppercase"
          >
            Official Website <ExternalLink size={16} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">
                <BookOpen size={24} />
              </div>
              <h2 className="text-2xl font-heading font-bold uppercase tracking-tight text-white">Syllabus Overview</h2>
            </div>
            <ul className="space-y-4 font-sans text-neutral-300">
              {exam.syllabus.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-blue-400 mt-1">●</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-heading font-bold uppercase tracking-tight text-white">Top Target Colleges</h2>
            </div>
            <ul className="space-y-4 font-sans text-neutral-300">
              {exam.topColleges.map((college: string, idx: number) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-purple-400 mt-1">●</span>
                  <span className="leading-relaxed">{college}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
