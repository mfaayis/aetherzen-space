"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 500, label: "Students Guided", suffix: "k+" },
  { value: 95, label: "Match Accuracy", suffix: "%" },
  { value: 120, label: "Courses Mapped", suffix: "+" },
  { value: 50, label: "Top Universities", suffix: "+" },
];

function Counter({ from, to, duration, suffix = "" }: { from: number, to: number, duration: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  const startedRef = useRef(false);

  useEffect(() => {
    if (isInView && !startedRef.current) {
      startedRef.current = true;
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentVal = Math.floor(easeProgress * (to - from) + from);
        if (nodeRef.current) {
          nodeRef.current.textContent = currentVal + suffix;
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else if (nodeRef.current) {
          nodeRef.current.textContent = to + suffix;
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="relative w-full py-32 z-10 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="text-5xl md:text-8xl font-heading font-bold text-white tracking-tighter mb-4">
                <Counter from={0} to={stat.value} duration={2 + i * 0.5} suffix={stat.suffix} />
              </div>
              <div className="text-neutral-400 font-sans uppercase tracking-widest text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
