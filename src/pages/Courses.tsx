import React from "react";
import CourseDirectory from "../components/CourseDirectory";
import { SectionHero, SR } from "../components/Shared";
import { BookOpen, Award, CheckCircle } from "lucide-react";

export default function Courses() {
  return (
    <section id="courses" style={{ paddingTop: 64 }}>
      <SectionHero
        num="02" label="Academic Course Finder"
        title="Browse Indian" italic="UG Course Directory"
        subtitle="Explore 60+ undergraduate programs across PCM, PCB, Commerce, and Arts streams with full eligibility criteria, salary data, and entrance exam requirements."
        features={[
          { icon: <BookOpen size={14} />, text: "Filter by stream, search by keyword, or browse all 60+ undergraduate programs side-by-side." },
          { icon: <Award size={14} />, text: "Each course shows duration, estimated salary, eligibility criteria, and top entrance exams." },
          { icon: <CheckCircle size={14} />, text: "Expand any card to reveal full eligibility standards, admission process, and career pathways." },
        ]}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 100px" }}>
        <SR>
          <CourseDirectory />
        </SR>
      </div>
    </section>
  );
}
