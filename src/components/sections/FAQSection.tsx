"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is the assessment free?",
    a: "Yes, the core assessment and course recommendations are completely free to use."
  },
  {
    q: "How accurate are the recommendations?",
    a: "Our algorithm uses data from thousands of successful career trajectories. While highly accurate, we always recommend discussing your results with a professional counselor."
  },
  {
    q: "Can I change my stream after 12th?",
    a: "In many cases, yes. For example, Science students can shift to Commerce or Humanities courses, and Commerce students can shift to Humanities. Our assessment accounts for these flexible pathways."
  },
  {
    q: "Do you provide syllabus details for the entrance exams?",
    a: "The Exams directory provides an overview. Detailed syllabi can be found on the respective official examination websites."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-32 z-10 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter mb-16 text-center text-white">
          Common Questions
        </h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 rounded-2xl overflow-hidden glass-panel"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-xl font-heading font-bold text-white pr-8">{faq.q}</span>
                <span className={`text-2xl text-neutral-500 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-neutral-400 font-sans leading-relaxed border-t border-white/5 pt-4 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
