import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { CustomCursor } from "./components/Shared";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Courses from "./pages/Courses";
import Exams from "./pages/Exams";
import Chat from "./pages/Chat";

export default function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: "Assessment",  path: "/assessment" },
    { label: "Courses",     path: "/courses" },
    { label: "Exams",       path: "/exams" },
    { label: "AI Copilot",  path: "/chat" },
  ];

  return (
    <div
      data-theme="indigo"
      style={{ minHeight: "100vh", background: "var(--ns-bg)", color: "var(--ns-text)", fontFamily: "'Epilogue', system-ui, sans-serif", display: "flex", flexDirection: "column" }}
    >
      <CustomCursor />

      {/* ══════════════════════════ NAVBAR ══════════════════════════ */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--ns-bg)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid var(--ns-border)" }}>
        <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 14px 6px 10px", border: "1px solid var(--ns-border)", borderRadius: "9999px", background: "var(--ns-surface)" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--color-accent-transparent)", border: "1px solid var(--spotlight-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <GraduationCap size={13} color="var(--color-accent)" />
              </div>
              <span style={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "-0.01em", color: "var(--ns-text)" }}>Margdarshak.</span>
            </div>
          </Link>

          {/* Centre links */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }} className="hidden-mobile">
            {navLinks.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  style={{
                    padding: "6px 14px", borderRadius: "9999px", textDecoration: "none",
                    border: isActive ? "1px solid var(--ns-border)" : "1px solid transparent",
                    background: isActive ? "var(--ns-surface)" : "transparent",
                    color: isActive ? "var(--ns-text)" : "var(--ns-text-muted)",
                    fontSize: "0.78rem", fontWeight: 500,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--ns-text)"; e.currentTarget.style.background = "var(--ns-surface)"; e.currentTarget.style.borderColor = "var(--ns-border)"; }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--ns-text-muted)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            to="/assessment"
            style={{
              textDecoration: "none",
              padding: "8px 22px", borderRadius: "9999px",
              background: "var(--color-accent-transparent)", border: "1px solid var(--spotlight-color)",
              color: "var(--color-accent)", fontSize: "0.78rem", fontWeight: 700,
              transition: "all 0.25s ease", flexShrink: 0,
              fontFamily: "'Epilogue', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--spotlight-color)"; e.currentTarget.style.boxShadow = "0 0 20px var(--spotlight-color)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--color-accent-transparent)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Start Assessment
          </Link>
        </nav>
      </header>

      {/* ══════════════════════════ MAIN CONTENT ══════════════════════════ */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer style={{ padding: "52px 28px 40px", borderTop: "1px solid var(--ns-border)", marginTop: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "var(--ns-text)", marginBottom: 10 }}>Margdarshak.</div>
              <p style={{ fontSize: "0.75rem", color: "var(--ns-text-muted)", lineHeight: 1.65, maxWidth: 280 }}>
                India's national undergraduate career guidance platform. Built for students from every stream and background.
              </p>
            </div>
            <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
              {[
                { heading: "Platform", links: ["Assessment", "Course Finder", "Exams Hub", "AI Copilot"] },
                { heading: "Exams",    links: ["JEE Advanced", "NEET-UG", "CUET", "CLAT", "IPMAT"] },
              ].map(col => (
                <div key={col.heading}>
                  <div style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--ns-text-dim)", marginBottom: 16 }}>
                    {col.heading}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {col.links.map(l => (
                      <a key={l} href="#" style={{ fontSize: "0.78rem", color: "var(--ns-text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--ns-text)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--ns-text-muted)")}
                      >{l}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ns-divider" style={{ marginBottom: 22, background: "var(--ns-border)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: "0.65rem", color: "var(--ns-text-dim)", fontFamily: "'JetBrains Mono', monospace" }}>© 2026 MARGDARSHAK · ALL RIGHTS RESERVED</span>
            <span style={{ fontSize: "0.65rem", color: "var(--ns-text-dim)", fontFamily: "'JetBrains Mono', monospace" }}>MARGDARSHAK · CAREER INTELLIGENCE PLATFORM</span>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (max-width: 640px) { .sr-left, .sr-right { transform: translateY(24px) !important; } .sr-left.sr-visible, .sr-right.sr-visible { transform: translateY(0) !important; } }
      `}</style>
    </div>
  );
}
