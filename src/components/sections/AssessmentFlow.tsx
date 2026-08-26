"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Share2, Check, Loader2, ChevronDown, ChevronUp,
  CheckCircle2, AlertTriangle, Briefcase, Clock, ArrowRight, RefreshCw,
} from "lucide-react";
import { generateBlueprintPDF } from "@/lib/generatePDF";
import { EnrichedResult, buildUserProfile, rankAndSelectResults, getScoreLabel } from "@/lib/assessmentEngine";
import { assessmentQuestions as questions } from "@/data/assessmentQuestions";
import { courseTags } from "@/data/courseTags";

// ── TYPES ─────────────────────────────────────────────────────────────────────

interface UserInfo {
  name: string;
  email: string;
  location: string;
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function getConfidenceColor(c: string) {
  if (c === "High") return "text-emerald-400";
  if (c === "Moderate") return "text-amber-400";
  return "text-red-400";
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-blue-400";
  if (score >= 55) return "text-amber-400";
  return "text-neutral-400";
}

function getLabelAccent(label: string) {
  const map: Record<string, string> = {
    "Best Match":             "from-blue-600/30 to-blue-500/10 border-blue-500/40",
    "Strong Alternative":    "from-indigo-600/30 to-indigo-500/10 border-indigo-500/40",
    "Alternative Career Path":"from-violet-600/30 to-violet-500/10 border-violet-500/40",
    "Safe / Stable Option":  "from-emerald-600/30 to-emerald-500/10 border-emerald-500/40",
    "High-Growth Option":    "from-amber-600/30 to-amber-500/10 border-amber-500/40",
    "Entrepreneurial Option":"from-rose-600/30 to-rose-500/10 border-rose-500/40",
  };
  return map[label] || "from-white/5 to-white/[0.02] border-white/10";
}

function getLabelBadge(label: string) {
  const map: Record<string, string> = {
    "Best Match":             "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Strong Alternative":    "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    "Alternative Career Path":"bg-violet-500/20 text-violet-300 border-violet-500/30",
    "Safe / Stable Option":  "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "High-Growth Option":    "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Entrepreneurial Option":"bg-rose-500/20 text-rose-300 border-rose-500/30",
  };
  return map[label] || "bg-white/10 text-white border-white/20";
}

// ── FACTOR BAR ────────────────────────────────────────────────────────────────

function FactorBar({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-neutral-500 text-xs font-mono w-24 shrink-0 uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${accent}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <span className="text-white text-xs font-mono w-8 text-right shrink-0">{value}%</span>
    </div>
  );
}

// ── RESULT CARD ───────────────────────────────────────────────────────────────

function ResultCard({
  result,
  index,
  isExpanded,
  onToggle,
  isTopResult,
}: {
  result: EnrichedResult;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isTopResult: boolean;
}) {
  const accentClass = getLabelAccent(result.resultLabel);
  const badgeClass = getLabelBadge(result.resultLabel);
  const scoreColor = getScoreColor(result.overallScore);
  const confColor = getConfidenceColor(result.confidence);

  const barAccent =
    result.overallScore >= 85 ? "bg-blue-500" :
    result.overallScore >= 70 ? "bg-indigo-500" :
    result.overallScore >= 55 ? "bg-amber-500" : "bg-neutral-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
      className={`relative rounded-3xl bg-gradient-to-br ${accentClass} border overflow-hidden transition-colors`}
    >
      {/* ── CARD HEADER ── */}
      <div
        className="p-6 md:p-8 cursor-pointer select-none"
        onClick={onToggle}
        role="button"
        aria-expanded={isExpanded}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {/* Label badge */}
            <span className={`inline-flex items-center self-start px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
              {result.resultLabel}
            </span>
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight leading-tight">
              {result.title}
            </h3>
            {/* Category */}
            <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">{result.category}</p>
          </div>

          {/* Score + expand */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className={`text-3xl md:text-4xl font-heading font-bold tabular-nums ${scoreColor}`}>
                {result.matchPercentage}
              </div>
              <div className="text-neutral-500 text-xs mt-0.5">{getScoreLabel(result.overallScore)}</div>
              <div className={`text-xs font-semibold mt-0.5 ${confColor}`}>
                {result.confidence} confidence
              </div>
            </div>
            <div className="text-neutral-500 hover:text-white transition-colors">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="flex flex-wrap gap-2 mt-4">
          {result.duration && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
              <Clock size={11} className="text-blue-400" /> {result.duration}
            </span>
          )}
          {result.exams?.slice(0, 2).map((exam) => (
            <span key={exam} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
              {exam}
            </span>
          ))}
          {result.careerPaths?.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
              <Briefcase size={11} className="text-purple-400" /> {result.careerPaths.length} career paths
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-neutral-400 text-sm font-sans leading-relaxed mt-4">
          {result.desc}
        </p>
      </div>

      {/* ── EXPANDED CONTENT ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 flex flex-col gap-8 border-t border-white/5 pt-6">

              {/* Factor Breakdown */}
              <div>
                <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-4">Match Breakdown</p>
                <div className="flex flex-col gap-3">
                  <FactorBar label="Interest"    value={result.factorScores.interest}    accent={barAccent} />
                  <FactorBar label="Aptitude"    value={result.factorScores.aptitude}    accent={barAccent} />
                  <FactorBar label="Work Style"  value={result.factorScores.workStyle}   accent={barAccent} />
                  <FactorBar label="Environment" value={result.factorScores.environment} accent={barAccent} />
                  <FactorBar label="Education"   value={result.factorScores.education}   accent={barAccent} />
                  <div className="flex items-center gap-3 pt-1 border-t border-white/5 mt-1">
                    <span className="text-white text-xs font-mono w-24 shrink-0 uppercase tracking-wider font-bold">Overall</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${barAccent}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.overallScore}%` }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                      />
                    </div>
                    <span className={`text-sm font-mono font-bold w-8 text-right shrink-0 ${scoreColor}`}>{result.overallScore}%</span>
                  </div>
                </div>
              </div>

              {/* Two-column: Why It Fits + Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Why It Fits */}
                {result.whyItFits?.length > 0 && (
                  <div>
                    <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-3">Why It Fits</p>
                    <div className="flex flex-col gap-2">
                      {result.whyItFits.map((w, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span className="text-neutral-300 text-sm font-sans leading-relaxed">{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {result.challenges?.length > 0 && (
                  <div>
                    <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-3">Potential Challenges</p>
                    <div className="flex flex-col gap-2">
                      {result.challenges.map((c, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
                          <span className="text-neutral-400 text-sm font-sans leading-relaxed">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Career Paths */}
              {result.careerPaths?.length > 0 && (
                <div>
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-3">Possible Careers</p>
                  <div className="flex flex-wrap gap-2">
                    {result.careerPaths.map((cp) => (
                      <span key={cp} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-200 font-sans">
                        {cp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Indicative Salary */}
              {(result.salaryEntry || result.salaryMid || result.salaryExperienced) && (
                <div>
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-3">
                    Indicative Salary Range
                    <span className="ml-2 text-neutral-600 normal-case font-sans">(figures vary by role, college & employer)</span>
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {result.salaryEntry && (
                      <div className="flex flex-col gap-0.5">
                        <span className="text-neutral-600 text-xs font-mono uppercase">Entry Level</span>
                        <span className="text-white text-sm font-semibold">{result.salaryEntry}</span>
                      </div>
                    )}
                    {result.salaryMid && (
                      <div className="flex flex-col gap-0.5">
                        <span className="text-neutral-600 text-xs font-mono uppercase">Mid-Career</span>
                        <span className="text-white text-sm font-semibold">{result.salaryMid}</span>
                      </div>
                    )}
                    {result.salaryExperienced && (
                      <div className="flex flex-col gap-0.5">
                        <span className="text-neutral-600 text-xs font-mono uppercase">Experienced</span>
                        <span className="text-white text-sm font-semibold">{result.salaryExperienced}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Skills to Develop */}
              {result.skillsToDevelop?.length > 0 && (
                <div>
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-3">Skills to Start Developing</p>
                  <div className="flex flex-wrap gap-2">
                    {result.skillsToDevelop.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 font-sans">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* What To Do Next — only for top result */}
              {isTopResult && result.nextSteps?.length > 0 && (
                <div>
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-4">What To Do Next</p>
                  <div className="flex flex-col gap-3">
                    {result.nextSteps.map((step, si) => (
                      <div key={si} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-blue-400 text-xs font-mono font-bold">{si + 1}</span>
                        </div>
                        <span className="text-neutral-300 text-sm font-sans leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export function AssessmentFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<EnrichedResult[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(0); // top result expanded by default
  const [isSharedView, setIsSharedView] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "", location: "" });
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [profileChips, setProfileChips] = useState<string[]>([]);

  // Shared-blueprint support
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
            setIsDetailsSubmitted(true);
            runLocalScoring(decoded);
          }
        } catch (e) {
          console.error("Failed to parse blueprint data");
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = questions[currentStep];

  // ── ANSWER HANDLING ──────────────────────────────────────────────────────────

  const handleSelect = (optionId: string) => {
    if (!currentQuestion.multiSelect) {
      const newAnswers = [...answers, [optionId]];
      setAnswers(newAnswers);
      if (currentStep < questions.length - 1) {
        setCurrentStep((c) => c + 1);
        setCurrentSelections([]);
      } else {
        setIsComplete(true);
        finalizeAndScore(newAnswers);
      }
    } else {
      setCurrentSelections((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleNext = () => {
    if (currentSelections.length === 0) return;
    const newAnswers = [...answers, currentSelections];
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep((c) => c + 1);
      setCurrentSelections([]);
    } else {
      setIsComplete(true);
      finalizeAndScore(newAnswers);
    }
  };

  // ── SCORING ──────────────────────────────────────────────────────────────────

  const runLocalScoring = (finalAnswers: string[][]) => {
    const profile = buildUserProfile(finalAnswers, questions);
    setProfileChips(profile.profileChips);
    const ranked = rankAndSelectResults(courseTags, profile);
    return ranked;
  };

  const finalizeAndScore = async (finalAnswers: string[][]) => {
    setIsCalculating(true);
    try {
      // Step 1: Local scoring (deterministic, always works)
      const ranked = runLocalScoring(finalAnswers);
      setResults(ranked);

      // Step 2: Optional AI description enrichment (non-blocking, non-critical)
      try {
        const payload = ranked.map((r) => ({
          title: r.title,
          matchPercentage: r.matchPercentage,
          whyItFits: r.whyItFits,
          careerPaths: r.careerPaths,
        }));
        const res = await fetch("/api/assessment/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ results: payload }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.enriched && Array.isArray(data.enriched) && data.enriched.length > 0) {
            setResults((prev) =>
              prev.map((r) => {
                const enriched = data.enriched.find(
                  (e: { title: string; desc: string }) => e.title === r.title
                );
                return enriched?.desc ? { ...r, desc: enriched.desc } : r;
              })
            );
          }
        }
      } catch {
        // Enrichment failed silently — local descriptions are already set
      }
    } catch (err) {
      console.error("Scoring error:", err);
      // Fallback: show empty state
      setResults([]);
    } finally {
      setIsCalculating(false);
    }
  };

  // ── RESET ─────────────────────────────────────────────────────────────────────

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers([]);
    setCurrentSelections([]);
    setIsComplete(false);
    setResults([]);
    setProfileChips([]);
    setExpandedIndex(0);
    setIsSharedView(false);
    setIsDetailsSubmitted(false);
    setUserInfo({ name: "", email: "", location: "" });
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("blueprint");
      window.history.replaceState({}, "", url.toString());
    }
  };

  // ── LOCATION ──────────────────────────────────────────────────────────────────

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await res.json();
          const addr = data.address;
          const loc = [
            addr.neighbourhood || addr.suburb,
            addr.city_district || addr.village,
            addr.city || addr.town,
          ]
            .filter(Boolean)
            .join(", ");
          setUserInfo((prev) => ({ ...prev, location: loc || data.display_name }));
        } catch {
          setLocationError("Could not fetch address");
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        setLocationError("Location permission denied");
      }
    );
  };

  // ── DETAILS SUBMIT ───────────────────────────────────────────────────────────

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email && userInfo.location) {
      const surveyAnswers = answers
        .map((ans, i) => {
          if (!questions[i]) return "";
          return `Q: ${questions[i].question}\nA: ${ans
            .map((id) => questions[i].options.find((o) => o.id === id)?.label)
            .join(", ")}`;
        })
        .filter(Boolean)
        .join("\n\n");

      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            location: userInfo.location,
            recommended_courses: results.map((r) => r.title).join(", "),
            survey_answers: surveyAnswers,
          }),
        });
      } catch {
        // Non-critical
      }
      setIsDetailsSubmitted(true);
    }
  };

  // ── PDF + SHARE ───────────────────────────────────────────────────────────────

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
        await navigator.share({ title: "My Career Blueprint", url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────────

  return (
    <section
      id="assessment"
      className="relative w-full min-h-screen py-32 flex flex-col items-center justify-center bg-black/50 z-10 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-4xl w-full mx-auto px-6 relative pt-20">
        <AnimatePresence mode="wait">

          {/* ════ QUESTION SCREEN ════════════════════════════════════════════════ */}
          {!isComplete ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col gap-10"
            >
              {/* Progress */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-mono tracking-widest uppercase text-xs">
                    Question {currentStep + 1} / {questions.length}
                  </span>
                  {currentQuestion.multiSelect && (
                    <span className="text-blue-400 font-mono text-xs tracking-wider">Select multiple</span>
                  )}
                </div>
                {/* Progress bar */}
                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/30 rounded-full"
                    initial={{ width: `${((currentStep) / questions.length) * 100}%` }}
                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question text */}
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter text-white leading-tight">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.subtext && (
                  <p className="text-neutral-500 font-sans text-base">{currentQuestion.subtext}</p>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentSelections.includes(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(opt.id)}
                      className={`glass-panel p-5 rounded-2xl flex items-center gap-4 text-left group border transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                          : "border-white/10 hover:bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className={`text-2xl transition-all duration-300 ${isSelected ? "" : "grayscale group-hover:grayscale-0"}`}>
                        {opt.icon}
                      </span>
                      <span className={`text-base md:text-lg font-heading font-semibold transition-colors leading-snug ${isSelected ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                        {opt.label}
                      </span>
                      {isSelected && (
                        <CheckCircle2 size={16} className="text-blue-400 ml-auto shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Continue button (multi-select only) */}
              {currentQuestion.multiSelect && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleNext}
                    disabled={currentSelections.length === 0}
                    className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          ) :

          /* ════ DETAILS FORM ═════════════════════════════════════════════════ */
          !isDetailsSubmitted ? (
            <motion.div
              key="details-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
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
                  Enter your details to generate your personalised career PDF.
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
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={userInfo.location}
                      onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-sans pr-36"
                      placeholder="Neighbourhood, City"
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs rounded-lg transition-colors flex items-center gap-2"
                    >
                      {isLocating ? "Locating..." : "📍 Auto-Detect"}
                    </button>
                  </div>
                  {locationError && (
                    <p className="text-red-400 text-xs mt-1 px-2">{locationError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  View My Career Blueprint
                </button>
              </form>
            </motion.div>
          ) :

          /* ════ RESULTS SCREEN ═══════════════════════════════════════════════ */
          (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col gap-10 w-full"
            >
              {/* ── Header ── */}
              <div className="flex flex-col gap-4 text-center items-center">
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-mono text-sm uppercase tracking-widest border border-white/20">
                  Assessment Complete
                </span>
                <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter text-white">
                  Career Blueprint
                </h2>
                <p className="text-neutral-400 font-sans text-base max-w-lg leading-relaxed">
                  Career paths that best match your assessment. Scores are calculated from your actual answers across {questions.length} dimensions.
                </p>

                {/* User info */}
                {!isSharedView && userInfo.name && (
                  <div className="mt-4 flex flex-wrap justify-center gap-6 border-t border-white/10 pt-6 w-full max-w-2xl">
                    <div className="text-center px-4">
                      <div className="text-neutral-500 text-xs uppercase tracking-widest font-mono mb-1">Prepared For</div>
                      <div className="text-white font-sans">{userInfo.name}</div>
                    </div>
                    <div className="text-center px-4 border-l border-white/10">
                      <div className="text-neutral-500 text-xs uppercase tracking-widest font-mono mb-1">Location</div>
                      <div className="text-white font-sans">{userInfo.location}</div>
                    </div>
                    <div className="text-center px-4 border-l border-white/10">
                      <div className="text-neutral-500 text-xs uppercase tracking-widest font-mono mb-1">Matches Found</div>
                      <div className="text-white font-sans">{results.length} career path{results.length !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Profile Chips ── */}
              {profileChips.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest text-center">Your Profile</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {profileChips.map((chip) => (
                      <span
                        key={chip}
                        className="px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-sm text-neutral-200 font-sans"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Calculating ── */}
              {isCalculating ? (
                <div className="flex flex-col items-center justify-center py-20 gap-6">
                  <Loader2 size={48} className="text-blue-500 animate-spin" />
                  <div className="flex flex-col gap-2 text-center">
                    <h3 className="text-2xl font-heading text-white">Analysing your responses…</h3>
                    <p className="text-neutral-500 font-sans text-sm">Scoring across interest, aptitude, work style, environment, education and goals</p>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                  <p className="text-neutral-400 font-sans text-lg">
                    Not enough information to confidently recommend a career path.
                  </p>
                  <p className="text-neutral-600 font-sans text-sm">
                    This can happen when answers point in very different directions. Try retaking the assessment with clearer preferences.
                  </p>
                  <button
                    onClick={resetAssessment}
                    className="mt-4 px-6 py-3 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-neutral-200 transition-all"
                  >
                    Retake Assessment
                  </button>
                </div>
              ) : (
                <>
                  {/* ── Result Cards ── */}
                  <div className="flex flex-col gap-4">
                    {results.map((res, i) => (
                      <ResultCard
                        key={`${res.title}-${i}`}
                        result={res}
                        index={i}
                        isExpanded={expandedIndex === i}
                        onToggle={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
                        isTopResult={i === 0}
                      />
                    ))}
                  </div>

                  {/* ── Score Guide ── */}
                  <div className="glass-panel rounded-2xl p-5 border border-white/5">
                    <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mb-3">Score Guide</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {[
                        { range: "90–100%", label: "Exceptional fit", color: "text-emerald-400" },
                        { range: "80–89%",  label: "Strong fit",      color: "text-blue-400" },
                        { range: "70–79%",  label: "Good fit",        color: "text-indigo-400" },
                        { range: "60–69%",  label: "Moderate fit",    color: "text-amber-400" },
                        { range: "50–59%",  label: "Possible fit",    color: "text-orange-400" },
                      ].map(({ range, label, color }) => (
                        <div key={range} className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-bold ${color}`}>{range}</span>
                          <span className="text-neutral-600 text-xs">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Actions ── */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all font-sans text-sm tracking-widest uppercase flex items-center justify-center gap-2 font-bold disabled:opacity-50"
                    >
                      <Download size={16} />
                      {isGeneratingPDF ? "Generating…" : "Download PDF"}
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all font-sans text-sm tracking-widest uppercase flex items-center justify-center gap-2"
                    >
                      {copySuccess ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                      {copySuccess ? "Link Copied!" : "Share Result"}
                    </button>
                  </div>

                  {/* ── Retake ── */}
                  <div className="flex justify-center">
                    <button
                      onClick={resetAssessment}
                      className="px-6 py-3 rounded-full text-neutral-400 hover:text-white border border-transparent hover:border-white/20 transition-all font-sans text-xs tracking-widest uppercase flex items-center gap-2"
                    >
                      <RefreshCw size={14} />
                      {isSharedView ? "Take Your Own Assessment" : "Retake Assessment"}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
