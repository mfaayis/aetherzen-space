import React, { useState, useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const mouse   = useRef({ x: -300, y: -300 });
  const ringPos = useRef({ x: -300, y: -300 });
  const glowPos = useRef({ x: -300, y: -300 });
  const frame   = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.14);
      glowPos.current.x = lerp(glowPos.current.x, mouse.current.x, 0.04);
      glowPos.current.y = lerp(glowPos.current.y, mouse.current.y, 0.04);

      const tf = (x: number, y: number) => `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      if (dotRef.current)  dotRef.current.style.transform  = tf(mouse.current.x, mouse.current.y);
      if (ringRef.current) ringRef.current.style.transform = tf(ringPos.current.x, ringPos.current.y);
      if (glowRef.current) glowRef.current.style.transform = tf(glowPos.current.x, glowPos.current.y);

      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    const move  = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const enter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button,a,[role="button"],input,select,textarea')) {
        dotRef.current?.classList.add('ns-cursor-hover');
        ringRef.current?.classList.add('ns-cursor-hover');
        glowRef.current?.classList.add('ns-cursor-hover');
      }
    };
    const leave = (e: MouseEvent) => {
      if (!(e.relatedTarget as HTMLElement)?.closest('button,a,[role="button"],input,select,textarea')) {
        dotRef.current?.classList.remove('ns-cursor-hover');
        ringRef.current?.classList.remove('ns-cursor-hover');
        glowRef.current?.classList.remove('ns-cursor-hover');
      }
    };
    const down = () => {
      ringRef.current?.classList.add('ns-cursor-click');
      dotRef.current?.classList.add('ns-cursor-click');
      glowRef.current?.classList.add('ns-cursor-click');
    };
    const up = () => {
      ringRef.current?.classList.remove('ns-cursor-click');
      dotRef.current?.classList.remove('ns-cursor-click');
      glowRef.current?.classList.remove('ns-cursor-click');
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout',  leave);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup',   up);
    return () => {
      cancelAnimationFrame(frame.current);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout',  leave);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup',   up);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="ns-cursor-glow" style={{
        position:'fixed', top:0, left:0, width:560, height:560, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(0,242,254,0.10) 0%, rgba(0,242,254,0.04) 40%, transparent 70%)',
        pointerEvents:'none', zIndex:1, willChange:'transform', filter:'blur(40px)',
        transition:'background 0.5s ease, width 0.4s ease, height 0.4s ease',
      }} />
      <div ref={dotRef} className="ns-cursor-dot" style={{
        position:'fixed', top:0, left:0, width:7, height:7, borderRadius:'50%',
        background:'#ffffff', pointerEvents:'none', zIndex:99999, willChange:'transform',
        mixBlendMode:'difference', transition:'width 0.2s ease, height 0.2s ease',
      }} />
      <div ref={ringRef} className="ns-cursor-ring" style={{
        position:'fixed', top:0, left:0, width:36, height:36, borderRadius:'50%',
        border:'1.5px solid rgba(255,255,255,0.4)', pointerEvents:'none', zIndex:99998,
        willChange:'transform', transition:'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease',
      }} />
    </>
  );
}

export function useReveal() {
  const ref  = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function SR({ children, delay = 0, dir = "up", className = "" }: { children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right"; className?: string }) {
  const { ref, visible } = useReveal();
  const cls = dir === "left" ? "sr-left" : dir === "right" ? "sr-right" : "sr-init";
  return (
    <div ref={ref} className={`${cls}${visible ? " sr-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const MARQUEE = ["JEE ADVANCED","NEET-UG","CUET","CAT","CLAT","GATE","IIT • NIT • IIIT","AIIMS","BITSAT","MHT-CET","IPMAT","UCEED","NATA","NID DAT","JEE ADVANCED","NEET-UG","CUET","CAT","CLAT","GATE","IIT • NIT • IIIT","AIIMS","BITSAT","MHT-CET","IPMAT"];

export function Marquee() {
  return (
    <div className="ns-marquee-wrap" style={{ marginTop: 56 }}>
      <div className="ns-marquee-track">
        {MARQUEE.map((item, i) => (
          <span key={i} style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", whiteSpace: "nowrap", padding: "0 4px", transition: "color 0.2s ease" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00f2fe")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >{item}</span>
        ))}
      </div>
    </div>
  );
}

export function SectionHero({ num, label, title, italic, subtitle, features }: {
  num: string; label: string;
  title: string; italic: string; subtitle: string;
  features: { icon: React.ReactNode; text: string }[];
}) {
  return (
    <div style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "72px 0 60px",
      marginBottom: 0,
    }}>
      <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "200%", background: "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,242,254,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <SR dir="left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 14px", borderRadius: "9999px", border: "1px solid rgba(0,242,254,0.25)", background: "rgba(0,242,254,0.06)", fontSize: "0.62rem", color: "rgba(0,242,254,0.8)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00f2fe", display: "inline-block" }} />
              {num} · {label}
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#fff", marginBottom: 16 }}>
              {title}<br />
              <em style={{ fontWeight: 300, fontStyle: "italic", fontSize: "0.88em", background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, #00f2fe 70%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {italic}
              </em>
            </h2>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.75, maxWidth: 440 }}>
              {subtitle}
            </p>
          </SR>

          <SR dir="right">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 20px", borderRadius: "1rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "0.5rem", background: "rgba(0,242,254,0.08)", border: "1px solid rgba(0,242,254,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(0,242,254,0.7)", flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, paddingTop: 5 }}>{f.text}</p>
                </div>
              ))}
            </div>
          </SR>
        </div>
      </div>
    </div>
  );
}
