import React, { useState } from "react";
import { CourseCatalogItem } from "../types";
import { ALL_COURSES } from "../data/courses";
import { Search, HelpCircle, ArrowUpRight, Clock, DollarSign, ChevronDown, ChevronUp } from "lucide-react";

const COURSES: CourseCatalogItem[] = ALL_COURSES;

const STREAM_FILTERS = [
  { id: "all",              label: "All Streams" },
  { id: "science",         label: "Science" },
  { id: "commerce",        label: "Commerce" },
  { id: "arts",            label: "Arts / Design" },
  { id: "interdisciplinary", label: "Interdisciplinary" },
];

const DIFFICULTY_COLOR: Record<string, string> = {
  "High Rigor": "rgba(244,63,94,0.85)",
  "Moderate":   "rgba(245,158,11,0.85)",
  "Balanced":   "rgba(16,185,129,0.85)",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "1.25rem",
  overflow: "hidden",
};

export default function CourseDirectory() {
  const [search, setSearch] = useState("");
  const [stream, setStream] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const courses = COURSES.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.fullName.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q) ||
      c.careerRoles.some(r => r.toLowerCase().includes(q));
    const matchStream =
      stream === "all" ||
      (stream === "science" && c.streamCategory.includes("Science")) ||
      (stream === "commerce" && c.streamCategory.includes("Commerce")) ||
      (stream === "arts" && c.streamCategory.includes("Arts")) ||
      (stream === "interdisciplinary" && c.streamCategory.includes("Interdisciplinary"));
    return matchSearch && matchStream;
  });

  return (
    <div id="course-directory-root" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Header ── */}
      <div style={{
        position: "relative", overflow: "hidden",
        borderRadius: "1.25rem",
        padding: "32px 32px",
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50%", height: "160%", background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", fontSize: "0.62rem", color: "rgba(255,255,255,0.6)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-accent)", display: "inline-block" }} />
            Academic Course Finder
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>
            Indian Academic<br />
            <em style={{ fontWeight: 300, fontSize: "0.85em", color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>Course Directory</em>
          </h2>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", maxWidth: 560, lineHeight: 1.7 }}>
            Cataloging durations, eligibility, starting packages, and entry methods for official public & private UG degrees in India.
          </p>
        </div>
      </div>

      {/* ── Controls ── */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", padding: "16px 20px", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={13} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.25)", pointerEvents: "none" }} />
          <input
            id="course-search-field"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by course, career, or keyword…"
            style={{
              width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0.75rem", fontSize: "0.75rem", color: "#fff",
              fontFamily: "'Epilogue', sans-serif", outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(var(--color-accent-rgb,255,255,255),0.4)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </div>
        {/* Stream filter pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STREAM_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setStream(f.id)}
              style={{
                padding: "7px 14px", borderRadius: "9999px",
                border: stream === f.id ? "1px solid rgba(var(--color-accent-rgb,255,255,255),0.45)" : "1px solid rgba(255,255,255,0.08)",
                background: stream === f.id ? "rgba(var(--color-accent-rgb,255,255,255),0.08)" : "transparent",
                color: stream === f.id ? "var(--color-accent,#fff)" : "rgba(255,255,255,0.4)",
                fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >{f.label}</button>
          ))}
        </div>
      </div>

      {/* ── Course Grid ── */}
      {courses.length === 0 ? (
        <div style={{ ...card, padding: "60px 32px", textAlign: "center" }}>
          <HelpCircle size={28} color="rgba(255,255,255,0.2)" style={{ margin: "0 auto 14px" }} />
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>No courses matched</h4>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>Try "CSE", "Finance", "Design" or reset the stream filter.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {Array.from(new Set(courses.map(c => c.streamCategory))).map(category => {
            const catCourses = courses.filter(c => c.streamCategory === category);
            return (
              <div key={category}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", marginBottom: 18, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)" }} />
                  {category}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 14 }}>
                  {catCourses.map(course => {
                    const open = expanded === course.id;
            return (
              <div
                key={course.id}
                id={`catalog-card-${course.id}`}
                style={{
                  ...card,
                  display: "flex", flexDirection: "column",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease",
                  borderColor: open ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                }}
                onMouseEnter={e => { if (!open) e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                onClick={() => setExpanded(open ? null : course.id)}
              >
                {/* Card body */}
                <div style={{ padding: "22px 22px 16px" }}>
                  {/* Meta row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "2px 9px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {course.streamCategory}
                    </span>
                    <span style={{ fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: DIFFICULTY_COLOR[course.difficulty] ?? "#fff", background: `rgba(${DIFFICULTY_COLOR[course.difficulty]?.slice(5,-0.1)},0.1)`, border: `1px solid ${DIFFICULTY_COLOR[course.difficulty] ?? "rgba(255,255,255,0.1)"}22`, padding: "2px 9px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {course.difficulty}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 4 }}>
                    {course.name}
                  </h3>
                  <p style={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
                    {course.fullName}
                  </p>

                  {/* Duration + Salary */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "12px 14px", borderRadius: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "6px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Clock size={12} color="rgba(255,255,255,0.4)" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.5rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Duration</div>
                        <div style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{course.duration}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "6px", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <DollarSign size={12} color="#10b981" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.5rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Est. Salary</div>
                        <div style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#10b981" }}>{course.averageStartingSalary}</div>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                    {course.overview}
                  </p>
                </div>

                {/* Toggle button */}
                <button
                  id={`btn-toggle-detail-${course.id}`}
                  onClick={() => setExpanded(open ? null : course.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 22px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    background: open ? "rgba(255,255,255,0.04)" : "transparent",
                    color: open ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                    fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    cursor: "pointer", border: "none", width: "100%",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = open ? "rgba(255,255,255,0.04)" : "transparent"; e.currentTarget.style.color = open ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)"; }}
                >
                  <span>{open ? "Collapse details" : "Review eligibility & exams"}</span>
                  {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {/* Expanded detail drawer */}
                {open && (
                  <div id={`catalog-drawer-${course.id}`} style={{ padding: "18px 22px 22px", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <span style={{ display: "block", fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Eligibility Standards</span>
                      <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{course.eligibility}</p>
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Core Admission Exams</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {course.topEntranceExams.map((ex, i) => (
                          <span key={i} style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Career Pathways</span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {course.careerRoles.map((r, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
