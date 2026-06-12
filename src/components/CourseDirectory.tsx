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
  background: "var(--ns-surface)",
  border: "1px solid var(--ns-border)",
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
        background: "var(--ns-surface)",
        border: "1px solid var(--ns-border)",
      }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50%", height: "160%", background: "radial-gradient(ellipse, var(--ns-border-hover) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: "9999px", border: "1px solid var(--ns-border)", background: "var(--ns-surface-2)", fontSize: "0.62rem", color: "var(--ns-text-muted)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-accent)", display: "inline-block" }} />
            Academic Course Finder
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ns-text)", lineHeight: 1.1, marginBottom: 10 }}>
            Indian Academic<br />
            <em style={{ fontWeight: 500, fontSize: "0.85em", color: "var(--ns-text-muted)", fontStyle: "italic" }}>Course Directory</em>
          </h2>
          <p style={{ fontSize: "0.78rem", color: "var(--ns-text-dim)", maxWidth: 560, lineHeight: 1.7 }}>
            Cataloging durations, eligibility, starting packages, and entry methods for official public & private UG degrees in India.
          </p>
        </div>
      </div>

      {/* ── Controls ── */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", padding: "16px 20px", borderRadius: "1rem", border: "1px solid var(--ns-border)", background: "var(--ns-surface)" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={13} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--ns-text-muted)", pointerEvents: "none" }} />
          <input
            id="course-search-field"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by course, career, or keyword…"
            style={{
              width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              background: "var(--ns-surface-2)", border: "1px solid var(--ns-border)",
              borderRadius: "0.75rem", fontSize: "0.75rem", color: "var(--ns-text)",
              fontFamily: "'Epilogue', sans-serif", outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--spotlight-color)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--ns-border)")}
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
                border: stream === f.id ? "1px solid var(--color-accent-transparent)" : "1px solid var(--ns-border)",
                background: stream === f.id ? "var(--color-accent-transparent)" : "transparent",
                color: stream === f.id ? "var(--color-accent)" : "var(--ns-text-muted)",
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
          <HelpCircle size={28} color="var(--ns-text-muted)" style={{ margin: "0 auto 14px" }} />
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ns-text)", marginBottom: 8 }}>No courses matched</h4>
          <p style={{ fontSize: "0.72rem", color: "var(--ns-text-muted)" }}>Try "CSE", "Finance", "Design" or reset the stream filter.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {Array.from(new Set(courses.map(c => c.streamCategory))).map(category => {
            const catCourses = courses.filter(c => c.streamCategory === category);
            return (
              <div key={category}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--ns-text)", marginBottom: 18, paddingBottom: 10, borderBottom: "1px solid var(--ns-border)", display: "flex", alignItems: "center", gap: 10 }}>
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
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                  borderColor: open ? "var(--spotlight-color)" : "var(--ns-border)",
                }}
                onMouseEnter={e => { if (!open) { e.currentTarget.style.borderColor = "var(--ns-border-hover)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = "var(--ns-border)"; e.currentTarget.style.transform = "translateY(0)"; } }}
                onClick={() => setExpanded(open ? null : course.id)}
              >
                {/* Card body */}
                <div style={{ padding: "22px 22px 16px" }}>
                  {/* Meta row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "var(--ns-text-muted)", background: "var(--ns-surface-2)", border: "1px solid var(--ns-border-2)", padding: "2px 9px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {course.streamCategory}
                    </span>
                    <span style={{ fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: DIFFICULTY_COLOR[course.difficulty] ?? "var(--ns-text)", background: `rgba(${DIFFICULTY_COLOR[course.difficulty]?.slice(5,-0.1) || "128,128,128"},0.05)`, border: `1px solid ${DIFFICULTY_COLOR[course.difficulty] ?? "var(--ns-border)"}44`, padding: "2px 9px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {course.difficulty}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--ns-text)", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 4 }}>
                    {course.name}
                  </h3>
                  <p style={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--ns-text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
                    {course.fullName}
                  </p>

                  {/* Duration + Salary */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "12px 14px", borderRadius: "0.75rem", background: "var(--ns-surface-2)", border: "1px solid var(--ns-border-2)", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "6px", background: "var(--ns-bg)", border: "1px solid var(--ns-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Clock size={12} color="var(--ns-text-muted)" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.5rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--ns-text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Duration</div>
                        <div style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "var(--ns-text)" }}>{course.duration}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "6px", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <DollarSign size={12} color="#10b981" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.5rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--ns-text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Est. Salary</div>
                        <div style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#10b981" }}>{course.averageStartingSalary}</div>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.72rem", color: "var(--ns-text-muted)", lineHeight: 1.7 }}>
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
                    borderTop: "1px solid var(--ns-border)",
                    background: open ? "var(--ns-surface-2)" : "transparent",
                    color: open ? "var(--ns-text)" : "var(--ns-text-muted)",
                    fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    cursor: "pointer", borderLeft: "none", borderRight: "none", borderBottom: "none", width: "100%",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--ns-surface-2)"; e.currentTarget.style.color = "var(--ns-text)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = open ? "var(--ns-surface-2)" : "transparent"; e.currentTarget.style.color = open ? "var(--ns-text)" : "var(--ns-text-muted)"; }}
                >
                  <span>{open ? "Collapse details" : "Review eligibility & exams"}</span>
                  {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {/* Expanded detail drawer */}
                {open && (
                  <div id={`catalog-drawer-${course.id}`} style={{ padding: "18px 22px 22px", background: "var(--ns-bg)", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <span style={{ display: "block", fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "var(--ns-text-dim)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Eligibility Standards</span>
                      <p style={{ fontSize: "0.72rem", color: "var(--ns-text)", lineHeight: 1.65 }}>{course.eligibility}</p>
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "var(--ns-text-dim)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Core Admission Exams</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {course.topEntranceExams.map((ex, i) => (
                          <span key={i} style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: "var(--ns-surface)", border: "1px solid var(--ns-border)", color: "var(--ns-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "var(--ns-text-dim)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Career Pathways</span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {course.careerRoles.map((r, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ns-text-muted)", flexShrink: 0 }} />
                            <span style={{ fontSize: "0.68rem", color: "var(--ns-text)", fontWeight: 500 }}>{r}</span>
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
