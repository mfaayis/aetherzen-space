import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Only register in browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
