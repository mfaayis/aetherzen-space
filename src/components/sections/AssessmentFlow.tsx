"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 1,
    question: "What is your 12th-grade stream?",
    multiSelect: false,
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
    multiSelect: true,
    options: [
      { id: "tech", label: "Technology & Code", icon: "💻" },
      { id: "art", label: "Design & Creativity", icon: "🎨" },
      { id: "business", label: "Business & Management", icon: "📈" },
      { id: "helping", label: "Healthcare & Society", icon: "🤝" },
      { id: "finance", label: "Finance & Markets", icon: "💰" },
      { id: "media", label: "Media & Writing", icon: "📝" },
      { id: "science", label: "Pure Science & Research", icon: "🔬" },
      { id: "law", label: "Law & Justice", icon: "⚖️" },
      { id: "environment", label: "Nature & Environment", icon: "🌿" },
    ],
  },
  {
    id: 3,
    question: "What are your strongest skills?",
    multiSelect: true,
    options: [
      { id: "logic", label: "Logic & Math", icon: "🧩" },
      { id: "empathy", label: "Understanding People", icon: "❤️" },
      { id: "creativity", label: "Out of the box thinking", icon: "💡" },
      { id: "leadership", label: "Organizing & Leading", icon: "👑" },
      { id: "data", label: "Data Analysis", icon: "📊" },
      { id: "speaking", label: "Public Speaking", icon: "🎤" },
      { id: "hands_on_skill", label: "Physical Dexterity", icon: "🛠️" },
    ],
  },
  {
    id: 4,
    question: "What is your ideal work environment?",
    multiSelect: true,
    options: [
      { id: "office", label: "Corporate Office", icon: "🏢" },
      { id: "field", label: "Outdoors / On-site", icon: "🌍" },
      { id: "lab", label: "Hospital / Laboratory", icon: "🩺" },
      { id: "remote", label: "Remote / WFH", icon: "🏠" },
      { id: "startup", label: "Fast-paced Startup", icon: "🚀" },
      { id: "studio", label: "Creative Studio", icon: "🎨" },
      { id: "global", label: "Global / Traveling", icon: "✈️" },
    ],
  },
  {
    id: 5,
    question: "What is your preferred working style?",
    multiSelect: true,
    options: [
      { id: "independent", label: "Deep Independent Work", icon: "🎧" },
      { id: "team", label: "Highly Collaborative", icon: "👥" },
      { id: "hands_on", label: "Hands-on & Practical", icon: "🔨" },
      { id: "analytical", label: "Research & Analysis", icon: "🔍" },
      { id: "process", label: "Structured & Process-driven", icon: "📋" },
    ],
  },
];

const courseDatabase = [
  // Engineering & Tech
  { title: "B.Tech Computer Science", desc: "Software engineering and algorithms.", streams: ["pcm"], tags: ["tech", "logic", "remote", "independent", "startup"] },
  { title: "B.Tech Artificial Intelligence", desc: "Machine learning and data processing.", streams: ["pcm"], tags: ["tech", "data", "logic", "analytical", "startup"] },
  { title: "B.Tech Civil Engineering", desc: "Infrastructure and construction.", streams: ["pcm"], tags: ["tech", "field", "hands_on_skill", "team", "hands_on"] },
  { title: "B.Tech Mechanical Eng", desc: "Machinery and physical systems.", streams: ["pcm"], tags: ["tech", "logic", "hands_on", "hands_on_skill", "office", "startup"] },
  { title: "B.Architecture", desc: "Building design and structure.", streams: ["pcm"], tags: ["art", "tech", "creativity", "studio", "independent"] },
  { title: "BCA / MCA", desc: "Software application development.", streams: ["pcm", "commerce"], tags: ["tech", "logic", "remote", "independent"] },
  { title: "Data Science", desc: "Statistics and big data.", streams: ["pcm", "commerce"], tags: ["tech", "finance", "data", "logic", "analytical", "office", "remote"] },

  // Medical
  { title: "MBBS", desc: "General medicine and surgery.", streams: ["pcb"], tags: ["helping", "science", "empathy", "lab", "team", "hands_on", "process"] },
  { title: "BDS (Dentistry)", desc: "Dental surgery and care.", streams: ["pcb"], tags: ["helping", "science", "hands_on_skill", "lab", "independent"] },
  { title: "B.Sc Nursing", desc: "Patient care and medical support.", streams: ["pcb"], tags: ["helping", "empathy", "lab", "team", "process"] },
  { title: "B.Pharmacy", desc: "Drug research and chemistry.", streams: ["pcb"], tags: ["science", "helping", "lab", "analytical", "process"] },
  { title: "B.Sc Biotechnology", desc: "Genetic and biological tech.", streams: ["pcb", "pcm"], tags: ["tech", "science", "lab", "analytical", "independent"] },

  // Commerce & Business
  { title: "Chartered Accountancy (CA)", desc: "Elite accounting and auditing.", streams: ["commerce"], tags: ["finance", "business", "data", "logic", "office", "analytical", "process"] },
  { title: "BBA / BBM", desc: "Business management and operations.", streams: ["commerce", "humanities"], tags: ["business", "leadership", "office", "team", "global"] },
  { title: "B.Com (Hons)", desc: "Finance and accounting foundations.", streams: ["commerce"], tags: ["finance", "business", "data", "office", "process"] },
  { title: "B.A. Economics", desc: "Market trends and fiscal policies.", streams: ["commerce", "humanities"], tags: ["finance", "science", "data", "analytical", "office"] },
  { title: "Digital Marketing", desc: "Online branding and growth.", streams: ["commerce", "humanities", "pcm"], tags: ["media", "business", "creativity", "remote", "startup"] },

  // Humanities & Law
  { title: "BA LLB (Law)", desc: "Legal practice and advocacy.", streams: ["humanities", "commerce", "pcm", "pcb"], tags: ["law", "speaking", "logic", "empathy", "office", "analytical"] },
  { title: "B.A. Psychology", desc: "Study of human behavior.", streams: ["humanities", "pcb"], tags: ["helping", "science", "empathy", "office", "remote", "analytical"] },
  { title: "Journalism & Mass Comm", desc: "News, media, and storytelling.", streams: ["humanities", "commerce"], tags: ["media", "speaking", "creativity", "field", "team", "startup"] },
  { title: "B.Des / Fine Arts", desc: "Visual arts and design.", streams: ["humanities", "commerce", "pcm"], tags: ["art", "creativity", "hands_on_skill", "remote", "independent", "studio"] },
  { title: "B.A. Political Science", desc: "Governance and civil services.", streams: ["humanities"], tags: ["law", "leadership", "speaking", "office", "process"] },
  { title: "Hotel Management", desc: "Hospitality and tourism.", streams: ["humanities", "commerce"], tags: ["business", "helping", "empathy", "team", "global", "hands_on"] },
  
  // Niche / General
  { title: "Environmental Science", desc: "Sustainability and ecology.", streams: ["pcb", "pcm", "humanities"], tags: ["environment", "science", "field", "analytical", "global"] },
  { title: "Foreign Languages", desc: "Translation and diplomacy.", streams: ["humanities", "commerce", "pcm", "pcb"], tags: ["speaking", "empathy", "global", "independent", "remote"] },
];

const getRecommendations = (answers: string[][]) => {
  if (!answers || answers.length === 0) return [];

  // Q1 is stream (single select, but stored as array for consistency)
  const stream = answers[0][0]; 
  
  // Flatten all other tags into one array
  const userTags = answers.slice(1).flat();

  // Filter courses by stream, then score them based on matching tags
  const scoredCourses = courseDatabase
    .filter(course => course.streams.includes(stream))
    .map(course => {
      let score = 0;
      course.tags.forEach(tag => {
        if (userTags.includes(tag)) score += 1;
      });
      return { ...course, score };
    })
    // Sort descending by score
    .sort((a, b) => b.score - a.score);

  // Return top 4
  return scoredCourses.slice(0, 4).map(c => ({
    title: c.title,
    match: Math.min(100, 80 + (c.score * 5)) + "%", 
    desc: c.desc
  }));
};

export function AssessmentFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleSelect = (optionId: string) => {
    if (!currentQuestion.multiSelect) {
      // Single select instantly advances
      const newAnswers = [...answers, [optionId]];
      setAnswers(newAnswers);
      if (currentStep < questions.length - 1) {
        setCurrentStep(curr => curr + 1);
        setCurrentSelections([]);
      } else {
        setIsComplete(true);
      }
    } else {
      // Multi select toggles the option
      setCurrentSelections(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers, currentSelections];
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(curr => curr + 1);
      setCurrentSelections([]);
    } else {
      setIsComplete(true);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers([]);
    setCurrentSelections([]);
    setIsComplete(false);
  };

  const results = isComplete ? getRecommendations(answers) : [];

  return (
    <section id="assessment" className="relative w-full min-h-screen py-32 flex flex-col items-center justify-center bg-black/50 z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-5xl w-full mx-auto px-6 relative pt-20">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-4">
                <span className="text-neutral-500 font-mono tracking-widest uppercase text-sm flex justify-between items-center">
                  <span>Question 0{currentStep + 1} / 0{questions.length}</span>
                  {currentQuestion.multiSelect && <span className="text-blue-400">Select multiple</span>}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter text-white leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentSelections.includes(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(opt.id)}
                      className={`glass-panel p-5 rounded-2xl flex items-center gap-4 text-left group border transition-colors ${
                        isSelected 
                          ? "border-blue-500 bg-blue-500/10" 
                          : "border-white/10 hover:bg-white/5"
                      }`}
                    >
                      <span className={`text-2xl filter transition-all duration-300 ${isSelected ? "grayscale-0" : "grayscale group-hover:grayscale-0"}`}>
                        {opt.icon}
                      </span>
                      <span className={`text-lg md:text-xl font-heading transition-colors ${isSelected ? "text-white font-bold" : "text-neutral-300 group-hover:text-white"}`}>
                        {opt.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Continue Button for Multi-Select */}
              {currentQuestion.multiSelect && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleNext}
                    disabled={currentSelections.length === 0}
                    className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Continue
                  </button>
                </div>
              )}
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
                  Based on your unique combination of {answers.slice(1).flat().length} specific interests and traits, here are your mathematically optimal paths.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {results.map((res, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                    className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-blue-500/20 overflow-hidden group hover:border-blue-500/50 transition-colors"
                  >
                    <div className="absolute top-0 right-0 p-4 md:p-6">
                      <span className="text-2xl md:text-3xl font-heading font-bold text-blue-500/30 group-hover:text-blue-500/60 transition-colors">
                        {res.match}
                      </span>
                    </div>
                    <div className="flex flex-col h-full justify-between gap-4 z-10 relative">
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

              <div className="flex justify-center mt-8 gap-6">
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
