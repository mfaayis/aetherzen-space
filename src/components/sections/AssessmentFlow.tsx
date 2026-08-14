"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Copy, Check, Loader2, Clock, Wallet, Briefcase } from "lucide-react";
import { generateBlueprintPDF, BlueprintResult } from "@/lib/generatePDF";
import { assessmentQuestions as questions } from "@/data/assessmentQuestions";
import { calculateStudentVector, scoreCourses } from "@/lib/matching";

export function AssessmentFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<BlueprintResult[]>([]);
  const [isSharedView, setIsSharedView] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", location: "" });

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
            setIsDetailsSubmitted(true); // skip details for shared view
            generateFinalBlueprint(decoded);
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
      const newAnswers = [...answers, [optionId]];
      setAnswers(newAnswers);
      if (currentStep < questions.length - 1) {
        setCurrentStep(curr => curr + 1);
        setCurrentSelections([]);
      } else {
        setIsComplete(true);
      }
    } else {
      setCurrentSelections(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleNext = async () => {
    const newAnswers = [...answers, currentSelections];
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(curr => curr + 1);
      setCurrentSelections([]);
    } else {
      setIsComplete(true);
      await generateFinalBlueprint(newAnswers);
    }
  };

  const generateFinalBlueprint = async (finalAnswers: string[][]) => {
    setIsCalculating(true);
    
    const studentVector = calculateStudentVector(finalAnswers, questions);
    const streamId = finalAnswers[0][0]; 
    
    let courseData = [];
    try {
      const fetchRes = await fetch("/data/courseTags.json");
      if (fetchRes.ok) {
        courseData = await fetchRes.json();
      }
    } catch (err) {
      console.error("Failed to load massive course database", err);
    }
    
    const topMatches = scoreCourses(studentVector, streamId);
    
    const profileSummary = finalAnswers.map((ans, i) => {
      if (!questions[i]) return "";
      return `Q: ${questions[i].question}\nA: ${ans.map(id => questions[i].options.find(o => o.id === id)?.label).join(", ")}`;
    }).filter(Boolean).join("\n\n");

    const fallbackResults = topMatches.map(match => {
      let topTag = "your core interests";
      let topVal = 0;
      for (const [tag, val] of Object.entries(studentVector)) {
         if (match.tags[tag] && val > topVal) {
            topVal = val;
            topTag = tag.replace(/_/g, " ");
         }
      }
      return {
        title: match.title,
        match: match.matchPercentage,
        desc: `This strongly aligns with your interest in ${topTag} and fits your overall profile.`,
        exams: match.exams || [],
        duration: match.duration,
        costRange: match.costRange,
        salaryRange: match.salaryRange,
        jobStats: match.jobStats,
        coreSubjects: match.coreSubjects,
        careerOutcomes: match.careerOutcomes
      };
    });

    try {
      const res = await fetch("/api/assessment/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentProfile: profileSummary, matches: topMatches })
      });
      
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      
      const parsedExplanations = JSON.parse(data.result);
      
      const finalResults = topMatches.map(match => {
         const aiDescObj = parsedExplanations.find((e: any) => e.title === match.title);
         return {
           title: match.title,
           match: match.matchPercentage,
           desc: aiDescObj ? aiDescObj.explanation : `This aligns perfectly with your skills.`,
           exams: match.exams || [],
           duration: match.duration,
           costRange: match.costRange,
           salaryRange: match.salaryRange,
           jobStats: match.jobStats,
           coreSubjects: match.coreSubjects,
           careerOutcomes: match.careerOutcomes
         };
      });
      setResults(finalResults);
    } catch (err) {
      console.error("AI Generation failed, using fallbacks:", err);
      setResults(fallbackResults);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers([]);
    setCurrentSelections([]);
    setIsComplete(false);
    setIsSharedView(false);
    setIsDetailsSubmitted(false);
    setUserInfo({ name: "", email: "", location: "" });
    
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("blueprint");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email && userInfo.location) {
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: userInfo.name, email: userInfo.email })
        });
      } catch (err) {
        console.error("Failed to save lead", err);
      }
      setIsDetailsSubmitted(true);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateBlueprintPDF(results, userInfo);
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
          ) : !isDetailsSubmitted ? (
            <motion.div
              key="details-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-10 max-w-2xl mx-auto"
            >
              <div className="flex flex-col gap-4 text-center">
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-mono text-sm uppercase tracking-widest border border-white/20 mx-auto">
                  Almost Done
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter text-white leading-tight">
                  Where should we send your blueprint?
                </h2>
                <p className="text-neutral-400 font-sans text-lg">
                  Enter your details to generate your personalized career PDF.
                </p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-neutral-400 font-sans text-sm uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    required
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-sans"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-neutral-400 font-sans text-sm uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    required
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-sans"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-neutral-400 font-sans text-sm uppercase tracking-widest">Location</label>
                  <input
                    type="text"
                    required
                    value={userInfo.location}
                    onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-sans"
                    placeholder="City, State"
                  />
                </div>
                
                <button
                  type="submit"
                  className="mt-4 w-full py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  View & Download Blueprint
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-12 w-full"
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
                {!isSharedView && (
                  <div className="mt-4 flex flex-wrap justify-center gap-4 border-t border-white/10 pt-6 w-full max-w-2xl">
                    <div className="text-center px-4">
                      <div className="text-neutral-500 text-xs uppercase tracking-widest font-mono mb-1">Prepared For</div>
                      <div className="text-white font-sans text-lg">{userInfo.name}</div>
                    </div>
                    <div className="text-center px-4 border-l border-white/10">
                      <div className="text-neutral-500 text-xs uppercase tracking-widest font-mono mb-1">Location</div>
                      <div className="text-white font-sans text-lg">{userInfo.location}</div>
                    </div>
                    <div className="text-center px-4 border-l border-white/10">
                      <div className="text-neutral-500 text-xs uppercase tracking-widest font-mono mb-1">Email</div>
                      <div className="text-white font-sans text-lg">{userInfo.email}</div>
                    </div>
                  </div>
                )}
              </div>

              {isCalculating ? (
                <div className="flex flex-col items-center justify-center py-20 gap-6">
                  <Loader2 size={48} className="text-blue-500 animate-spin" />
                  <h3 className="text-2xl font-heading text-white">Calculating Math Matrix & AI Analysis...</h3>
                  <p className="text-neutral-500 font-sans text-sm">Please wait while we generate your personalized blueprint.</p>
                </div>
              ) : (
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
                      <div className="flex flex-col gap-2">
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight w-3/4">
                          {res.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {res.duration && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium">
                              <Clock size={12} className="text-blue-400" /> {res.duration}
                            </span>
                          )}
                          {res.salaryRange && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium">
                              <Wallet size={12} className="text-emerald-400" /> {res.salaryRange}
                            </span>
                          )}
                          {res.jobStats && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium">
                              <Briefcase size={12} className="text-purple-400" /> {res.jobStats}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-neutral-400 font-sans leading-relaxed text-sm">
                        {res.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF || isCalculating}
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
