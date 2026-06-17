"use client";

import { motion } from "framer-motion";

import { examsData } from "@/data/exams";
import Link from "next/link";

export default function ExamsPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 z-10 relative bg-black/50">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter text-white">
            Entrance Exams
          </h1>
          <p className="text-neutral-400 font-sans text-lg mt-4 max-w-2xl">
            A comprehensive guide to the national and state-level entrance examinations required for top-tier undergraduate admissions.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {examsData.map((exam, i) => (
            <motion.div
              key={exam.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 md:p-10 rounded-3xl border border-white/10 group hover:border-white/30 transition-colors flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative overflow-hidden"
            >
              {/* Highlight gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex flex-col gap-2 z-10 max-w-2xl">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight">
                    {exam.name}
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono uppercase text-white/80">
                    {exam.month}
                  </span>
                </div>
                <div className="flex gap-4 text-sm font-sans text-neutral-400 mt-2 uppercase tracking-widest">
                  <span className="text-blue-400">Target: {exam.target}</span>
                  <span>•</span>
                  <span className="text-emerald-400">Stream: {exam.eligibility}</span>
                </div>
                <p className="text-neutral-300 font-sans mt-4 leading-relaxed">
                  {exam.desc}
                </p>
              </div>

              <div className="z-10 w-full md:w-auto flex justify-end shrink-0">
                <Link 
                  href={`/exams/${exam.slug}`}
                  className="w-full md:w-auto px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all font-sans text-sm font-bold uppercase tracking-wider text-center"
                >
                  Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
