"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Digital Strategy",
    description: "Aligning brand vision with futuristic web architectures.",
  },
  {
    id: "02",
    title: "Interaction Design",
    description: "Crafting micro-animations that breathe life into interfaces.",
  },
  {
    id: "03",
    title: "Creative Development",
    description: "Pushing the limits of WebGL, GSAP, and modern frameworks.",
  },
  {
    id: "04",
    title: "Performance Optimization",
    description: "Ensuring 60fps animations without sacrificing quality.",
  },
];

const MagneticCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    cardRef.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    cardRef.current.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "translate(0px, 0px) scale(1)";
    cardRef.current.style.transition = "transform 0.5s ease-out";
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.1 } },
      }}
      initial="hidden"
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel group p-8 md:p-12 border-t border-white/10 cursor-pointer flex flex-col md:flex-row gap-6 md:items-center justify-between transition-colors hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-8">
        <span className="text-2xl font-mono text-neutral-500 group-hover:text-white transition-colors">
          {service.id}
        </span>
        <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight group-hover:pl-4 transition-all duration-300">
          {service.title}
        </h3>
      </div>
      <p className="text-neutral-400 font-sans max-w-sm text-sm md:text-base group-hover:text-neutral-200 transition-colors">
        {service.description}
      </p>
    </motion.div>
  );
};

export function ServicesSection() {
  return (
    <section className="relative w-full py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter">
            Our <br /> Expertise.
          </h2>
        </div>
        <div className="flex flex-col">
          {services.map((service, i) => (
            <MagneticCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
