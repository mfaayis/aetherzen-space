import React from "react";
import CounsellorChat from "../components/CounsellorChat";
import { SectionHero, SR } from "../components/Shared";
import { Sparkles, HelpCircle, Brain } from "lucide-react";

export default function Chat() {
  return (
    <section id="copilot" style={{ paddingTop: 64 }}>
      <SectionHero
        num="04" label="AI Career Copilot"
        title="MargDarshak" italic="Your AI Counsellor"
        subtitle="Ask anything about Indian undergraduate admissions — college choices, entrance strategies, stream switching, or career paths. Powered by our intelligence engine with instant, expert responses."
        features={[
          { icon: <Sparkles size={14} />, text: "Powered by our intelligence engine — understands complex Indian education system queries with nuanced answers." },
          { icon: <HelpCircle size={14} />, text: "Pre-loaded shortcut prompts covering the most common student questions about post-12th choices." },
          { icon: <Brain size={14} />, text: "Remembers your conversation context — ask follow-up questions naturally like talking to a real counsellor." },
        ]}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 100px" }}>
        <SR>
          <CounsellorChat />
        </SR>
      </div>
    </section>
  );
}
