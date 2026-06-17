"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 100, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        subTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1 }
      );

      // Scroll Parallax Effect
      gsap.to(containerRef.current, {
        y: "30%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="z-10 flex flex-col items-center text-center px-4 mix-blend-difference">
        <h1
          ref={textRef}
          className="text-massive font-heading flex flex-col items-center leading-[0.85] tracking-tighter"
        >
          <span className="block overflow-hidden pb-4">
            <span className="inline-block transform origin-bottom">DISCOVER</span>
          </span>
          <span className="block overflow-hidden pb-4">
            <span className="inline-block transform origin-bottom text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600">
              YOUR PATH
            </span>
          </span>
        </h1>

        <p
          ref={subTextRef}
          className="mt-8 max-w-xl text-lg md:text-2xl text-neutral-400 font-sans opacity-0"
        >
          An immersive assessment to guide your post-12th journey. Find the perfect course and career mapped uniquely to your strengths.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-12 px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide text-sm md:text-base transition-colors hover:bg-neutral-200"
        >
          TAKE THE ASSESSMENT
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-sans">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
