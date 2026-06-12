import React from "react";
import ExamRoadmap from "../components/ExamRoadmap";
import { SectionHero, SR } from "../components/Shared";
import { Compass, Award, Zap } from "lucide-react";

export default function Exams() {
  return (
    <section id="exams" style={{ paddingTop: 64 }}>
      <SectionHero
        num="03" label="Entrance Exams Hub"
        title="Post-12th Entrance" italic="Exam Roadmap"
        subtitle="Everything you need to know about JEE, NEET, CUET, CLAT, IPMAT, NATA, and more — exam patterns, registration windows, difficulty, and your personal eligibility check."
        features={[
          { icon: <Compass size={14} />, text: "Built-in eligibility simulator — enter your stream, marks, and subjects to instantly check which exams you qualify for." },
          { icon: <Award size={14} />, text: "Full exam breakdowns: timing, registration window, difficulty rank, syllabus themes, and official portal links." },
          { icon: <Zap size={14} />, text: "Filter by stream — PCM, PCB, or All Streams — to only see relevant exams for your profile." },
        ]}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 100px" }}>
        <SR>
          <ExamRoadmap />
        </SR>
      </div>
    </section>
  );
}
