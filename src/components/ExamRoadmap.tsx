import React, { useState } from "react";
import { EntranceExam } from "../types";
import { Award, CheckCircle, AlertOctagon, Calendar, Link2, Search, ArrowRight, Compass, ChevronDown } from "lucide-react";

const EXAMS: EntranceExam[] = [
  { id: "jee-main", name: "JEE Main", fullName: "Joint Entrance Examination (Main)", stream: "Science (PCM)", difficulty: "High (Over 14 Lakh Candidates)", eligibility: "Physics, Math, Chemistry in 12th with min 75% for NIT/IIIT admissions.", examPattern: "MCQs & Numerical value questions on Computer Based Test (CBT).", keySubjects: ["Mathematics", "Physics", "Chemistry"], registrationTimeline: "Session 1: Nov – Dec; Session 2: Feb – Mar.", estimatedExamMonth: "Session 1 in January; Session 2 in April.", officialWebsite: "https://jeemain.nta.ac.in", description: "The primary national engineering entrance by NTA for NITs, IIITs, CFTIs, and qualifying gate to JEE Advanced." },
  { id: "jee-adv", name: "JEE Advanced", fullName: "Joint Entrance Examination (Advanced)", stream: "Science (PCM)", difficulty: "Extreme (Top 2.5 Lakh of JEE Main)", eligibility: "Rank in top 2.5 lakh in JEE Main and meet minimum criteria.", examPattern: "Two 3-hour papers (both mandatory) on same day. Highly randomized scoring.", keySubjects: ["Advanced Physics", "Advanced Chemistry", "Advanced Mathematics"], registrationTimeline: "April – May annually (post JEE Main results).", estimatedExamMonth: "Late May or Early June.", officialWebsite: "https://jeeadv.ac.in", description: "Conducted by rotation among premier IITs for admission to all 23 Indian Institutes of Technology." },
  { id: "neet-ug", name: "NEET UG", fullName: "National Eligibility cum Entrance Test (UG)", stream: "Science (PCB)", difficulty: "Very High (Over 20 Lakh Candidates)", eligibility: "PCB + English individually in 12th. Min age 17. Min 50% aggregate marks.", examPattern: "Pen-and-paper OMR exam. 200 minutes: 180 questions out of 200.", keySubjects: ["Biology (Botany + Zoology)", "Physics", "Chemistry"], registrationTimeline: "February – March annually.", estimatedExamMonth: "First Sunday of May.", officialWebsite: "https://exams.nta.ac.in/NEET", description: "Single-window national gateway to MBBS, BDS, AYUSH, and veterinary science degrees across India." },
  { id: "cuet-ug", name: "CUET UG", fullName: "Common University Entrance Test (UG)", stream: "All Streams Flexible", difficulty: "Moderate to High", eligibility: "Cleared 12th in any stream. Subject map must match course requirements.", examPattern: "CBT format: Domain-specific subjects, General Test, and Language papers.", keySubjects: ["Domain Subjects (e.g. History, Accountancy, Physics)", "General Test (GK, Reasoning)", "Language Papers"], registrationTimeline: "February – April annually.", estimatedExamMonth: "May – June annually.", officialWebsite: "https://exams.nta.ac.in/CUET-UG", description: "Standard admission to 250+ central, state, and premier private universities including DU, BHU, and AMU." },
  { id: "clat-ug", name: "CLAT UG", fullName: "Common Law Admission Test (UG)", stream: "All Streams Flexible", difficulty: "High (Supreme English comprehension speed required)", eligibility: "Passed Class 12 with min 45% marks (40% for SC/ST). No maximum age.", examPattern: "Pen & paper: 120 passage-based comprehension questions in 2 hours.", keySubjects: ["English Comprehension", "Current Affairs & GK", "Legal Reasoning", "Logical Reasoning", "Quantitative Techniques"], registrationTimeline: "July – October annually (early window).", estimatedExamMonth: "First Sunday of December.", officialWebsite: "https://consortiumofnlus.ac.in", description: "Direct entry to 5-year integrated law programs at 24 National Law Universities across India." },
  { id: "ipmat", name: "IPMAT", fullName: "Integrated Program in Management Aptitude Test", stream: "All Streams Flexible", difficulty: "High (Intriguing math and interviews)", eligibility: "Min 60% in Class 10 and 12 (55% for reservation categories).", examPattern: "CBT: Quantitative Ability (MCQ), Quantitative (Short Answer), Verbal Ability.", keySubjects: ["Quantitative Aptitude", "Data Interpretation", "Verbal Aptitude"], registrationTimeline: "March – April annually.", estimatedExamMonth: "May annually.", officialWebsite: "https://www.iimidr.ac.in", description: "Gateway to elite 5-Year Integrated Management by IIM Indore and IIM Rohtak, with direct MBA transition." },
  { id: "nata", name: "NATA", fullName: "National Aptitude Test in Architecture", stream: "Science (PCM)", difficulty: "Balanced", eligibility: "10+2 with PCM or 10+3 Diploma with Mathematics as mandatory paper.", examPattern: "Part A: Online cognitive drawings & design; Part B: Physics, Chemistry, Math, GK.", keySubjects: ["Drawing Aptitude", "Visual Composition", "Architectural Awareness", "PCM"], registrationTimeline: "February to multi-session phases in July.", estimatedExamMonth: "Multiple weekend cycles April – July.", officialWebsite: "https://www.nata.in", description: "Evaluates cognitive abilities and aesthetic sensibilities of applicants for 5-Year B.Arch degrees in India." },
];

const STREAM_FILTERS = [
  { id: "all",      label: "All" },
  { id: "pcm",      label: "PCM" },
  { id: "pcb",      label: "PCB" },
  { id: "flexible", label: "Flexible" },
];

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "1.25rem",
  overflow: "hidden",
};

export default function ExamRoadmap() {
  const [search, setSearch] = useState("");
  const [streamFilter, setStreamFilter] = useState("all");
  const [testStream, setTestStream] = useState("pcm");
  const [testMarks, setTestMarks] = useState(80);
  const [testMath, setTestMath] = useState(true);
  const [testBio, setTestBio] = useState(false);
  const [results, setResults] = useState<{ examId: string; eligible: boolean; remark: string }[] | null>(null);

  const filtered = EXAMS.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.fullName.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
    const matchStream =
      streamFilter === "all" ||
      (streamFilter === "pcm" && e.stream.includes("PCM")) ||
      (streamFilter === "pcb" && e.stream.includes("PCB")) ||
      (streamFilter === "flexible" && e.stream.includes("Flexible"));
    return matchSearch && matchStream;
  });

  const runEligibility = (ev: React.FormEvent) => {
    ev.preventDefault();
    setResults(EXAMS.map(exam => {
      let eligible = true;
      let remark = "You satisfy the standard stream and core eligibility constraints.";
      if (["jee-main", "jee-adv", "nata"].includes(exam.id)) {
        if (testStream !== "pcm" && !testMath) { eligible = false; remark = "This entrance strictly requires Mathematics, Physics, and Chemistry."; }
        if (testMarks < 75 && ["jee-main", "jee-adv"].includes(exam.id)) remark += " (Note: IITs/NITs require 75% boards avg; state institutions may relax this).";
      }
      if (exam.id === "neet-ug") {
        if (testStream !== "pcb" && !testBio) { eligible = false; remark = "Strictly requires Biology or Biotechnology in 12th standard."; }
        if (testMarks < 50) { eligible = false; remark = "Requires minimum 50% aggregate marks in PCB subjects."; }
      }
      if (exam.id === "ipmat" && testMarks < 60) { eligible = false; remark = "Requires minimum 60% aggregate in Class 10 and 12 board exams."; }
      return { examId: exam.id, eligible, remark };
    }));
  };

  return (
    <div id="exam-roadmap-root" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Header ── */}
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: "1.25rem",
        padding: "32px 32px",
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50%", height: "160%", background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", fontSize: "0.62rem", color: "rgba(255,255,255,0.6)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-accent)", display: "inline-block" }} />
            Entrance Exams Hub
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>
            Post-12th Entrance<br />
            <em style={{ fontWeight: 300, fontSize: "0.85em", color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>Exam Roadmap</em>
          </h2>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", maxWidth: 580, lineHeight: 1.7 }}>
            Registration deadlines, key testing subjects, difficulty ranks, and structures for every major Indian undergraduate entrance exam.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }}>

        {/* ── Main exam list ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Search + filter bar */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", padding: "14px 16px", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
              <Search size={12} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.25)", pointerEvents: "none" }} />
              <input
                id="exam-search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search JEE, CLAT, NEET, CUET…"
                style={{
                  width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "0.75rem", fontSize: "0.72rem", color: "#fff",
                  fontFamily: "'Epilogue', sans-serif", outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {STREAM_FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setStreamFilter(f.id)}
                  style={{
                    padding: "6px 14px", borderRadius: "9999px",
                    border: streamFilter === f.id ? "1px solid rgba(var(--color-accent-rgb,255,255,255),0.45)" : "1px solid rgba(255,255,255,0.08)",
                    background: streamFilter === f.id ? "rgba(var(--color-accent-rgb,255,255,255),0.08)" : "transparent",
                    color: streamFilter === f.id ? "var(--color-accent,#fff)" : "rgba(255,255,255,0.4)",
                    fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >{f.label}</button>
              ))}
            </div>
          </div>

          {/* Exam cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {Array.from(new Set(filtered.map(e => e.stream))).map(category => {
              const catExams = filtered.filter(e => e.stream === category);
              return (
                <div key={category}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", marginBottom: 18, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)" }} />
                    {category}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {catExams.map(exam => {
                      const report = results?.find(r => r.examId === exam.id);
                      return (
                <div
                  key={exam.id}
                  id={`exam-node-${exam.id}`}
                  style={{
                    ...card,
                    padding: "22px 22px",
                    transition: "border-color 0.25s ease",
                    borderColor: report ? (report.eligible ? "rgba(16,185,129,0.3)" : "rgba(244,63,94,0.3)") : "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => { if (!report) e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={e => { if (!report) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  {/* Top meta */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "0.625rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Award size={16} color="rgba(255,255,255,0.55)" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{exam.name}</h3>
                        <p style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{exam.fullName}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "3px 10px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                      {exam.stream}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 16 }}>{exam.description}</p>

                  {/* 4-cell info grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    {[
                      { label: "Exam Timing",          value: exam.estimatedExamMonth },
                      { label: "Registration Window",   value: exam.registrationTimeline },
                      { label: "Difficulty Rank",       value: exam.difficulty },
                      { label: "Syllabus Themes",       value: exam.keySubjects.join(", ") },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ padding: "10px 14px", borderRadius: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span style={{ display: "block", fontSize: "0.5rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{label}</span>
                        <span style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Eligibility result */}
                  {report && (
                    <div style={{
                      display: "flex", gap: 10, alignItems: "flex-start",
                      padding: "12px 14px", borderRadius: "0.75rem", marginBottom: 12,
                      background: report.eligible ? "rgba(16,185,129,0.06)" : "rgba(244,63,94,0.06)",
                      border: `1px solid ${report.eligible ? "rgba(16,185,129,0.25)" : "rgba(244,63,94,0.25)"}`,
                    }}>
                      {report.eligible
                        ? <CheckCircle size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} />
                        : <AlertOctagon size={14} color="#f43f5e" style={{ flexShrink: 0, marginTop: 1 }} />
                      }
                      <div>
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: report.eligible ? "#10b981" : "#f43f5e", display: "block", marginBottom: 3 }}>
                          {report.eligible ? "Eligible" : "Not Eligible"}
                        </span>
                        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{report.remark}</p>
                      </div>
                    </div>
                  )}

                  {/* Bottom row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.2)", maxWidth: "65%", lineHeight: 1.5 }}>
                      Format: {exam.examPattern}
                    </span>
                    <a
                      href={exam.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent,#fff)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                    >
                      <Link2 size={11} />Official Portal
                    </a>
                  </div>
                </div>
              );
            })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Sidebar Eligibility Checker ── */}
        <div style={{ ...card, padding: "22px 20px", display: "flex", flexDirection: "column", gap: 18, position: "sticky", top: 80 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 14 }}>
              <Compass size={13} color="rgba(255,255,255,0.4)" />
              <span style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)" }}>
                Eligibility Simulator
              </span>
            </div>
            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.65 }}>
              Set your 12th standard details to check exam eligibility across the list.
            </p>
          </div>

          <form onSubmit={runEligibility} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Stream select */}
            <div>
              <label style={{ display: "block", fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>
                Class 12 Stream
              </label>
              <select
                id="sim-stream"
                value={testStream}
                onChange={e => {
                  setTestStream(e.target.value);
                  if (e.target.value === "pcm") { setTestMath(true); setTestBio(false); }
                  else if (e.target.value === "pcb") { setTestMath(false); setTestBio(true); }
                }}
                style={{ width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", color: "#fff", fontSize: "0.72rem", fontFamily: "'Epilogue', sans-serif", outline: "none" }}
              >
                <option value="pcm">Science (PCM)</option>
                <option value="pcb">Science (PCB)</option>
                <option value="commerce">Commerce</option>
                <option value="humanities">Humanities / Arts</option>
              </select>
            </div>

            {/* Marks */}
            <div>
              <label style={{ display: "block", fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>
                Expected Board Aggregate
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  id="sim-marks"
                  type="number"
                  min={40} max={100}
                  value={testMarks}
                  onChange={e => setTestMarks(Number(e.target.value))}
                  style={{ width: 72, padding: "8px 10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", color: "#fff", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, outline: "none" }}
                />
                <span style={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>% Aggregate</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Subject Electives</span>
              {[
                { id: "sim-math", label: "Passed Core Mathematics", value: testMath, set: setTestMath },
                { id: "sim-bio",  label: "Passed Biology / Biotech", value: testBio,  set: setTestBio },
              ].map(({ id, label, value, set }) => (
                <label key={id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <div
                    onClick={() => set(!value)}
                    style={{
                      width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                      border: value ? "1px solid var(--color-accent,#fff)" : "1px solid rgba(255,255,255,0.15)",
                      background: value ? "rgba(var(--color-accent-rgb,255,255,255),0.15)" : "rgba(255,255,255,0.03)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {value && <div style={{ width: 8, height: 8, borderRadius: 2, background: "var(--color-accent,#fff)" }} />}
                  </div>
                  <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{label}</span>
                </label>
              ))}
            </div>

            {/* Submit */}
            <button
              id="btn-run-sim"
              type="submit"
              style={{
                width: "100%", padding: "11px", borderRadius: "0.875rem",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              Check Eligibility <ArrowRight size={12} />
            </button>

            {results && (
              <button
                type="button"
                onClick={() => setResults(null)}
                style={{
                  width: "100%", padding: "9px", borderRadius: "0.875rem",
                  border: "1px solid rgba(255,255,255,0.07)", background: "transparent",
                  color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                Reset Highlights
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
