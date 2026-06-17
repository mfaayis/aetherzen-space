"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 1,
    question: "What is your 12th-grade stream?",
    options: [
      { id: "pcm", label: "Science (PCM)", icon: "📐" },
      { id: "pcb", label: "Science (PCB)", icon: "🧬" },
      { id: "commerce", label: "Commerce", icon: "📊" },
      { id: "humanities", label: "Arts / Humanities", icon: "🎭" },
    ],
  },
  {
    id: 2,
    question: "What excites you the most?",
    options: [
      { id: "tech", label: "Technology & Code", icon: "💻" },
      { id: "art", label: "Design & Creativity", icon: "🎨" },
      { id: "business", label: "Business & Management", icon: "📈" },
      { id: "helping", label: "Healthcare & Society", icon: "🤝" },
    ],
  },
  {
    id: 3,
    question: "What is your strongest skill?",
    options: [
      { id: "logic", label: "Problem Solving & Math", icon: "🧩" },
      { id: "empathy", label: "Understanding People", icon: "❤️" },
      { id: "creativity", label: "Out of the box thinking", icon: "💡" },
      { id: "leadership", label: "Organizing & Leading", icon: "👑" },
    ],
  },
  {
    id: 4,
    question: "What is your ideal work environment?",
    options: [
      { id: "office", label: "Corporate Office", icon: "🏢" },
      { id: "field", label: "Outdoors / On-site", icon: "🌍" },
      { id: "lab", label: "Hospital / Laboratory", icon: "🔬" },
      { id: "remote", label: "Remote / Studio", icon: "🏠" },
    ],
  },
  {
    id: 5,
    question: "What is your preferred working style?",
    options: [
      { id: "independent", label: "Deep Independent Work", icon: "🎧" },
      { id: "team", label: "Highly Collaborative", icon: "👥" },
      { id: "hands_on", label: "Hands-on & Practical", icon: "🛠️" },
      { id: "analytical", label: "Research & Analysis", icon: "📊" },
    ],
  },
];

// Complex recommendation logic based on stream
const getRecommendations = (answers: string[]) => {
  const [stream, interest, skill, environment, style] = answers;

  if (stream === "pcm") {
    if (interest === "tech" || style === "independent") {
      if (environment === "remote") return [{ title: "B.Tech Computer Science", match: "99%", desc: "Perfect for deep independent coding work in a remote or modern tech setting." }, { title: "BCA / MCA", match: "94%", desc: "A great alternative pathway to software engineering." }];
      if (skill === "logic") return [{ title: "B.Tech Artificial Intelligence", match: "97%", desc: "Ideal for highly logical problem solvers looking to build the future." }, { title: "Data Science", match: "95%", desc: "Focuses heavily on algorithms and statistics." }];
    }
    if (environment === "field" || style === "hands_on") {
      return [{ title: "B.Tech Civil Engineering", match: "98%", desc: "Excellent for those who prefer hands-on, outdoor, and on-site project management." }, { title: "B.Tech Mechanical Engineering", match: "95%", desc: "Focuses on practical machinery and systems." }];
    }
    if (interest === "art" || skill === "creativity") {
      return [{ title: "B.Architecture", match: "96%", desc: "Combines strict math with boundless creativity." }, { title: "Industrial Design", match: "90%", desc: "Engineer physical products." }];
    }
    return [{ title: "B.Tech Electronics & Communication", match: "92%", desc: "A strong core engineering field with vast opportunities." }, { title: "B.Sc Physics/Maths", match: "88%", desc: "For those deeply interested in pure sciences." }];
  }

  if (stream === "pcb") {
    if (interest === "helping" || environment === "lab") {
      if (style === "hands_on") return [{ title: "MBBS / BDS", match: "99%", desc: "The direct path to becoming a hands-on medical professional." }, { title: "B.Sc Nursing", match: "96%", desc: "Highly demanded globally with direct patient care." }];
      if (style === "analytical") return [{ title: "B.Pharmacy", match: "95%", desc: "Focuses on chemical research and medicine formulation." }, { title: "Medical Laboratory Technology", match: "92%", desc: "Crucial diagnostic work behind the scenes." }];
    }
    if (interest === "tech") {
      return [{ title: "B.Sc Biotechnology", match: "98%", desc: "Fuses biology with cutting-edge technological research." }, { title: "Bioinformatics", match: "94%", desc: "Data analysis applied to biological sciences." }];
    }
    return [{ title: "BPT (Physiotherapy)", match: "93%", desc: "Hands-on healthcare focused on physical rehabilitation." }, { title: "B.Sc Psychology", match: "89%", desc: "Explore the science of the human mind." }];
  }

  if (stream === "commerce") {
    if (interest === "business" || skill === "leadership") {
      if (style === "analytical" || skill === "logic") return [{ title: "Chartered Accountancy (CA)", match: "98%", desc: "The ultimate prestige for commerce students with strong analytical skills." }, { title: "B.Com (Hons)", match: "94%", desc: "A solid foundation for finance and accounting." }];
      if (environment === "office") return [{ title: "BBA / BBM", match: "96%", desc: "Perfect for future corporate leaders and managers." }, { title: "Company Secretary (CS)", match: "92%", desc: "Focus on corporate governance and law." }];
    }
    if (skill === "creativity" || interest === "art") {
      return [{ title: "BBA Marketing", match: "97%", desc: "Combines business acumen with creative campaign strategies." }, { title: "Digital Business", match: "93%", desc: "Focuses on e-commerce and digital growth." }];
    }
    return [{ title: "B.A. Economics", match: "95%", desc: "For those fascinated by markets, trends, and fiscal policies." }, { title: "Banking & Finance", match: "91%", desc: "Dive deep into the banking sector." }];
  }

  if (stream === "humanities") {
    if (interest === "art" || environment === "remote") {
      if (skill === "creativity") return [{ title: "B.Des / Fine Arts", match: "99%", desc: "Ideal for highly creative humanities students looking to build portfolios." }, { title: "Journalism & Mass Comm", match: "95%", desc: "Storytelling across digital and print media." }];
    }
    if (interest === "helping" || skill === "empathy") {
      return [{ title: "B.A. Psychology", match: "98%", desc: "A top choice for understanding human behavior and therapy." }, { title: "BA LLB (Law)", match: "96%", desc: "Advocate for justice and societal change." }];
    }
    if (skill === "leadership" || environment === "office") {
      return [{ title: "B.A. Political Science", match: "95%", desc: "For those interested in governance, policy, and civil services." }, { title: "Hotel Management", match: "90%", desc: "Fast-paced hospitality leadership." }];
    }
    return [{ title: "Liberal Arts", match: "92%", desc: "A flexible program allowing you to study a diverse range of subjects." }, { title: "Foreign Languages", match: "88%", desc: "Opens up global career opportunities." }];
  }

  // Absolute fallback
  return [
    { title: "Career Counseling", match: "100%", desc: "We recommend speaking directly to a counselor for a highly tailored plan." }
  ];
};

export function AssessmentFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      setIsComplete(true);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsComplete(false);
  };

  const results = isComplete ? getRecommendations(answers) : [];

  return (
    <section id="assessment" className="relative w-full min-h-screen py-32 flex flex-col items-center justify-center bg-black/50 z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-4xl w-full mx-auto px-6 relative pt-20">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-12"
            >
              <div className="flex flex-col gap-4">
                <span className="text-neutral-500 font-mono tracking-widest uppercase text-sm">
                  Question 0{currentStep + 1} / 0{questions.length}
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter text-white">
                  {questions[currentStep].question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questions[currentStep].options.map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.id)}
                    className="glass-panel p-5 md:p-8 rounded-2xl flex flex-col items-start gap-4 text-left group border border-white/10 transition-colors"
                  >
                    <span className="text-3xl md:text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                      {opt.icon}
                    </span>
                    <span className="text-xl md:text-2xl font-heading text-neutral-300 group-hover:text-white transition-colors">
                      {opt.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-12"
            >
              <div className="flex flex-col gap-4 text-center items-center">
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-mono text-sm uppercase tracking-widest border border-white/20 mb-4">
                  Assessment Complete
                </span>
                <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter text-white">
                  Your Blueprint
                </h2>
                <p className="text-neutral-400 font-sans text-lg max-w-xl">
                  Based on your {answers[0].toUpperCase()} stream and preferences, here are the optimal educational pathways tailored for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {results.map((res, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                    className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 md:p-6">
                      <span className="text-2xl md:text-3xl font-heading font-bold text-white/20 group-hover:text-white/40 transition-colors">
                        {res.match}
                      </span>
                    </div>
                    <div className="flex flex-col h-full justify-between gap-6 md:gap-8 z-10 relative">
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight w-3/4">
                        {res.title}
                      </h3>
                      <p className="text-neutral-400 font-sans leading-relaxed">
                        {res.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-12 gap-6">
                <button
                  onClick={resetAssessment}
                  className="px-6 py-3 rounded-full text-neutral-400 hover:text-white border border-neutral-800 hover:border-white/30 transition-all font-sans text-sm tracking-widest uppercase"
                >
                  Retake Assessment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
