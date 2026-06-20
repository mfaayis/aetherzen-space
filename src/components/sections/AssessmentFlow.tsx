"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Copy, Check } from "lucide-react";
import { courseCategories } from "@/data/courses";
import { generateBlueprintPDF } from "@/lib/generatePDF";

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
      { id: "aviation", label: "Aviation & Transport", icon: "✈️" },
      { id: "defence", label: "Defence & Military", icon: "🪖" },
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

// Map each category to core streams and tags
const categoryTagMap: Record<string, { streams: string[], tags: string[] }> = {
  "Engineering and Technology": { streams: ["pcm"], tags: ["tech", "logic", "analytical", "office", "startup"] },
  "Medical and Allied Health Sciences": { streams: ["pcb"], tags: ["science", "helping", "lab", "hands_on", "process", "empathy"] },
  "Commerce and Management": { streams: ["commerce", "humanities"], tags: ["business", "finance", "data", "leadership", "office", "global"] },
  "Pure Science": { streams: ["pcm", "pcb"], tags: ["science", "analytical", "independent", "lab", "logic"] },
  "Computer and IT Courses": { streams: ["pcm", "commerce"], tags: ["tech", "logic", "remote", "independent", "startup", "data"] },
  "Law": { streams: ["humanities", "commerce", "pcm", "pcb"], tags: ["law", "speaking", "logic", "empathy", "office", "analytical"] },
  "Aviation": { streams: ["pcm", "commerce", "humanities"], tags: ["aviation", "global", "hands_on_skill", "process", "field"] },
  "Arts, Humanities and Social Sciences": { streams: ["humanities", "commerce", "pcb"], tags: ["media", "speaking", "creativity", "independent", "empathy", "analytical"] },
  "Design and Creative Arts": { streams: ["humanities", "commerce", "pcm"], tags: ["art", "creativity", "studio", "remote", "independent", "hands_on_skill"] },
  "Hospitality and Tourism": { streams: ["humanities", "commerce"], tags: ["business", "helping", "team", "global", "hands_on"] },
  "Agriculture and Environment": { streams: ["pcb", "pcm"], tags: ["environment", "science", "field", "hands_on", "independent"] },
  "Defence and Uniform Services": { streams: ["pcm", "pcb", "humanities"], tags: ["defence", "leadership", "field", "team", "process", "hands_on_skill"] },
  "Diploma Courses": { streams: ["pcm", "commerce", "humanities"], tags: ["hands_on_skill", "hands_on", "startup"] },
  "Foreign Language Courses": { streams: ["humanities", "commerce", "pcm", "pcb"], tags: ["speaking", "global", "remote", "empathy"] },
  "Modern Skill-Based Courses": { streams: ["commerce", "humanities", "pcm"], tags: ["tech", "media", "business", "remote", "startup", "independent", "creativity"] },
  "Government Career Preparation": { streams: ["humanities", "commerce", "pcm", "pcb"], tags: ["process", "analytical", "office", "logic"] },
};

// Flatten all 150+ courses into a massive scored database
const expandedCourseDatabase = courseCategories.flatMap(category => {
  const meta = categoryTagMap[category.title] || { streams: ["pcm", "pcb", "commerce", "humanities"], tags: [] };
  return category.courses.map(courseName => ({
    title: courseName,
    desc: `A specialized professional program in the ${category.title} sector.`,
    streams: meta.streams,
    tags: meta.tags
  }));
});

const getRecommendations = (answers: string[][]) => {
  if (!answers || answers.length === 0) return [];

  // Q1 is stream (single select, but stored as array for consistency)
  const stream = answers[0][0]; 
  
  // Flatten all other tags into one array
  const userTags = answers.slice(1).flat();

  // Filter courses by stream, then score them based on matching tags
  const scoredCourses = expandedCourseDatabase
    .filter(course => course.streams.includes(stream))
    .map(course => {
      let score = 0;
      course.tags.forEach(tag => {
        if (userTags.includes(tag)) score += 1;
      });
      // Add slight random variance to break ties dynamically
      score += Math.random() * 0.5;
      return { ...course, score };
    })
    // Sort descending by score
    .sort((a, b) => b.score - a.score);

  // Return top 4 matches
  return scoredCourses.slice(0, 4).map(c => ({
    title: c.title,
    match: Math.min(99, 80 + Math.floor(c.score * 5)) + "%", 
    desc: c.desc
  }));
};

export function AssessmentFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const blueprintData = params.get("blueprint");
      if (blueprintData) {
        try {
          const decoded = JSON.parse(atob(blueprintData));
          if (Array.isArray(decoded) && decoded.length > 0) {
            setAnswers(decoded);
            setIsComplete(true);
            setIsSharedView(true);
          }
        } catch (e) {
          console.error("Failed to parse blueprint data");
        }
      }
    }
  }, []);

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
    setIsSharedView(false);
    
    // Clear the URL parameter silently
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("blueprint");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const results = isComplete ? getRecommendations(answers) : [];

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateBlueprintPDF(results);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = async () => {
    try {
      const encodedAnswers = btoa(JSON.stringify(answers));
      const url = new URL(window.location.href);
      url.searchParams.set("blueprint", encodedAnswers);
      const shareUrl = url.toString();

      if (navigator.share) {
        await navigator.share({
          title: "My Career Blueprint",
          text: "Check out my personalized career blueprint from NextStep!",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing", error);
    }
  };

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

              <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all font-sans text-sm tracking-widest uppercase flex items-center justify-center gap-2 font-bold disabled:opacity-50"
                >
                  <Download size={16} />
                  {isGeneratingPDF ? "Generating..." : "Download PDF"}
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all font-sans text-sm tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  {copySuccess ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
                  {copySuccess ? "Link Copied!" : "Share Result"}
                </button>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={resetAssessment}
                  className="px-6 py-3 rounded-full text-neutral-400 hover:text-white border border-transparent hover:border-white/30 transition-all font-sans text-xs tracking-widest uppercase"
                >
                  {isSharedView ? "Take Your Own Assessment" : "Retake Assessment"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
