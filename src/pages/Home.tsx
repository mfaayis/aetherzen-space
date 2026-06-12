import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SR, Marquee } from "../components/Shared";
import { Sparkles, BookOpen, Award, HelpCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const modules = [
    {
      id: "survey",    path: "/assessment", num: "01", icon: <Sparkles size={22} />,
      label: "Interactive Assessment",
      desc: "5-step profiler that maps your stream, marks, and interests to personalised course recommendations.",
      cta: "Take the Survey",
    },
    {
      id: "directory", path: "/courses",    num: "02", icon: <BookOpen size={22} />,
      label: "Academic Course Finder",
      desc: "Search and filter 60+ undergraduate courses with full eligibility, salary, and entrance exam details.",
      cta: "Browse Courses",
    },
    {
      id: "exams",     path: "/exams",      num: "03", icon: <Award size={22} />,
      label: "Entrance Exams Hub",
      desc: "JEE, NEET, CUET, CLAT, IPMAT and more — syllabi, deadlines, difficulty, and eligibility checker.",
      cta: "Explore Exams",
    },
    {
      id: "chat",      path: "/chat",       num: "04", icon: <HelpCircle size={22} />,
      label: "AI Career Copilot",
      desc: "Ask MargDarshak anything about college admissions, courses, or career paths — powered by our custom intelligence engine.",
      cta: "Chat Now",
    },
  ] as const;

  return (
    <>
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section style={{ position: "relative", paddingTop: 130, paddingBottom: 90, textAlign: "center", overflow: "hidden" }}>
        {/* Spotlight */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "120%", height: "110%", background: "radial-gradient(ellipse 55% 55% at 50% 0%, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 30%, transparent 65%)", filter: "blur(1px)" }} />
          <div style={{ position: "absolute", top: "-5%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "80%", background: "radial-gradient(ellipse 40% 40% at 50% 0%, rgba(0,242,254,0.07) 0%, transparent 65%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          {/* Badge */}
          <div className="ns-fade-up" style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
            <div className="ns-badge">
              <span className="ns-badge-dot" />
              India's Smartest Career Guidance Platform
            </div>
          </div>

          {/* Heading */}
          <h1 className="ns-fade-up ns-delay-1" style={{ fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.045em", margin: "0 auto 16px", maxWidth: 860 }}>
            <span className="ns-heading-gradient">Discover Your</span>
            {" "}
            <strong style={{ color: "#fff" }}>Academic Future.</strong>
            <br />
            <em style={{ fontWeight: 300, fontStyle: "italic", fontSize: "0.88em", background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, #00f2fe 60%, rgba(255,255,255,0.45) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              We Guide Your Path.
            </em>
          </h1>

          <p className="ns-fade-up ns-delay-2" style={{ fontSize: "clamp(0.9rem, 2vw, 1.08rem)", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 44px" }}>
            Navigate PCM, PCB, Commerce, or Arts after Class&nbsp;12 with AI-powered career guidance, course discovery, and entrance exam planning — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="ns-fade-up ns-delay-3" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 64 }}>
            <Link
              to="/assessment"
              style={{ textDecoration: "none", padding: "13px 32px", borderRadius: "9999px", background: "#fff", border: "1px solid rgba(255,255,255,0.9)", color: "#000", fontSize: "0.88rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.88)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Start Free Assessment <ArrowRight size={16} />
            </Link>
            <Link
              to="/courses"
              style={{ textDecoration: "none", padding: "13px 32px", borderRadius: "9999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Explore Courses
            </Link>
          </div>

          {/* Stats */}
          <div className="ns-fade-up ns-delay-4" style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[{ num: "250+", label: "Universities" }, { num: "60+", label: "UG Courses" }, { num: "15+", label: "Entrance Exams" }, { num: "AI", label: "Powered Advisor" }].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.04em", background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.num}</div>
                <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Marquee */}
          <div className="ns-fade-up ns-delay-5">
            <Marquee />
          </div>
        </div>
      </section>

      <div className="ns-divider" />

      {/* ══════════════════════════ 4 MODULE CARDS ══════════════════════════ */}
      <section className="ns-grid" style={{ padding: "96px 0", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          <SR dir="left" className="">
            <div style={{ marginBottom: 56 }}>
              <div className="ns-badge" style={{ marginBottom: 18, display: "inline-flex" }}>
                <span className="ns-badge-dot" />
                Our Modules
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em" }}>
                <span style={{ color: "#fff" }}>Expert Career</span>{" "}
                <span className="ns-heading-gradient">Guidance Tools</span>
                <br />
                <em style={{ fontWeight: 300, fontSize: "0.85em", color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>Built For Every Indian Student</em>
              </h2>
            </div>
          </SR>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {modules.map((mod, i) => (
              <SR key={mod.id} delay={i * 70}>
                <div
                  onClick={() => navigate(mod.path)}
                  className="ns-noise"
                  style={{
                    position: "relative", padding: "30px 26px",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "1.5rem", cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    height: "100%",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = "1px solid rgba(0,242,254,0.25)";
                    e.currentTarget.style.background = "rgba(0,242,254,0.04)";
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(0,242,254,0.08), 0 20px 40px rgba(0,0,0,0.4)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: "11px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, color: "rgba(255,255,255,0.65)" }}>
                    {mod.icon}
                  </div>
                  <div style={{ fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,242,254,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 10 }}>
                    {mod.num}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.25, marginBottom: 12 }}>
                    {mod.label}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: 24 }}>
                    {mod.desc}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.7rem", fontWeight: 700, color: "rgba(0,242,254,0.7)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {mod.cta} <ArrowRight size={12} />
                  </div>
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      <div className="ns-divider" />

      {/* ══════════════════════════ CTA BANNER ══════════════════════════ */}
      <section style={{ padding: "110px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "200%", background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,242,254,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 28px", textAlign: "center", position: "relative" }}>
          <SR>
            <div className="ns-badge" style={{ display: "inline-flex", marginBottom: 24 }}>
              <span className="ns-badge-dot" />
              Start Today — Free & AI-Powered
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.045em", margin: "0 auto 20px", maxWidth: 680 }}>
              <span className="ns-heading-gradient">Your Tomorrow Starts</span>
              <br />
              <em style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.4)", fontSize: "0.85em" }}>With One Right Decision</em>
            </h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 40px" }}>
              Complete the 5-step assessment in under 3 minutes and receive a personalised academic roadmap built around your unique profile.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link
                to="/assessment"
                style={{ textDecoration: "none", padding: "14px 36px", borderRadius: "9999px", background: "#fff", border: "none", color: "#000", fontSize: "0.9rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 9, transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.88)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Begin Free Assessment <ArrowRight size={16} />
              </Link>
              <Link
                to="/chat"
                style={{ textDecoration: "none", padding: "14px 32px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              >
                Chat with AI Counsellor
              </Link>
            </div>
          </SR>
        </div>
      </section>
    </>
  );
}
