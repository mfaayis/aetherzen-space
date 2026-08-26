// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT QUESTIONS v2
//
// 12 questions covering 17 career dimensions:
//   analytical, creative, tech, people_facing, hands_on, business, biology,
//   math, humanities, risk_tolerant, risk_averse, field, lab, studio, office,
//   remote, short_duration, long_duration
//
// Tag weights are intentionally varied so the scoring engine produces
// realistic, differentiated results rather than artificial clustering.
// ─────────────────────────────────────────────────────────────────────────────

export interface AssessmentOption {
  id: string;
  label: string;
  icon: string;
  // Dimension → weight mapping (negative weights are valid dealbreakers)
  tags: Record<string, number>;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  subtext?: string;
  multiSelect: boolean;
  options: AssessmentOption[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  // ── Q1: STREAM ─────────────────────────────────────────────────────────────
  // Purpose: Eligibility filter. Sets hard stream constraint for course matching.
  {
    id: 1,
    question: "What is your 12th-grade stream?",
    multiSelect: false,
    options: [
      {
        id: "pcm",
        label: "Science (PCM)",
        icon: "📐",
        tags: { math: 2, analytical: 1 },
      },
      {
        id: "pcb",
        label: "Science (PCB)",
        icon: "🧬",
        tags: { biology: 2, lab: 1 },
      },
      {
        id: "pcmb",
        label: "Science (PCMB)",
        icon: "🔬",
        tags: { math: 2, biology: 2, analytical: 1, lab: 1 },
      },
      {
        id: "commerce",
        label: "Commerce",
        icon: "📊",
        tags: { business: 2, analytical: 1 },
      },
      {
        id: "humanities",
        label: "Arts / Humanities",
        icon: "🎭",
        tags: { humanities: 2, people_facing: 1 },
      },
    ],
  },

  // ── Q2: SUBJECT INTEREST ───────────────────────────────────────────────────
  // Purpose: Core INTEREST dimension. Separates domain affinities clearly.
  // Measures: tech, biology, business/finance, humanities/law, creative/design,
  //           computer science, communication, environment, psychology, sports.
  {
    id: 2,
    question: "Which subjects or domains genuinely excite you?",
    subtext: "Select all that truly interest you — not just what you're good at.",
    multiSelect: true,
    options: [
      {
        id: "math",
        label: "Mathematics & Logic",
        icon: "🔢",
        tags: { math: 4, analytical: 2 },
      },
      {
        id: "bio",
        label: "Biology & Human Body",
        icon: "🩺",
        tags: { biology: 4, lab: 2 },
      },
      {
        id: "econ",
        label: "Finance, Trading & Economics",
        icon: "📈",
        tags: { business: 4, analytical: 2, risk_tolerant: 1 },
      },
      {
        id: "lit",
        label: "Literature, History & Law",
        icon: "📚",
        tags: { humanities: 4, people_facing: 1, analytical: 1 },
      },
      {
        id: "art_sub",
        label: "Art, Design & Visual Media",
        icon: "🎨",
        tags: { creative: 4, studio: 2 },
      },
      {
        id: "comp_sci",
        label: "Computer Science & AI",
        icon: "💻",
        tags: { tech: 4, analytical: 3, math: 1 },
      },
      {
        id: "content",
        label: "Content Creation & Marketing",
        icon: "📱",
        tags: { creative: 3, business: 2, people_facing: 2 },
      },
      {
        id: "env",
        label: "Agriculture, Nature & Environment",
        icon: "🌿",
        tags: { biology: 3, field: 3 },
      },
      {
        id: "psych",
        label: "Psychology & Human Behaviour",
        icon: "🧠",
        tags: { people_facing: 4, humanities: 2, analytical: 1 },
      },
      {
        id: "sports",
        label: "Physical Education & Sports",
        icon: "⚽",
        tags: { hands_on: 3, field: 2, people_facing: 1 },
      },
    ],
  },

  // ── Q3: APTITUDE / NATURAL STRENGTH ────────────────────────────────────────
  // Purpose: APTITUDE dimension. Distinct from interest — what you're good at.
  // Measures: analytical reasoning, creativity, communication, technical,
  //           leadership, memory/precision, physical skill.
  {
    id: 3,
    question: "What comes most naturally to you — even without trying hard?",
    subtext: "This is about genuine strength, not just preference.",
    multiSelect: true,
    options: [
      {
        id: "apt_logic",
        label: "Logical reasoning & problem solving",
        icon: "🧩",
        tags: { analytical: 4, math: 2 },
      },
      {
        id: "apt_creative",
        label: "Creative thinking & original ideas",
        icon: "💡",
        tags: { creative: 4, studio: 1 },
      },
      {
        id: "apt_comm",
        label: "Communicating, persuading & storytelling",
        icon: "🗣️",
        tags: { people_facing: 4, humanities: 2 },
      },
      {
        id: "apt_tech",
        label: "Learning & using technology quickly",
        icon: "⚡",
        tags: { tech: 4, analytical: 2 },
      },
      {
        id: "apt_lead",
        label: "Organising, leading & selling",
        icon: "👑",
        tags: { business: 4, people_facing: 2 },
      },
      {
        id: "apt_detail",
        label: "Precision, memory & attention to detail",
        icon: "🔍",
        tags: { analytical: 3, lab: 2, office: 1 },
      },
      {
        id: "apt_physical",
        label: "Physical coordination & endurance",
        icon: "🏃",
        tags: { hands_on: 4, field: 3 },
      },
    ],
  },

  // ── Q4: WORK STYLE ─────────────────────────────────────────────────────────
  // Purpose: WORK STYLE dimension. How you prefer to spend your working hours.
  // Measures: hands-on, research, social/helping, creating, leading, digital-
  //           independent, structured, physical.
  {
    id: 4,
    question: "How do you most enjoy spending your time at work?",
    multiSelect: true,
    options: [
      {
        id: "ws_build",
        label: "Building, making & fixing things",
        icon: "🛠️",
        tags: { hands_on: 4, tech: 1 },
      },
      {
        id: "ws_research",
        label: "Researching, analysing data & finding patterns",
        icon: "🔭",
        tags: { analytical: 4, math: 1 },
      },
      {
        id: "ws_help",
        label: "Helping, teaching or counselling people",
        icon: "🤝",
        tags: { people_facing: 4, humanities: 1 },
      },
      {
        id: "ws_design",
        label: "Designing, drawing or crafting visuals",
        icon: "✨",
        tags: { creative: 4, studio: 2 },
      },
      {
        id: "ws_manage",
        label: "Leading teams & managing projects",
        icon: "📋",
        tags: { business: 3, people_facing: 2, office: 1 },
      },
      {
        id: "ws_digital",
        label: "Independent digital work (coding, trading, content)",
        icon: "💻",
        tags: { tech: 3, business: 2, remote: 2 },
      },
      {
        id: "ws_process",
        label: "Following structured processes & auditing",
        icon: "📁",
        tags: { analytical: 2, office: 3, risk_averse: 2 },
      },
    ],
  },

  // ── Q5: WORK ENVIRONMENT ───────────────────────────────────────────────────
  // Purpose: ENVIRONMENT dimension. Where you want to physically work.
  {
    id: 5,
    question: "What is your ideal work environment?",
    multiSelect: true,
    options: [
      {
        id: "env_office",
        label: "Corporate office or headquarters",
        icon: "🏢",
        tags: { office: 4 },
      },
      {
        id: "env_lab",
        label: "Hospital, clinic or research laboratory",
        icon: "🔬",
        tags: { lab: 4, biology: 1 },
      },
      {
        id: "env_field",
        label: "Outdoors, on-site or in the field",
        icon: "🌍",
        tags: { field: 4, hands_on: 2 },
      },
      {
        id: "env_studio",
        label: "Creative studio, film set or design space",
        icon: "🎨",
        tags: { studio: 4, creative: 2 },
      },
      {
        id: "env_remote",
        label: "Remote — from anywhere in the world",
        icon: "✈️",
        tags: { remote: 4, tech: 1, business: 1 },
      },
    ],
  },

  // ── Q6: EDUCATION DURATION ─────────────────────────────────────────────────
  // Purpose: EDUCATION dimension. Willingness to invest time in qualifications.
  {
    id: 6,
    question: "How long are you willing to study before starting your career?",
    multiSelect: false,
    options: [
      {
        id: "edu_short",
        label: "6–12 months (certifications / self-taught)",
        icon: "🚀",
        tags: { short_duration: 5, long_duration: -3 },
      },
      {
        id: "edu_standard",
        label: "3–4 years (standard undergraduate degree)",
        icon: "🎓",
        tags: { short_duration: 2, long_duration: 0 },
      },
      {
        id: "edu_long",
        label: "5–6+ years (MBBS, Law, deep specialisation)",
        icon: "📚",
        tags: { long_duration: 5, short_duration: -3 },
      },
    ],
  },

  // ── Q7: TECHNOLOGY COMFORT ─────────────────────────────────────────────────
  // Purpose: TECHNOLOGY AFFINITY dimension. Distinct from tech interest (Q2).
  //          This measures comfort and usage pattern, not just liking.
  {
    id: 7,
    question: "How do you relate to technology and computers?",
    multiSelect: false,
    options: [
      {
        id: "tech_build",
        label: "I want to build software, AI or digital products",
        icon: "⌨️",
        tags: { tech: 5, analytical: 2 },
      },
      {
        id: "tech_use",
        label: "I use tech creatively (editing, design, marketing)",
        icon: "📱",
        tags: { tech: 2, creative: 3 },
      },
      {
        id: "tech_neutral",
        label: "I use tech as a tool but it's not my focus",
        icon: "🖥️",
        tags: { tech: 0, business: 1, people_facing: 1 },
      },
      {
        id: "tech_avoid",
        label: "I prefer working away from screens entirely",
        icon: "🌲",
        tags: { tech: -4, field: 2, people_facing: 2, hands_on: 2 },
      },
    ],
  },

  // ── Q8: RISK vs STABILITY ──────────────────────────────────────────────────
  // Purpose: RISK TOLERANCE dimension. Affects entrepreneurial vs structured path.
  {
    id: 8,
    question: "What is your stance on career risk versus stability?",
    multiSelect: false,
    options: [
      {
        id: "risk_stable",
        label: "I want a highly secure, stable job (Govt / MNC)",
        icon: "🏛️",
        tags: { risk_averse: 5, office: 2 },
      },
      {
        id: "risk_balanced",
        label: "A stable job now, with growth and ambition over time",
        icon: "⚖️",
        tags: { risk_averse: 2, risk_tolerant: 2, business: 1 },
      },
      {
        id: "risk_high",
        label: "High risk / high reward — startups, trading, content",
        icon: "🚀",
        tags: { risk_tolerant: 5, business: 2, creative: 1 },
      },
    ],
  },

  // ── Q9: INDEPENDENCE vs COLLABORATION ─────────────────────────────────────
  // Purpose: INDEPENDENCE dimension. Separates entrepreneurial solo workers
  //          from team/organisational players.
  {
    id: 9,
    question: "How do you prefer to work day-to-day?",
    multiSelect: false,
    options: [
      {
        id: "ind_solo",
        label: "Mostly independently — I own my own output",
        icon: "🧑‍💻",
        tags: { remote: 3, risk_tolerant: 2, tech: 1 },
      },
      {
        id: "ind_collab",
        label: "Collaboratively — I thrive in teams",
        icon: "👥",
        tags: { people_facing: 3, office: 2, business: 1 },
      },
      {
        id: "ind_both",
        label: "A mix — independent work with team touchpoints",
        icon: "🔄",
        tags: { remote: 1, people_facing: 1, office: 1 },
      },
    ],
  },

  // ── Q10: PHYSICAL ENVIRONMENT ─────────────────────────────────────────────
  // Purpose: FIELD / PHYSICAL ACTIVITY affinity. Differentiates desk-based
  //          from outdoor / clinical / field careers.
  {
    id: 10,
    question: "Are you comfortable with physically demanding or fieldwork-heavy careers?",
    subtext: "e.g. Civil engineering, Defence, Agriculture, Clinical work",
    multiSelect: false,
    options: [
      {
        id: "phys_yes",
        label: "Yes — I enjoy physical activity and outdoor work",
        icon: "🏔️",
        tags: { field: 4, hands_on: 3 },
      },
      {
        id: "phys_clinical",
        label: "Moderate — I'm fine with clinical or lab environments",
        icon: "🏥",
        tags: { lab: 4, biology: 1 },
      },
      {
        id: "phys_no",
        label: "No — I strongly prefer desk, studio or indoor work",
        icon: "🪑",
        tags: { office: 3, studio: 2, field: -3, hands_on: -1 },
      },
    ],
  },

  // ── Q11: CAREER MOTIVATION ─────────────────────────────────────────────────
  // Purpose: GOALS dimension. What outcome matters most.
  //          Measured separately from interest so liking ≠ goal alignment.
  {
    id: 11,
    question: "What matters most to you in a career outcome?",
    subtext: "Select up to 3 that genuinely reflect your priorities.",
    multiSelect: true,
    options: [
      {
        id: "mot_income",
        label: "High and scalable income",
        icon: "💰",
        tags: { business: 3, risk_tolerant: 2 },
      },
      {
        id: "mot_impact",
        label: "Making a real difference to society",
        icon: "❤️",
        tags: { people_facing: 3, biology: 1, humanities: 1 },
      },
      {
        id: "mot_create",
        label: "Building something original & creative",
        icon: "🎭",
        tags: { creative: 3, studio: 1 },
      },
      {
        id: "mot_status",
        label: "Prestige, professional respect & authority",
        icon: "🏆",
        tags: { long_duration: 2, office: 2, analytical: 1 },
      },
      {
        id: "mot_balance",
        label: "Work-life balance and personal freedom",
        icon: "🌴",
        tags: { remote: 3, short_duration: 1 },
      },
      {
        id: "mot_learn",
        label: "Continuous learning and intellectual challenge",
        icon: "📖",
        tags: { analytical: 3, long_duration: 1, tech: 1 },
      },
      {
        id: "mot_solve",
        label: "Solving complex, high-stakes problems",
        icon: "⚡",
        tags: { analytical: 2, risk_tolerant: 2, tech: 1 },
      },
    ],
  },

  // ── Q12: FINANCIAL PRIORITY ────────────────────────────────────────────────
  // Purpose: INCOME PRIORITY dimension. Separates passion-driven from
  //          income-optimising students. Affects risk/stability weighting.
  {
    id: 12,
    question: "How important is earning potential when choosing a career?",
    subtext: "Be honest — there is no wrong answer.",
    multiSelect: false,
    options: [
      {
        id: "fin_primary",
        label: "It's my primary goal — I want financial independence",
        icon: "📈",
        tags: { business: 3, risk_tolerant: 3, remote: 1 },
      },
      {
        id: "fin_important",
        label: "Important but not at the cost of passion or wellbeing",
        icon: "💼",
        tags: { business: 1, risk_averse: 1, office: 1 },
      },
      {
        id: "fin_secondary",
        label: "Secondary — I'd rather love what I do than earn the most",
        icon: "🎨",
        tags: { creative: 2, people_facing: 2, humanities: 1 },
      },
    ],
  },
];
