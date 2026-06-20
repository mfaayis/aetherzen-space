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
      { id: "pcb", label: "Science (PCB)", icon: "🧬", tags: { pcm: 1, pcb: 1 } }, // Assuming PCMB logic can take both
      { id: "commerce", label: "Commerce", icon: "📊", tags: { commerce: 1 } },
      { id: "humanities", label: "Arts / Humanities", icon: "🎭", tags: { humanities: 1 } },
    ],
  },
  {
    id: 2,
    question: "Which of these subjects do you genuinely enjoy the most?",
    multiSelect: true,
    options: [
      { id: "math", label: "Mathematics & Logic", icon: "🔢", tags: { math: 3, analytical: 1, tech: 1 } },
      { id: "bio", label: "Biology & Human Body", icon: "🩺", tags: { biology: 3, lab: 1 } },
      { id: "econ", label: "Economics & Finance", icon: "📈", tags: { business: 3, analytical: 1 } },
      { id: "lit", label: "Literature & History", icon: "📚", tags: { humanities: 3, creative: 1 } },
      { id: "art_sub", label: "Art & Design", icon: "🎨", tags: { creative: 3, studio: 1 } },
      { id: "comp_sci", label: "Computer Science", icon: "💻", tags: { tech: 3, analytical: 1 } },
    ],
  },
  {
    id: 3,
    question: "What is your preferred working style?",
    multiSelect: true,
    options: [
      { id: "hands_on", label: "Hands-on & Building things", icon: "🛠️", tags: { hands_on: 3, tech: 1 } },
      { id: "analytical", label: "Research & Analysis", icon: "🔍", tags: { analytical: 3 } },
      { id: "people", label: "Talking & Helping people", icon: "🤝", tags: { people_facing: 3, humanities: 1 } },
      { id: "creative_work", label: "Creating & Designing", icon: "✨", tags: { creative: 3 } },
      { id: "managing", label: "Leading & Organizing", icon: "👑", tags: { business: 2, people_facing: 2 } },
    ],
  },
  {
    id: 4,
    question: "What is your ideal work environment?",
    multiSelect: true,
    options: [
      { id: "office", label: "Corporate Office", icon: "🏢", tags: { office: 3 } },
      { id: "lab", label: "Hospital or Laboratory", icon: "🔬", tags: { lab: 3 } },
      { id: "field", label: "Outdoors / On-site", icon: "🌍", tags: { field: 3, hands_on: 1 } },
      { id: "studio", label: "Creative Studio", icon: "🎨", tags: { studio: 3, creative: 1 } },
      { id: "remote", label: "Remote / Work from home", icon: "🏠", tags: { remote: 3, tech: 1 } },
    ],
  },
  {
    id: 5,
    question: "How long are you willing to study before starting your career?",
    multiSelect: false,
    options: [
      { id: "short", label: "3-4 years (Get to work fast)", icon: "⚡", tags: { short_duration: 3, long_duration: -2 } },
      { id: "long", label: "5-6+ years (Deep specialization)", icon: "📚", tags: { long_duration: 3, short_duration: -2 } },
      { id: "any_dur", label: "I don't mind either way", icon: "⏳", tags: {} },
    ],
  },
  {
    id: 6,
    question: "How comfortable are you with technology and coding?",
    multiSelect: false,
    options: [
      { id: "pro_code", label: "I love it, want to build software", icon: "⌨️", tags: { tech: 4, analytical: 1 } },
      { id: "mid_code", label: "I can use tech tools, but don't want to code", icon: "📱", tags: { tech: 1 } },
      { id: "no_code", label: "I prefer working away from screens", icon: "🌲", tags: { tech: -3, field: 1, people_facing: 1 } },
    ],
  },
  {
    id: 7,
    question: "What's your stance on career risk vs. stability?",
    multiSelect: false,
    options: [
      { id: "stable", label: "I want a stable, structured job (Govt/MNC)", icon: "🏛️", tags: { risk_averse: 3, office: 1 } },
      { id: "risk", label: "I'm open to risks and entrepreneurship", icon: "🚀", tags: { risk_tolerant: 3, business: 1 } },
      { id: "any_risk", label: "Somewhere in the middle", icon: "⚖️", tags: {} },
    ],
  },
  {
    id: 8,
    question: "Are you comfortable with courses that require intense physical endurance or field work? (e.g. Defence, Civil Eng)",
    multiSelect: false,
    options: [
      { id: "yes_endurance", label: "Yes, I enjoy physical challenges", icon: "🏃", tags: { field: 2, hands_on: 2 } },
      { id: "no_endurance", label: "No, I prefer desk or indoor work", icon: "🪑", tags: { office: 2, lab: 1, field: -2 } },
    ],
  },
  {
    id: 9,
    question: "What motivates you the most?",
    multiSelect: true,
    options: [
      { id: "money", label: "High Salary & Wealth", icon: "💰", tags: { business: 2, tech: 1, risk_tolerant: 1 } },
      { id: "impact", label: "Helping Society", icon: "❤️", tags: { people_facing: 2, biology: 1, humanities: 1 } },
      { id: "innovation", label: "Creating new things", icon: "💡", tags: { creative: 2, tech: 1, analytical: 1 } },
      { id: "status", label: "Prestige & Respect", icon: "🏆", tags: { long_duration: 1, office: 1 } },
    ],
  },
  {
    id: 10,
    question: "Do you prefer working with Data, Things, or People?",
    multiSelect: true,
    options: [
      { id: "data", label: "Data & Numbers", icon: "📊", tags: { analytical: 3, math: 2 } },
      { id: "things", label: "Machines & Things", icon: "⚙️", tags: { hands_on: 3, tech: 1 } },
      { id: "people_pref", label: "People & Emotions", icon: "👥", tags: { people_facing: 3, humanities: 2 } },
    ],
  },
];
