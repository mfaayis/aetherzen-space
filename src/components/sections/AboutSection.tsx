"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((text) => {
        if (!text) return;
        gsap.fromTo(
          text,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 md:py-32 z-10"
    >
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        {/* Left Side: Headline */}
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase leading-[1.1] tracking-tighter">
            Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-700">
              Future
            </span>{" "}
            <br />
            Decoded.
          </h2>
          <div className="w-20 h-1 bg-white mt-4" />
        </div>

        {/* Right Side: Text Blocks */}
        <div className="flex flex-col gap-10 font-sans text-lg md:text-2xl text-neutral-400 leading-relaxed">
          <p ref={(el) => { textRefs.current[0] = el; }}>
            We don&apos;t just list courses. We analyze your unique strengths, interests, and working styles to map out a trajectory that feels right for you.
          </p>
          <p ref={(el) => { textRefs.current[1] = el; }}>
            The jump after 12th grade is massive. We replace the confusion of endless brochures with a clear, data-driven, and highly immersive discovery process.
          </p>
          <div 
            ref={(el) => { textRefs.current[2] = el; }}
            className="glass-panel p-8 rounded-2xl mt-4 border border-white/10"
          >
            <h3 className="text-white text-xl font-heading mb-2">Our Method</h3>
            <p className="text-sm md:text-base text-neutral-300">
              By asking the right questions, we filter through hundreds of career paths and degrees. The result? A personalized blueprint designed for your success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
