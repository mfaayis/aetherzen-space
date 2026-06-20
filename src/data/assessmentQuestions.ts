export interface AssessmentOption {
  id: string;
  label: string;
  icon: string;
  tags: Record<string, number>;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  multiSelect: boolean;
  options: AssessmentOption[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    question: "What is your 12th-grade stream?",
    multiSelect: false,
    options: [
      { id: "pcm", label: "Science (PCM)", icon: "📐", tags: { pcm: 1 } },
      { id: "pcb", label: "Science (PCB)", icon: "🧬", tags: { pcb: 1 } }, 
      { id: "pcmb", label: "Science (PCMB)", icon: "🔬", tags: { pcm: 1, pcb: 1 } },
      { id: "commerce", label: "Commerce", icon: "📊", tags: { commerce: 1 } },
      { id: "humanities", label: "Arts / Humanities", icon: "🎭", tags: { humanities: 1 } },
    ],
  },
  {
    id: 2,
    question: "Which of these subjects or domains do you genuinely enjoy the most?",
    multiSelect: true,
    options: [
      { id: "math", label: "Mathematics & Logic", icon: "🔢", tags: { math: 3, analytical: 2, tech: 1 } },
      { id: "bio", label: "Biology & Human Body", icon: "🩺", tags: { biology: 3, lab: 2 } },
      { id: "econ", label: "Finance, Trading & Economics", icon: "📈", tags: { business: 3, analytical: 2, risk_tolerant: 1 } },
      { id: "lit", label: "Literature, History & Law", icon: "📚", tags: { humanities: 3, analytical: 1 } },
      { id: "art_sub", label: "Art, Design & Media", icon: "🎨", tags: { creative: 3, studio: 2 } },
      { id: "comp_sci", label: "Computer Science & IT", icon: "💻", tags: { tech: 3, analytical: 2 } },
      { id: "content", label: "Content Creation & Marketing", icon: "📱", tags: { creative: 2, business: 2, people_facing: 2 } },
      { id: "env", label: "Agriculture, Nature & Environment", icon: "🌿", tags: { biology: 2, field: 3, hands_on: 1 } },
      { id: "psych", label: "Psychology & Human Behavior", icon: "🧠", tags: { people_facing: 3, analytical: 1, humanities: 2 } },
      { id: "sports", label: "Physical Education & Sports", icon: "⚽", tags: { hands_on: 2, field: 2, people_facing: 1 } },
    ],
  },
  {
    id: 3,
    question: "What is your preferred working style?",
    multiSelect: true,
    options: [
      { id: "hands_on", label: "Hands-on & Building things", icon: "🛠️", tags: { hands_on: 3, tech: 1 } },
      { id: "analytical", label: "Research & Data Analysis", icon: "🔍", tags: { analytical: 3, math: 1 } },
      { id: "people", label: "Talking, Entertaining & Helping people", icon: "🤝", tags: { people_facing: 3, humanities: 1 } },
      { id: "creative_work", label: "Creating & Designing", icon: "✨", tags: { creative: 3 } },
      { id: "managing", label: "Leading, Managing & Selling", icon: "👑", tags: { business: 3, people_facing: 1 } },
      { id: "solo_digital", label: "Independent Digital Work (e.g. Trading, SaaS)", icon: "💻", tags: { business: 2, tech: 2, risk_tolerant: 2 } },
      { id: "structured", label: "Structured & Process-Oriented (Rules, Audits)", icon: "📋", tags: { office: 2, risk_averse: 2, analytical: 1 } },
      { id: "physical", label: "Physical Activity & On the Move", icon: "🏃‍♂️", tags: { field: 3, hands_on: 2 } },
    ],
  },
  {
    id: 4,
    question: "What is your ideal work environment?",
    multiSelect: true,
    options: [
      { id: "office", label: "Corporate Office", icon: "🏢", tags: { office: 3 } },
      { id: "lab", label: "Hospital or Laboratory", icon: "🔬", tags: { lab: 3 } },
      { id: "field", label: "Outdoors / On-site", icon: "🌍", tags: { field: 3, hands_on: 2 } },
      { id: "studio", label: "Creative Studio / Set", icon: "🎨", tags: { studio: 3, creative: 2 } },
      { id: "remote", label: "Remote / Work from Anywhere", icon: "✈️", tags: { remote: 3, tech: 2, business: 1, creative: 1 } },
    ],
  },
  {
    id: 5,
    question: "How long are you willing to study before starting your career?",
    multiSelect: false,
    options: [
      { id: "very_short", label: "6-12 Months (Certs / Self-Taught)", icon: "🚀", tags: { short_duration: 4, hands_on: 1, long_duration: -3 } },
      { id: "short", label: "3-4 years (Standard Degree)", icon: "🎓", tags: { short_duration: 1 } },
      { id: "long", label: "5-6+ years (Deep specialization like MBBS/Law)", icon: "📚", tags: { long_duration: 4, short_duration: -3 } },
    ],
  },
  {
    id: 6,
    question: "How comfortable are you with technology and coding?",
    multiSelect: false,
    options: [
      { id: "pro_code", label: "I love it, I want to build software & AI", icon: "⌨️", tags: { tech: 4, analytical: 2 } },
      { id: "mid_code", label: "I use tech creatively (Video Editing, Marketing, Design)", icon: "📱", tags: { tech: 2, creative: 3 } },
      { id: "no_code", label: "I prefer working away from screens", icon: "🌲", tags: { tech: -4, field: 2, people_facing: 2, hands_on: 2 } },
    ],
  },
  {
    id: 7,
    question: "What's your stance on career risk vs. stability?",
    multiSelect: false,
    options: [
      { id: "stable", label: "I want a stable, highly secure job (Govt/MNC)", icon: "🏛️", tags: { risk_averse: 4, office: 2 } },
      { id: "risk", label: "I want high risk / high reward (Startups, Trading, Content)", icon: "🚀", tags: { risk_tolerant: 5, business: 2, creative: 1 } },
      { id: "any_risk", label: "Somewhere in the middle", icon: "⚖️", tags: { risk_averse: 1, risk_tolerant: 1 } },
    ],
  },
  {
    id: 8,
    question: "Are you comfortable with courses that require intense physical endurance or field work? (e.g. Defence, Civil Eng)",
    multiSelect: false,
    options: [
      { id: "yes_endurance", label: "Yes, I enjoy physical challenges", icon: "🏃", tags: { field: 3, hands_on: 2 } },
      { id: "no_endurance", label: "No, I prefer desk, studio, or indoor work", icon: "🪑", tags: { office: 2, lab: 1, studio: 1, field: -3 } },
    ],
  },
  {
    id: 9,
    question: "What motivates you the most in a career?",
    multiSelect: true,
    options: [
      { id: "money", label: "Financial Freedom & Scaling Income", icon: "💰", tags: { business: 3, risk_tolerant: 2, tech: 1 } },
      { id: "impact", label: "Helping Society & Saving Lives", icon: "❤️", tags: { people_facing: 3, biology: 2, humanities: 1 } },
      { id: "innovation", label: "Creating, Inventing & Entertaining", icon: "💡", tags: { creative: 3, tech: 1, studio: 1 } },
      { id: "status", label: "Prestige, Respect & Authority", icon: "🏆", tags: { long_duration: 2, office: 2, analytical: 1 } },
      { id: "flexibility", label: "Work-Life Balance & Freedom", icon: "🌴", tags: { remote: 3, short_duration: 1, risk_tolerant: 1 } },
      { id: "adrenaline", label: "Adrenaline & High Stakes", icon: "⚡", tags: { risk_tolerant: 3, field: 1, business: 1 } },
    ],
  },
  {
    id: 10,
    question: "Do you prefer working with Data, Things, or People?",
    multiSelect: true,
    options: [
      { id: "data", label: "Data, Code & Numbers", icon: "📊", tags: { analytical: 3, math: 2, tech: 2 } },
      { id: "things", label: "Machines, Hardware & Tools", icon: "⚙️", tags: { hands_on: 4, tech: 1, field: 1 } },
      { id: "people_pref", label: "People, Audiences & Emotions", icon: "👥", tags: { people_facing: 3, creative: 2, humanities: 1 } },
    ],
  }
];
