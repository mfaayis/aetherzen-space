"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const caseStudies = [
  { id: 1, title: "Lumina", category: "Web3 Platform", color: "from-blue-500 to-cyan-500" },
  { id: 2, title: "Aura", category: "Fintech App", color: "from-purple-500 to-pink-500" },
  { id: 3, title: "Nexus", category: "AI Interface", color: "from-emerald-500 to-teal-500" },
  { id: 4, title: "Onyx", category: "E-Commerce", color: "from-orange-500 to-red-500" },
];

export function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollWrapperRef.current?.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;

      if (!scrollWidth || !clientWidth) return;

      const xAmount = scrollWidth - clientWidth;

      gsap.to(scrollWrapperRef.current, {
        x: -xAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${xAmount}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-black z-10 overflow-hidden">
      <div className="absolute top-12 left-6 md:left-12 z-20 mix-blend-difference">
        <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter text-white">
          Selected Works
        </h2>
      </div>

      <div 
        ref={scrollWrapperRef} 
        className="flex h-full w-[400vw] md:w-[300vw] items-center px-6 md:px-32 gap-12 md:gap-32"
      >
        {caseStudies.map((study) => (
          <div 
            key={study.id} 
            className="group relative w-[80vw] md:w-[60vw] h-[60vh] shrink-0 rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Image Placeholder using a gradient background for now */}
            <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out`} />
            
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-all duration-500 group-hover:backdrop-blur-0 group-hover:bg-transparent" />
            
            <div className="absolute bottom-10 left-10 text-white z-10 flex flex-col">
              <span className="text-sm font-mono uppercase tracking-widest mb-2 opacity-70 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {study.category}
              </span>
              <h3 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {study.title}
              </h3>
            </div>
            
            <div className="absolute top-10 right-10 w-16 h-16 rounded-full border border-white/30 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-100 backdrop-blur-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
