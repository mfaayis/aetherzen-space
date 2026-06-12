import React from "react";
import DynamicSurvey from "../components/DynamicSurvey";
import { SectionHero, SR } from "../components/Shared";
import { Zap, Brain, CheckCircle } from "lucide-react";

export default function Assessment() {
  return (
    <section id="assessment" style={{ paddingTop: 64 }}>
      <SectionHero
        num="01" label="Interactive Assessment"
        title="Student Career" italic="Profiling Survey"
        subtitle="Answer 5 quick questions about your stream, marks, and interests. Our engine maps your profile to the best-fit undergraduate courses — instantly."
        features={[
          { icon: <Zap size={14} />, text: "5-step profiling quiz covering stream, marks, interests, goals, and location preference." },
          { icon: <Brain size={14} />, text: "Local recommendation engine — no API needed. Results appear instantly based on your answers." },
          { icon: <CheckCircle size={14} />, text: "Top 3 course matches with compatibility %, salary range, duration, and entrance exams to target." },
        ]}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 100px" }}>
        <SR>
          <DynamicSurvey />
        </SR>
      </div>
    </section>
  );
}
