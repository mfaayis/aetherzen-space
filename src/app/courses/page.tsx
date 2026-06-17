"use client";

import { motion } from "framer-motion";
import { courseCategories } from "@/data/courses";

export default function CoursesPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 z-10 relative bg-black/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter text-white">
            Course Directory
          </h1>
          <p className="text-neutral-400 font-sans text-lg mt-4 max-w-2xl">
            Explore the vast landscape of undergraduate degrees and certifications. Find the perfect program tailored to your interests and 12th-grade stream.
          </p>
        </motion.div>

        <div className="space-y-24">
          {courseCategories.map((category, idx) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-3 h-12 bg-gradient-to-b ${category.color} rounded-full`} />
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-4">
                  <span>{category.icon}</span>
                  {category.title}
                </h2>
              </div>
              
              <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10">
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {category.courses.map((course, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-sans text-sm hover:bg-white hover:text-black hover:border-white transition-all cursor-default"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
