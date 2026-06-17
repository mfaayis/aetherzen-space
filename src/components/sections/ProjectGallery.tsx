"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const images = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
];

export function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");
      
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, rotateY: 15 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 z-10 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter mb-16 text-center">
          Visual Explorations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {images.map((src, i) => (
            <div 
              key={i} 
              className={`gallery-card relative w-full h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden group ${i % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              {/* Note: In a real app we'd use next/image, but for generic unsplash we use img tag to avoid domain config issues */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt={`Project ${i + 1}`} 
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-in-out filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <h3 className="text-3xl font-heading uppercase font-bold">Experiment {i + 1}</h3>
                <p className="font-sans text-sm tracking-widest uppercase mt-2">View Case Study</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
