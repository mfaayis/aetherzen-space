import React, { useState, useEffect } from "react";
import { ALL_COURSES } from "../data/courses";
import {
  ArrowRight, ArrowLeft, CheckCircle, RotateCcw,
  Award, Zap, Brain, Microscope, Wrench,
  FlaskConical, Heart, Briefcase, Palette,
} from "lucide-react";

/* ══════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════ */
interface Answers {
  stream: string;
  marksRange: string;
  interests: string[];
  goal: string[];
  location: string;
}

interface CourseMatch {
  name: string;
  fullName: string;
  matchPct: number;
  why: string;
  exams: string[];
  salary: string;
  duration: string;
}

/* ══════════════════════════════════════════════════════
   COURSE DATABASE
══════════════════════════════════════════════════════ */
const COURSES = ALL_COURSES;

const MARKS_SCORE: Record<string, number> = { "below50": 40, "50-60": 55, "60-75": 67, "75-85": 80, "85+": 92 };

function computeRecommendations(answers: Answers): CourseMatch[] {
  const marks = MARKS_SCORE[answers.marksRange] ?? 60;
  return COURSES
    .map(c => {
      let s = 0;
      if (c.streams.includes("Any")) {
        s += 25;
      } else if (answers.stream === "PCMB" && (c.streams.includes("PCM") || c.streams.includes("PCB") || c.streams.includes("PCMB"))) {
        s += 35;
      } else if (c.streams.includes(answers.stream)) {
        s += 35;
      }
      s += marks >= c.minMarks ? 25 : marks >= c.minMarks - 10 ? 15 : marks >= c.minMarks - 20 ? 5 : 0;
      s += Math.min(25, answers.interests.filter(i => c.interests.includes(i)).length * 12);
      s += Math.min(15, (answers.goal || []).filter(g => c.goals.includes(g)).length * 8);
      return { ...c, matchPct: Math.min(99, Math.round(s)) };
    })
    .sort((a, b) => b.matchPct - a.matchPct)
    .slice(0, 3)
    .map(({ name, fullName, matchPct, why, exams, salary, duration }) =>
      ({ name, fullName, matchPct, why, exams, salary, duration }));
}

/* ══════════════════════════════════════════════════════
   STEPS DEFINITION
══════════════════════════════════════════════════════ */
const STEPS = [
  {
    question: "What stream did you\nstudy in Class 12?",
    hint: "This determines which courses and entrance exams are available to you.",
    type: "single" as const,
    field: "stream" as keyof Answers,
    options: [
      { value: "PCM",        label: "Science — PCM",        detail: "Physics, Chemistry & Mathematics",       icon: <FlaskConical size={20} /> },
      { value: "PCB",        label: "Science — PCB",        detail: "Physics, Chemistry & Biology",           icon: <Heart size={20} /> },
      { value: "PCMB",       label: "Science — PCMB",       detail: "Physics, Chemistry, Biology & Math",     icon: <Microscope size={20} /> },
      { value: "Commerce",   label: "Commerce",             detail: "Accounts, Business & Economics",         icon: <Briefcase size={20} /> },
      { value: "Arts",       label: "Arts & Humanities",    detail: "History, Literature & Social Sciences",  icon: <Palette size={20} /> },
      { value: "Vocational", label: "Vocational / Technical", detail: "Skill-based & specialized courses",    icon: <Wrench size={20} /> },
    ],
  },
  {
    question: "What percentage do you\nexpect in Class 12?",
    hint: "Marks thresholds determine eligibility for competitive courses like MBBS, IIT and IIM.",
    type: "single" as const,
    field: "marksRange" as keyof Answers,
    options: [
      { value: "below50", label: "Below 50%",      detail: "Pass grade" },
      { value: "50-60",   label: "50 – 60%",       detail: "Average" },
      { value: "60-75",   label: "60 – 75%",       detail: "Good" },
      { value: "75-85",   label: "75 – 85%",       detail: "Very good" },
      { value: "85+",     label: "85% and above",  detail: "Excellent" },
    ],
  },
  {
    question: "Which areas genuinely\nexcite you?",
    hint: "Select as many as feel true — the more honest you are, the better your match.",
    type: "multi" as const,
    field: "interests" as keyof Answers,
    options: [
      { value: "Technology",      label: "Technology & Engineering" },
      { value: "Medicine",        label: "Medicine & Healthcare" },
      { value: "Business",        label: "Business & Finance" },
      { value: "Law",             label: "Law & Justice" },
      { value: "Design",          label: "Design & Visual Arts" },
      { value: "Science",         label: "Pure Sciences" },
      { value: "Research",        label: "Research & Academia" },
      { value: "Social Sciences", label: "Social Sciences" },
      { value: "Creative Arts",   label: "Arts & Culture" },
      { value: "Healthcare",      label: "Public Health" },
      { value: "Management",      label: "Management & Leadership" },
      { value: "Justice",         label: "Social Justice" },
    ],
  },
  {
    question: "What matters most\nto you in a career?",
    hint: "Select all the factors that matter most to you.",
    type: "multi" as const,
    field: "goal" as keyof Answers,
    options: [
      { value: "Salary",          label: "High earning potential",     detail: "Top packages & financial growth" },
      { value: "Stability",       label: "Job security & stability",   detail: "Consistent, reliable employment" },
      { value: "Creative",        label: "Creative expression",        detail: "Work that lets me create & design" },
      { value: "Impact",          label: "Helping people & society",   detail: "Making a real difference in lives" },
      { value: "Research",        label: "Research & knowledge",       detail: "Pushing frontiers of understanding" },
      { value: "Entrepreneurship",label: "Building something my own",  detail: "Starting and scaling a venture" },
      { value: "Prestige",        label: "Prestige & recognition",     detail: "Top-tier institutions & status" },
      { value: "Innovation",      label: "Technology & innovation",    detail: "Cutting-edge work & startups" },
    ],
  },
  {
    question: "Where do you see yourself\nbuilding a career?",
    hint: "Location shapes which institutions, networks, and opportunities are accessible.",
    type: "single" as const,
    field: "location" as keyof Answers,
    options: [
      { value: "flexible", label: "Open to any city",           detail: "Willing to relocate anywhere in India" },
      { value: "home",     label: "Prefer my home state",       detail: "Stay within my region and community" },
      { value: "metro",    label: "Major metros only",          detail: "Delhi · Mumbai · Bengaluru · Hyderabad" },
      { value: "abroad",   label: "International pathways",     detail: "Open to global career opportunities" },
    ],
  },
];

/* ══════════════════════════════════════════════════════
   MATCH RING (SVG)
══════════════════════════════════════════════════════ */
function Ring({ pct }: { pct: number }) {
  const r = 32, circ = 2 * Math.PI * r;
  const color = pct >= 75 ? "#00f2fe" : pct >= 55 ? "#f59e0b" : "#f43f5e";
  return (
    <svg width={82} height={82} style={{ flexShrink: 0 }}>
      <circle cx={41} cy={41} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
      <circle cx={41} cy={41} r={r} fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        strokeDashoffset={circ / 4} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)" }}
      />
      <text x={41} y={47} textAnchor="middle" fill={color} fontSize={14} fontWeight={800} fontFamily="'JetBrains Mono',monospace">{pct}%</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   RESULTS
══════════════════════════════════════════════════════ */
function Results({ results, onReset }: { results: CourseMatch[]; onReset(): void }) {
  const allExams = [...new Set(results.flatMap(r => r.exams))].slice(0, 6);
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(0,242,254,0.6)", marginBottom: 18 }}>
          Your Personalised Report
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08, color: "#fff", marginBottom: 14 }}>
          Your top match is<br />
          <em style={{ fontStyle: "italic", fontWeight: 300, background: "linear-gradient(135deg, #fff 0%, #00f2fe 65%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {results[0].name}
          </em>
        </h2>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
          Based on your stream, marks, interests, and career goals — here are the three courses we recommend most.
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
        {results.map((c, i) => (
          <div key={c.name} style={{
            display: "flex", alignItems: "flex-start", gap: 22, padding: "24px 26px",
            borderRadius: "1.25rem",
            background: i === 0 ? "rgba(0,242,254,0.04)" : "rgba(255,255,255,0.02)",
            border: i === 0 ? "1px solid rgba(0,242,254,0.22)" : "1px solid rgba(255,255,255,0.07)",
          }}>
            <Ring pct={c.matchPct} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{c.name}</h3>
                {i === 0 && <span style={{ fontSize: "0.5rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, padding: "2px 9px", borderRadius: "9999px", background: "rgba(0,242,254,0.12)", border: "1px solid rgba(0,242,254,0.28)", color: "#00f2fe", textTransform: "uppercase", letterSpacing: "0.1em" }}>Best Match</span>}
              </div>
              <p style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono',monospace", color: "rgba(255,255,255,0.22)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{c.fullName}</p>
              <p style={{ fontSize: "0.77rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.7, marginBottom: 14 }}>{c.why}</p>
              <div style={{ display: "flex", gap: 20 }}>
                <span style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", color: "rgba(16,185,129,0.85)", fontWeight: 700 }}>₹ {c.salary}</span>
                <span style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", color: "rgba(255,255,255,0.28)", fontWeight: 700 }}>⏱ {c.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exams */}
      <div style={{ padding: "22px 26px", borderRadius: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Award size={13} color="rgba(255,255,255,0.3)" />
          <span style={{ fontSize: "0.55rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.22)" }}>Exams to Target</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {allExams.map(ex => (
            <span key={ex} style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, padding: "5px 13px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{ex}</span>
          ))}
        </div>
      </div>

      {/* Study tip */}
      <div style={{ padding: "18px 22px", borderRadius: "1.25rem", background: "rgba(0,242,254,0.03)", border: "1px solid rgba(0,242,254,0.1)", display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 40 }}>
        <Zap size={14} color="rgba(0,242,254,0.6)" style={{ flexShrink: 0, marginTop: 3 }} />
        <p style={{ fontSize: "0.77rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
          Start <strong style={{ color: "rgba(255,255,255,0.7)" }}>{allExams[0]}</strong> preparation now — 4–5 focused hours daily over 8–10 months dramatically improves your odds. Use the AI Copilot section below for a tailored study plan.
        </p>
      </div>

      {/* Reset */}
      <div style={{ textAlign: "center" }}>
        <button onClick={onReset} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 22px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.2s ease" }}
          onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >
          <RotateCcw size={11} /> Retake Assessment
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN SURVEY
══════════════════════════════════════════════════════ */
export default function DynamicSurvey() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({ interests: [], goal: [] });
  const [results, setResults] = useState<CourseMatch[] | null>(null);
  const [anim, setAnim]       = useState<"in" | "out">("in");

  const current = STEPS[step];
  const field   = current?.field;

  const isAnswered = () => {
    if (!current) return false;
    if (current.type === "multi") return (answers.interests ?? []).length >= 1;
    return !!answers[field];
  };

  const toggleMulti = (val: string) => {
    const cur = answers.interests ?? [];
    setAnswers(prev => ({ ...prev, interests: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] }));
  };

  const setSingle = (val: string) => setAnswers(prev => ({ ...prev, [field]: val }));

  const advance = () => {
    setAnim("out");
    setTimeout(() => {
      if (step < STEPS.length - 1) { setStep(s => s + 1); }
      else { setResults(computeRecommendations(answers as Answers)); }
      setAnim("in");
    }, 220);
  };

  const back = () => {
    setAnim("out");
    setTimeout(() => { setStep(s => s - 1); setAnim("in"); }, 220);
  };

  const reset = () => { setStep(0); setAnswers({ interests: [] }); setResults(null); setAnim("in"); };

  if (results) return <Results results={results} onReset={reset} />;

  const progress = ((step) / STEPS.length) * 100;

  return (
    <div>
      {/* Thin progress bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.05)", marginBottom: 60 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#00c6ff,#00f2fe)", transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)", borderRadius: "0 9999px 9999px 0" }} />
      </div>

      {/* Content area */}
      <div style={{
        maxWidth: 700, margin: "0 auto", padding: "0 24px 80px",
        opacity: anim === "in" ? 1 : 0,
        transform: anim === "in" ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }}>

        {/* Step indicator — minimal dot count */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 36 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: i === step ? 22 : 5, height: 5, borderRadius: 9999, background: i < step ? "rgba(0,242,254,0.4)" : i === step ? "#00f2fe" : "rgba(255,255,255,0.08)", transition: "all 0.3s ease" }} />
          ))}
          <span style={{ marginLeft: 10, fontSize: "0.58rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {step + 1} / {STEPS.length}
          </span>
        </div>

        {/* Question */}
        <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff", marginBottom: 12, whiteSpace: "pre-line" }}>
          {current.question}
        </h2>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.6, marginBottom: 40, maxWidth: 500 }}>
          {current.hint}
        </p>

        {/* Options — single */}
        {current.type === "single" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {current.options.map(opt => {
              const active = answers[field] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setSingle(opt.value)}
                  style={{
                    display: "flex", alignItems: "center", gap: 18,
                    padding: "18px 22px", borderRadius: "1rem", textAlign: "left", width: "100%",
                    background: active ? "rgba(0,242,254,0.06)" : "rgba(255,255,255,0.02)",
                    border: active ? "1px solid rgba(0,242,254,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    cursor: "pointer", transition: "all 0.2s ease",
                    boxShadow: active ? "0 0 24px rgba(0,242,254,0.07)" : "none",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; } }}
                >
                  {/* Icon (step 0 only) */}
                  {"icon" in opt && (
                    <div style={{ width: 42, height: 42, borderRadius: "0.75rem", flexShrink: 0, background: active ? "rgba(0,242,254,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${active ? "rgba(0,242,254,0.25)" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: active ? "#00f2fe" : "rgba(255,255,255,0.4)", transition: "all 0.2s ease" }}>
                      {(opt as any).icon}
                    </div>
                  )}

                  {/* Left accent bar */}
                  <div style={{ width: 3, height: 32, borderRadius: 9999, background: active ? "#00f2fe" : "rgba(255,255,255,0.08)", flexShrink: 0, transition: "background 0.2s ease" }} />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,0.72)", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: 3 }}>
                      {opt.label}
                    </div>
                    {"detail" in opt && (
                      <div style={{ fontSize: "0.65rem", color: active ? "rgba(0,242,254,0.6)" : "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono',monospace", transition: "color 0.2s ease" }}>
                        {(opt as any).detail}
                      </div>
                    )}
                  </div>

                  {active && <CheckCircle size={18} color="#00f2fe" style={{ flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Options — multi (chips) */}
        {current.type === "multi" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {current.options.map(opt => {
              const active = (answers.interests ?? []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleMulti(opt.value)}
                  style={{
                    padding: "10px 20px", borderRadius: "9999px",
                    background: active ? "rgba(0,242,254,0.08)" : "rgba(255,255,255,0.03)",
                    border: active ? "1px solid rgba(0,242,254,0.4)" : "1px solid rgba(255,255,255,0.09)",
                    color: active ? "#00f2fe" : "rgba(255,255,255,0.5)",
                    fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                    transition: "all 0.18s ease",
                    boxShadow: active ? "0 0 16px rgba(0,242,254,0.08)" : "none",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; } }}
                >
                  {opt.label}
                </button>
              );
            })}
            {(answers.interests ?? []).length > 0 && (
              <div style={{ width: "100%", marginTop: 8, fontSize: "0.62rem", fontFamily: "'JetBrains Mono',monospace", color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em" }}>
                {(answers.interests ?? []).length} selected
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 52 }}>
          {step > 0 ? (
            <button onClick={back} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 0", background: "transparent", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", transition: "color 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              <ArrowLeft size={15} /> Back
            </button>
          ) : <div />}

          <button
            onClick={advance}
            disabled={!isAnswered()}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "13px 32px", borderRadius: "9999px",
              background: isAnswered() ? "#00f2fe" : "rgba(255,255,255,0.05)",
              border: "none",
              color: isAnswered() ? "#000" : "rgba(255,255,255,0.2)",
              fontSize: "0.85rem", fontWeight: 800, letterSpacing: "-0.01em",
              cursor: isAnswered() ? "pointer" : "not-allowed",
              transition: "all 0.25s ease",
              boxShadow: isAnswered() ? "0 0 32px rgba(0,242,254,0.3)" : "none",
            }}
            onMouseEnter={e => { if (isAnswered()) { e.currentTarget.style.background = "#00d4e8"; e.currentTarget.style.boxShadow = "0 0 48px rgba(0,242,254,0.4)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
            onMouseLeave={e => { if (isAnswered()) { e.currentTarget.style.background = "#00f2fe"; e.currentTarget.style.boxShadow = "0 0 32px rgba(0,242,254,0.3)"; e.currentTarget.style.transform = "translateY(0)"; } }}
          >
            {step === STEPS.length - 1 ? "See My Results" : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
