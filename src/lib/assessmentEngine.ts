// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT ENGINE v3
//
// Core changes from v2:
//   1. Per-career scoring: each career is scored against its OWN required
//      dimensions, not against a generic tag group. This prevents identical
//      scores for different courses that happen to share similar tag ratios.
//   2. Career type inference: Academic / Employment / Entrepreneurial / Skill
//   3. Career-type-specific factor weights (entrepreneurial careers weight
//      risk/goals heavily; academic careers weight education heavily)
//   4. Mathematical traceability: overall = exact weighted sum of displayed factors
//   5. Better confidence: based on factor consistency + spread + overall score
//   6. Career-specific "why it fits" language using the career's own dimensions
//   7. Career-type-specific next steps, challenges, and salary presentation
//   8. Category-level deduplication (prevents 3 near-identical engineering results)
// ─────────────────────────────────────────────────────────────────────────────

import { AssessmentQuestion } from "@/data/assessmentQuestions";
import { CourseTagProfile } from "@/data/courseTags";

// ── TYPES ─────────────────────────────────────────────────────────────────────

export type CareerType = "academic" | "employment" | "entrepreneurial" | "skill";

export interface UserDimensionProfile {
  vector: Record<string, number>;
  streamId: string;
  profileChips: string[];
}

export interface FactorScores {
  interest: number;
  aptitude: number;
  workStyle: number;
  environment: number;
  education: number;
  riskGoals: number;
}

export interface FactorWeights {
  interest: number;
  aptitude: number;
  workStyle: number;
  environment: number;
  education: number;
  riskGoals: number;
}

export type ConfidenceLevel = "High" | "Moderate" | "Low";

export type ResultLabel =
  | "Best Match"
  | "Strong Alternative"
  | "Alternative Career Path"
  | "Safe / Stable Option"
  | "High-Growth Option"
  | "Entrepreneurial Option";

export interface EnrichedResult {
  title: string;
  category: string;
  careerType: CareerType;
  careerTypeLabel: string;
  overallScore: number;
  matchPercentage: string;
  confidence: ConfidenceLevel;
  resultLabel: ResultLabel;
  factorScores: FactorScores;
  factorWeights: FactorWeights;       // shown so user can verify: Σ(score×weight) = overall
  whyItFits: string[];
  challenges: string[];
  careerPaths: string[];
  recommendedEducation?: string[];    // for skill/entrepreneurial paths
  matchedDimensions: string[];
  exams: string[];
  duration?: string;
  salaryEntry?: string;
  salaryMid?: string;
  salaryExperienced?: string;
  incomeModel?: string;               // for non-conventional income paths
  salaryNote?: string;
  careerOutcomes?: string[];
  coreSubjects?: string[];
  studyEnvironment?: string;
  skillsToDevelop: string[];
  nextSteps: string[];
  desc: string;
}

// ── CAREER TYPE FACTOR WEIGHTS ────────────────────────────────────────────────
// Weights differ per career type, summing to 1.0.
// This ensures an entrepreneurial path is judged differently from an academic one.

const TYPE_WEIGHTS: Record<CareerType, FactorWeights> = {
  academic: {
    interest:    0.26,
    aptitude:    0.26,
    workStyle:   0.14,
    environment: 0.10,
    education:   0.16, // education duration matters a lot
    riskGoals:   0.08,
  },
  employment: {
    interest:    0.25,
    aptitude:    0.22,
    workStyle:   0.22,
    environment: 0.14,
    education:   0.08,
    riskGoals:   0.09,
  },
  entrepreneurial: {
    interest:    0.18,
    aptitude:    0.15,
    workStyle:   0.22,
    environment: 0.05,
    education:   0.04, // formal education barely matters
    riskGoals:   0.36, // risk tolerance & goals dominate
  },
  skill: {
    interest:    0.26,
    aptitude:    0.22,
    workStyle:   0.25,
    environment: 0.10,
    education:   0.06,
    riskGoals:   0.11,
  },
};

// ── DIMENSION → FACTOR MAPPING ────────────────────────────────────────────────
// Each tag in courseTags belongs to one or more factor groups.
// When scoring a factor, we look at ONLY the dimensions this career
// has opinions on within that factor group.

const FACTOR_TAGS: Record<keyof FactorScores, string[]> = {
  interest:    ["math", "biology", "tech", "creative", "humanities", "business", "people_facing", "analytical"],
  aptitude:    ["analytical", "hands_on", "math", "tech", "creative", "people_facing", "business"],
  workStyle:   ["hands_on", "creative", "people_facing", "analytical", "business", "remote"],
  environment: ["office", "lab", "field", "studio", "remote"],
  education:   ["short_duration", "long_duration"],
  riskGoals:   ["risk_tolerant", "risk_averse", "business", "remote"],
};

const MIN_THRESHOLD = 48;
const SCALE_FLOOR   = 35;
const SCALE_CEILING = 95;

// ── UTILITY ───────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function rawToPercent(raw: number): number {
  // raw ∈ [0, 1]. Maps 0→35, 0.5→62, 1.0→95 with mild power curve.
  return Math.round(clamp(SCALE_FLOOR + (SCALE_CEILING - SCALE_FLOOR) * Math.pow(raw, 0.6), SCALE_FLOOR, SCALE_CEILING));
}

// ── CAREER TYPE INFERENCE ─────────────────────────────────────────────────────

function inferCareerType(course: CourseTagProfile): CareerType {
  const t = course.title.toLowerCase();
  const c = course.category.toLowerCase();
  const d = (course.duration || "").toLowerCase();

  // Explicit entrepreneurial / trading indicators
  if (/trading|forex|affiliate|dropshipping|saas|startup|e[\s-]commerce|freelanc|day trad/i.test(t)) {
    return "entrepreneurial";
  }

  // Very short programmes → skill path
  if (/\b(6|12)\s*months?\b/i.test(d) || /certif|diploma|bootcamp/i.test(t)) {
    return "skill";
  }

  // Recognised academic degree prefixes
  if (/\b(b\.tech|b\.e\.|be\b|mbbs|b\.sc|bsc|b\.com|bcom|b\.a\.|ba\b|bba|bca|b\.des|b\.arch|b\.plan|llb|bds|bams|bhms|b\.pharma|b\.ed|bfa)\b/i.test(t)) {
    return "academic";
  }

  // Employment-oriented titles
  if (/\b(manager|analyst|consultant|specialist|officer|director|coordinator|developer)\b/i.test(t)) {
    return "employment";
  }

  // Category-level fallbacks
  if (/engineering|medical|science|law|architecture/i.test(c)) return "academic";
  if (/design|media|communication/i.test(c)) return "skill";
  if (/business|management/i.test(c)) return "employment";

  return "academic";
}

function getCareerTypeLabel(type: CareerType): string {
  return {
    academic:       "Academic Degree Path",
    employment:     "Employment Career",
    entrepreneurial:"Entrepreneurial / Independent Path",
    skill:          "Professional Skill Path",
  }[type];
}

// ── CAREER-SPECIFIC FACTOR SCORING ───────────────────────────────────────────
//
// KEY FIX: Instead of cosine similarity on a generic tag group (which produces
// the same score for all courses with similar tag RATIOS), we now measure how
// well the user matches what THIS SPECIFIC CAREER requires on each factor's
// relevant dimensions.
//
// Algorithm:
//   For each dimension this career cares about within the factor group:
//     matchRatio = userScore / careerRequirement   (capped at 1.0)
//   factorScore = weighted average of matchRatios, weighted by careerRequirement
//
// Result: two careers with different required dimensions will produce
// genuinely different scores for the same user.

function scoreFactorVsCareer(
  userVec: Record<string, number>,
  courseVec: Record<string, number>,
  factorTags: string[]
): number {
  let totalWeight = 0;
  let matchScore  = 0;

  for (const tag of factorTags) {
    const need = courseVec[tag] ?? 0;
    if (need === 0) continue; // this career doesn't care about this dimension here

    const has = userVec[tag] ?? 0;

    if (need > 0) {
      // Career needs this dimension → measure user supply vs demand
      const supply = Math.max(0, has);
      const ratio  = Math.min(supply / need, 1.2); // slight bonus for exceeding
      matchScore  += Math.min(ratio, 1.0) * need;
      totalWeight += need;
    } else {
      // Negative tag = dealbreaker (e.g., tech: -4 means avoid tech-heavy users)
      const absNeed    = Math.abs(need);
      const presence   = Math.max(0, has);
      const absenceRatio = Math.max(0, 1 - presence / absNeed);
      matchScore  += absenceRatio * absNeed;
      totalWeight += absNeed;
    }
  }

  if (totalWeight === 0) return 50; // career has no opinion on this factor

  const raw = matchScore / totalWeight; // 0–1
  return rawToPercent(raw);
}

// ── COMPUTE COURSE SCORE ──────────────────────────────────────────────────────

function computeCourseScore(
  userVec: Record<string, number>,
  course: CourseTagProfile,
  careerType: CareerType
): { overall: number; factors: FactorScores; weights: FactorWeights } {
  const weights = TYPE_WEIGHTS[careerType];

  const factors: FactorScores = {
    interest:    scoreFactorVsCareer(userVec, course.tags, FACTOR_TAGS.interest),
    aptitude:    scoreFactorVsCareer(userVec, course.tags, FACTOR_TAGS.aptitude),
    workStyle:   scoreFactorVsCareer(userVec, course.tags, FACTOR_TAGS.workStyle),
    environment: scoreFactorVsCareer(userVec, course.tags, FACTOR_TAGS.environment),
    education:   scoreFactorVsCareer(userVec, course.tags, FACTOR_TAGS.education),
    riskGoals:   scoreFactorVsCareer(userVec, course.tags, FACTOR_TAGS.riskGoals),
  };

  // Overall = exact weighted sum (mathematically traceable from displayed factors)
  const overall =
    factors.interest    * weights.interest    +
    factors.aptitude    * weights.aptitude    +
    factors.workStyle   * weights.workStyle   +
    factors.environment * weights.environment +
    factors.education   * weights.education   +
    factors.riskGoals   * weights.riskGoals;

  return {
    overall: Math.round(clamp(overall, SCALE_FLOOR, SCALE_CEILING)),
    factors,
    weights,
  };
}

// ── USER PROFILE BUILDER ──────────────────────────────────────────────────────

export function buildUserProfile(
  answers: string[][],
  questions: AssessmentQuestion[]
): UserDimensionProfile {
  const vector: Record<string, number> = {};

  answers.forEach((selectedIds, index) => {
    const question = questions[index];
    if (!question) return;
    selectedIds.forEach((id) => {
      const option = question.options.find((o) => o.id === id);
      if (!option) return;
      for (const [tag, weight] of Object.entries(option.tags)) {
        vector[tag] = (vector[tag] || 0) + weight;
      }
    });
  });

  const streamId = answers[0]?.[0] ?? "any";

  const domainMap = [
    { label: "Analytical",      dims: ["analytical", "math"] },
    { label: "Creative",        dims: ["creative", "studio"] },
    { label: "Technology",      dims: ["tech"] },
    { label: "People-Oriented", dims: ["people_facing"] },
    { label: "Business-Minded", dims: ["business"] },
    { label: "Science-Driven",  dims: ["biology", "lab"] },
    { label: "Humanities",      dims: ["humanities"] },
    { label: "Hands-On",        dims: ["hands_on", "field"] },
    { label: "Independent",     dims: ["remote", "risk_tolerant"] },
    { label: "Stability-Focused", dims: ["risk_averse", "office"] },
  ];

  const profileChips = domainMap
    .map(({ label, dims }) => ({ label, score: dims.reduce((s, d) => s + (vector[d] || 0), 0) }))
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(d => d.label);

  return { vector, streamId, profileChips };
}

// ── STREAM ELIGIBILITY ────────────────────────────────────────────────────────

function getEligibleStreams(streamId: string): string[] {
  if (streamId === "pcmb") return ["pcm", "pcb", "pcmb", "any"];
  return [streamId, "any"];
}

// ── CAREER-SPECIFIC "WHY IT FITS" ─────────────────────────────────────────────
//
// Generates language based on which of THIS CAREER'S required dimensions the
// user aligns with — so B.Des UX says something about creative/design, while
// B.Tech CS says something about math/tech, even if the user is the same.

function getDimensionLabel(dim: string, category: string, careerType: CareerType): string {
  const cat = category.toLowerCase();

  const contextual: Partial<Record<string, (c: string, t: CareerType) => string>> = {
    math:         (c) => c.includes("financ") ? "quantitative and financial reasoning"
                        : "mathematical and logical thinking",
    biology:      () => "life science and biological interest",
    tech:         (c, t) => t === "entrepreneurial" ? "digital tools and technology fluency"
                           : c.includes("design") ? "technology-enhanced creative capability"
                           : "software, systems and technology interest",
    creative:     (c) => c.includes("engineer") ? "innovative and design thinking"
                        : "creative and visual design orientation",
    humanities:   () => "communication, critical analysis and language",
    business:     (c) => c.includes("financ") ? "financial markets and commercial thinking"
                        : "business strategy, sales and commercial acumen",
    people_facing:(c) => c.includes("medic") || c.includes("health") ? "empathy and patient-care orientation"
                        : "interpersonal communication and relationship building",
    analytical:   (c) => c.includes("financ") ? "analytical reasoning applied to data and markets"
                        : "structured analytical and problem-solving approach",
    hands_on:     () => "hands-on, practical working approach",
    risk_tolerant:() => "entrepreneurial mindset and comfort with uncertainty",
    risk_averse:  () => "preference for structured, stable and predictable environments",
    field:        () => "willingness to work in outdoor and field environments",
    lab:          () => "comfort with laboratory, clinical or research settings",
    studio:       () => "creative studio and design-space preference",
    office:       () => "structured office and corporate environment preference",
    remote:       () => "independent, self-directed and remote working preference",
    long_duration:() => "commitment to deep, long-form professional training",
    short_duration:() => "preference for efficient, direct career entry",
  };

  const fn = contextual[dim];
  return fn ? fn(cat, careerType) : "";
}

function buildWhyItFits(
  userVec: Record<string, number>,
  course: CourseTagProfile,
  factors: FactorScores,
  careerType: CareerType
): string[] {
  const bullets: string[] = [];

  // Find dimensions where user AND career both score highly — sorted by match strength
  const aligned = Object.entries(course.tags)
    .filter(([tag, need]) => need >= 2 && (userVec[tag] || 0) >= 2)
    .map(([tag, need]) => ({
      tag,
      need,
      user: userVec[tag] || 0,
      // match strength = how well user satisfies this specific requirement
      strength: Math.min((userVec[tag] || 0) / need, 1.5),
    }))
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 5);

  for (const { tag, strength, need } of aligned) {
    const label = getDimensionLabel(tag, course.category, careerType);
    if (!label) continue;
    const qualifier = strength >= 1.2 ? "Strong" : strength >= 0.8 ? "Good" : "Moderate";
    bullets.push(`${qualifier} ${label}`);
  }

  // Add a top-factor sentence if a factor score is exceptional
  const topFactor = (Object.entries(factors) as [string, number][])
    .sort((a, b) => b[1] - a[1])[0];
  if (topFactor[1] >= 82 && bullets.length < 5) {
    const factorLabels: Record<string, string> = {
      interest:    "subject interest",
      aptitude:    "natural aptitudes",
      workStyle:   "preferred work style",
      environment: "environment preference",
      education:   "education timeline",
      riskGoals:   "risk and goals profile",
    };
    bullets.unshift(`Your ${factorLabels[topFactor[0]] || topFactor[0]} strongly aligns with this career (${topFactor[1]}%)`);
  }

  return bullets.slice(0, 5).filter(Boolean);
}

// ── CAREER-TYPE CHALLENGES ────────────────────────────────────────────────────

const DIM_CHALLENGES: Record<string, string[]> = {
  tech:          ["Keeping up with rapidly evolving tools and frameworks", "Entry-level roles are competitive"],
  creative:      ["Requires a strong, continuously updated portfolio", "Freelance income can be variable early on"],
  biology:       ["Intense academic and clinical pressure over many years", "Highly competitive entrance (NEET or equivalent)"],
  math:          ["Strong quantitative foundation required throughout the programme"],
  business:      ["Career progression depends on networking and visibility", "Performance expectations go beyond grades"],
  humanities:    ["Career paths are less linear — specialisation matters early", "Starting compensation varies widely by role"],
  field:         ["Significant physical demands and outdoor exposure", "May require relocation to project sites"],
  lab:           ["Research roles often demand postgraduate qualifications", "Progression timelines in research tracks are long"],
  risk_tolerant: ["Income is variable and performance-dependent", "Requires strong self-discipline and emotional resilience"],
  long_duration: ["Significant time and financial investment before career entry"],
  people_facing: ["Emotionally demanding — requires consistent people energy", "Career growth often tied to soft skill development"],
  analytical:    ["Continuous upskilling needed as tools and methodologies evolve"],
  remote:        ["Requires self-motivation and structured self-management", "Isolation can affect motivation without deliberate community building"],
};

const TYPE_CHALLENGES: Record<CareerType, string[]> = {
  academic:       [],
  employment:     ["Office politics and hierarchy can slow early progression"],
  entrepreneurial:[
    "Income is variable and may take 12–18 months to stabilise",
    "No guaranteed salary, benefits or job security",
    "Requires high self-discipline and independent learning",
  ],
  skill: ["May require building a public portfolio before landing paid work"],
};

function buildChallenges(course: CourseTagProfile, careerType: CareerType): string[] {
  const seen = new Set<string>();
  const challenges: string[] = [];

  // Start with career-type-level challenges
  for (const c of TYPE_CHALLENGES[careerType]) {
    if (!seen.has(c)) { seen.add(c); challenges.push(c); }
  }

  // Add dimension-specific challenges from dominant tags
  const dominantTags = Object.entries(course.tags)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag);

  for (const tag of dominantTags) {
    for (const c of (DIM_CHALLENGES[tag] || [])) {
      if (!seen.has(c) && challenges.length < 4) { seen.add(c); challenges.push(c); }
    }
  }

  // Special note for trading paths
  if (/trading|forex|crypto/i.test(course.title)) {
    const note = "Financial losses are possible — especially without risk management discipline";
    if (!seen.has(note)) challenges.push(note);
  }

  return challenges.slice(0, 4);
}

// ── SKILLS TO DEVELOP ─────────────────────────────────────────────────────────

const DIM_SKILLS: Record<string, string[]> = {
  tech:          ["Programming fundamentals", "Version control (Git)", "Problem-solving with data structures"],
  analytical:    ["Data analysis & interpretation", "Critical reasoning", "Research methodology"],
  creative:      ["Visual design principles", "Portfolio development", "Design thinking process"],
  business:      ["Financial literacy", "Communication & negotiation", "Project management basics"],
  people_facing: ["Active listening", "Conflict resolution", "Public speaking"],
  biology:       ["Scientific report writing", "Lab safety & protocols", "NEET/clinical prep"],
  humanities:    ["Legal research & case analysis", "Persuasive writing & argumentation", "Critical theory"],
  hands_on:      ["Technical drawing & CAD basics", "Safety compliance", "Material knowledge"],
  field:         ["GIS & mapping tools", "Field data collection", "Environmental assessment methods"],
  risk_tolerant: ["Personal finance & risk management", "Decision-making under uncertainty", "Resilience building"],
  remote:        ["Time management & self-discipline", "Digital communication tools", "Async collaboration"],
  math:          ["Quantitative reasoning", "Statistics & probability", "Spreadsheet proficiency"],
};

const TYPE_SKILLS: Record<CareerType, string[]> = {
  academic:       ["Study planning & note-taking", "Entrance exam preparation"],
  employment:     ["Professional networking", "Resume & interview skills"],
  entrepreneurial:["Identifying market opportunities", "Building a personal brand", "Basic digital marketing"],
  skill:          ["Building a portfolio from day one", "Learning in public", "Freelancing fundamentals"],
};

function buildSkillsToDevelop(
  userVec: Record<string, number>,
  course: CourseTagProfile,
  careerType: CareerType
): string[] {
  const seen = new Set<string>();
  const skills: string[] = [];

  // Gap tags: course needs these but user doesn't have them strongly
  const gapTags = Object.entries(course.tags)
    .filter(([tag, need]) => need >= 2 && (userVec[tag] || 0) < need)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag);

  for (const tag of gapTags) {
    for (const s of (DIM_SKILLS[tag] || [])) {
      if (!seen.has(s) && skills.length < 4) { seen.add(s); skills.push(s); }
    }
  }

  // Type-specific skills
  for (const s of TYPE_SKILLS[careerType]) {
    if (!seen.has(s) && skills.length < 6) { seen.add(s); skills.push(s); }
  }

  // Fallback to course subjects
  if (skills.length < 3 && course.coreSubjects) {
    for (const s of course.coreSubjects) {
      if (!seen.has(s) && skills.length < 6) { seen.add(s); skills.push(s); }
    }
  }

  return skills;
}

// ── CAREER-TYPE NEXT STEPS ────────────────────────────────────────────────────

function buildNextSteps(
  course: CourseTagProfile,
  careerType: CareerType
): string[] {
  const title   = course.title;
  const exams   = (course.exams || []).slice(0, 2).join(" / ") || "relevant entrance exams";
  const career0 = course.careerOutcomes?.[0] || "a professional in this field";

  if (careerType === "academic") {
    return [
      `Research what a working day looks like as ${career0}`,
      `Check eligibility: 12th marks, stream and minimum percentage required`,
      `Identify the entrance exam(s): ${exams} — download the official syllabus`,
      `Compare top-ranked colleges offering ${title} using NIRF and peer reviews`,
      `Estimate total cost: tuition, hostel, books — identify scholarship options`,
      `Speak to current students or recent graduates of this programme`,
      `Begin exam preparation with a structured 6–12 month study plan`,
    ];
  }

  if (careerType === "employment") {
    return [
      `Research what day-to-day work looks like as ${career0}`,
      `Identify the core skills required in entry-level job postings for this role`,
      `Find relevant certification or training programmes to build those skills`,
      `Build 1–2 portfolio projects or case studies to demonstrate competence`,
      `Apply for internships or junior roles — experience > certificates at entry level`,
      `Build your professional network: LinkedIn, industry meetups, alumni connections`,
      `Set a 12-month milestone: what does success look like one year into this career?`,
    ];
  }

  if (careerType === "entrepreneurial") {
    const isTrade = /trading|forex|crypto/i.test(title);
    if (isTrade) {
      return [
        `Learn how financial markets actually work before touching real money`,
        `Practice on a paper/simulation trading account for at least 3 months`,
        `Study risk management — position sizing and capital protection come first`,
        `Learn to read charts, macroeconomics and market structure systematically`,
        `Be deeply sceptical of 'trading course' sellers — most profit from you, not with you`,
        `Keep a trading journal: log every decision, outcome and emotional state`,
        `Start with minimal real capital only after consistent simulated profitability`,
      ];
    }
    return [
      `Research how top performers in ${title} actually make money — ignore hype`,
      `Start with zero-cost experiments before committing time or money`,
      `Learn the 3–4 core tools and platforms specific to this path`,
      `Study one successful practitioner's journey in depth — find patterns`,
      `Set realistic expectations: most beginners take 12–18 months to earn consistently`,
      `Build in public — an audience compounds over time and opens unexpected doors`,
      `Do not quit stable income until this generates reliable, recurring revenue`,
    ];
  }

  // skill path
  return [
    `Identify the 3 specific sub-skills that matter most for ${title}`,
    `Complete one focused beginner course or certification in the next 30 days`,
    `Build a small portfolio project to demonstrate your capability`,
    `Share your work publicly — even imperfect work signals initiative`,
    `Find freelance or internship opportunities to get real-world feedback`,
    `Join a community of practitioners: Discord, Reddit, LinkedIn groups`,
    `Set a 6-month goal: what can you create, ship or earn by then?`,
  ];
}

// ── RECOMMENDED EDUCATION (for skill/entrepreneurial paths) ───────────────────

const EDU_OVERRIDES: [RegExp, string[]][] = [
  [/affiliate marketing/i,  ["BBA (Marketing / Digital)", "B.Com", "Any degree + digital marketing certification"]],
  [/forex|day trading/i,    ["B.Com Finance", "BBA Finance", "Economics degree — note: formal education is not a prerequisite for trading"]],
  [/dropshipping/i,         ["BBA E-commerce", "B.Com", "Any degree or none — skills outweigh degree here"]],
  [/saas|software.*business/i, ["B.Tech CS / IT", "BBA", "MBA (later stage)"]],
  [/digital marketing/i,    ["BBA", "B.Com", "BA Mass Communication", "Any degree + Google / Meta certifications"]],
  [/ux|product design/i,    ["B.Des (UX / Interaction Design)", "NID / NIFT", "BFA + UX bootcamp"]],
  [/content creat/i,        ["BA Mass Communication / English", "Any degree", "Build portfolio first — degree is secondary"]],
  [/graphic design/i,       ["B.Des (Visual Communication)", "BFA", "NID / NIFT entrance"]],
  [/data analyst/i,         ["B.Tech CS", "B.Sc Statistics", "BCA + data science certification"]],
  [/cyber security/i,       ["B.Tech CS / IT", "BCA", "Relevant certifications: CEH, CompTIA Security+"]],
];

function getRecommendedEducation(title: string, careerType: CareerType): string[] | undefined {
  if (careerType === "academic") return undefined;
  for (const [pattern, edu] of EDU_OVERRIDES) {
    if (pattern.test(title)) return edu;
  }
  return undefined;
}

// ── SALARY / INCOME MODEL ─────────────────────────────────────────────────────

function buildSalaryFields(course: CourseTagProfile, careerType: CareerType): {
  salaryEntry?: string;
  salaryMid?: string;
  salaryExperienced?: string;
  incomeModel?: string;
  salaryNote?: string;
} {
  const isTrade   = /trading|forex|crypto/i.test(course.title);
  const isEntrepreneurial = careerType === "entrepreneurial";

  if (isTrade) {
    return {
      incomeModel: "Variable / trading returns",
      salaryNote:  "Returns are highly variable. Losses are possible, especially early on. Not a conventional salary career.",
    };
  }

  if (isEntrepreneurial) {
    return {
      incomeModel: "Variable / performance-based",
      salaryNote:  "Income depends on effort, strategy and market conditions. No guaranteed salary.",
    };
  }

  // Conventional salary parsing
  if (!course.salaryRange) return {};
  const raw   = course.salaryRange.replace(/\/year|per annum/gi, "").trim();
  const match = raw.match(/^(₹[\d.]+[LCK]?)\s*[-–]\s*(₹[\d.]+[LCK]?\+?)$/i);
  if (match) {
    return {
      salaryEntry:      match[1],
      salaryMid:        match[2],
      salaryExperienced:`${match[2]}+`,
    };
  }
  return { salaryEntry: raw };
}

// ── CONFIDENCE ────────────────────────────────────────────────────────────────
//
// Confidence measures how CONSISTENTLY the user's answers point to this career.
// High = most factors agree strongly.
// Moderate = most factors agree but some are uncertain or conflicting.
// Low = answers pull in different directions.

// ── CONFIDENCE ────────────────────────────────────────────────────────────────
//
// Confidence measures how CONSISTENTLY the user's answers point to this career.
// High = Strong evidence, consistent factors, minimal contradictory signals.
// Moderate = Good evidence, but some uncertainty or conflicting signals.
// Low = Weak, conflicting or insufficient evidence.

function computeConfidence(factors: FactorScores, overall: number): ConfidenceLevel {
  const vals = Object.values(factors);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  
  // Count how many factors are exceptionally high (strong evidence)
  const strongSignals = vals.filter(v => v >= 80).length;
  // Count how many factors are very low (contradictory signals)
  const contradictorySignals = vals.filter(v => v < 50).length;
  // Measure consistency (variance)
  const variance = vals.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / vals.length;
  const stdDev = Math.sqrt(variance);

  // High Confidence: High overall score, highly consistent (low std dev), 
  // multiple strong signals, NO contradictory signals.
  if (overall >= 75 && stdDev < 15 && strongSignals >= 3 && contradictorySignals === 0) {
    return "High";
  }
  
  // Low Confidence: Overall score is low, OR high contradiction, OR highly inconsistent
  if (overall < 60 || contradictorySignals >= 2 || stdDev > 25) {
    return "Low";
  }
  
  // Default to Moderate
  return "Moderate";
}

// ── RESULT LABEL ──────────────────────────────────────────────────────────────

function assignLabel(
  index: number,
  course: CourseTagProfile,
  careerType: CareerType,
  userVec: Record<string, number>
): ResultLabel {
  if (index === 0) return "Best Match";

  const tags = course.tags;
  const isStable         = (tags.risk_averse || 0) >= 3 || (tags.office || 0) >= 3;
  const isEntrepreneurial= careerType === "entrepreneurial";
  const isHighGrowth     = (tags.tech || 0) >= 4 || (tags.business || 0) >= 3;

  if (isStable && (userVec.risk_averse || 0) >= 3)       return "Safe / Stable Option";
  if (isEntrepreneurial && (userVec.risk_tolerant || 0) >= 3) return "Entrepreneurial Option";
  if (isHighGrowth && index === 1)                        return "High-Growth Option";
  if (index >= 2)                                         return "Alternative Career Path";
  return "Strong Alternative";
}

// ── CATEGORY DEDUPLICATION ────────────────────────────────────────────────────
// Prevents showing 3 nearly-identical engineering results.
// Within each category, only the top scorer appears UNLESS a second course
// scores more than 10 points higher than the first seen.

function deduplicateByCategory(
  scored: { course: CourseTagProfile; careerType: CareerType; overall: number; factors: FactorScores; weights: FactorWeights }[]
): typeof scored {
  const categoryBest = new Map<string, number>(); // category → best score seen
  const result: typeof scored = [];

  for (const item of scored) {
    const key  = item.course.category;
    const best = categoryBest.get(key);

    if (best === undefined) {
      categoryBest.set(key, item.overall);
      result.push(item);
    } else if (item.overall > best + 10) {
      // Significantly better within same category — include it
      result.push(item);
    }
    // Otherwise skip as near-duplicate
  }

  return result;
}

// ── AUTO-GENERATED DESCRIPTION ────────────────────────────────────────────────

function generateDesc(
  course: CourseTagProfile,
  careerType: CareerType,
  whyItFits: string[]
): string {
  const type = getCareerTypeLabel(careerType);
  const first = whyItFits[0] || "your assessment profile";
  const outcome = course.careerOutcomes?.slice(0, 2).join(" or ");

  if (careerType === "entrepreneurial") {
    return `${course.title} is an independent income path suited to your profile — ${first.toLowerCase()}. Success in this path depends on self-discipline, continuous learning and market awareness.`;
  }
  return `${course.title} (${type}) aligns with your assessment — ${first.toLowerCase()}. ${outcome ? `Typical career outcomes include: ${outcome}.` : ""}`.trim();
}

// ── MAIN RANKING FUNCTION ─────────────────────────────────────────────────────

export function rankAndSelectResults(
  courseData: CourseTagProfile[],
  userProfile: UserDimensionProfile
): EnrichedResult[] {
  const { vector, streamId } = userProfile;
  const eligibleStreams = getEligibleStreams(streamId);

  let eligible = courseData.filter(c =>
    c.streams.some(s => eligibleStreams.includes(s))
  );
  if (eligible.length === 0) eligible = courseData;

  // Score every eligible course using its inferred career type
  const scored = eligible
    .map(course => {
      const careerType = inferCareerType(course);
      const { overall, factors, weights } = computeCourseScore(vector, course, careerType);
      return { course, careerType, overall, factors, weights };
    })
    .filter(r => r.overall >= MIN_THRESHOLD)
    .sort((a, b) => b.overall - a.overall);

  if (scored.length === 0) return [];

  // Title deduplication first
  const seenTitles = new Set<string>();
  const titleDeduped = scored.filter(({ course }) => {
    if (seenTitles.has(course.title)) return false;
    seenTitles.add(course.title);
    return true;
  });

  // Category deduplication
  const deduped = deduplicateByCategory(titleDeduped);

  // Take up to 6
  const top = deduped.slice(0, 6);

  return top.map(({ course, careerType, overall, factors, weights }, index) => {
    const whyItFits       = buildWhyItFits(vector, course, factors, careerType);
    const challenges      = buildChallenges(course, careerType);
    const skillsToDevelop = buildSkillsToDevelop(vector, course, careerType);
    const confidence      = computeConfidence(factors, overall);
    const label           = assignLabel(index, course, careerType, vector);
    const salaryFields    = buildSalaryFields(course, careerType);
    const recommendedEdu  = getRecommendedEducation(course.title, careerType);
    const desc            = generateDesc(course, careerType, whyItFits);
    const matchedDimensions = Object.entries(course.tags)
      .filter(([tag, w]) => w >= 3 && (vector[tag] || 0) >= 3)
      .map(([tag]) => tag);

    const result: EnrichedResult = {
      title:               course.title,
      category:            course.category,
      careerType,
      careerTypeLabel:     getCareerTypeLabel(careerType),
      overallScore:        overall,
      matchPercentage:     `${overall}%`,
      confidence,
      resultLabel:         label,
      factorScores:        factors,
      factorWeights:       weights,
      whyItFits,
      challenges,
      careerPaths:         course.careerOutcomes || [],
      recommendedEducation:recommendedEdu,
      matchedDimensions,
      exams:               course.exams || [],
      duration:            course.duration,
      ...salaryFields,
      careerOutcomes:      course.careerOutcomes,
      coreSubjects:        course.coreSubjects,
      studyEnvironment:    course.studyEnvironment,
      skillsToDevelop,
      nextSteps:           buildNextSteps(course, careerType),
      desc,
    };

    return result;
  });
}

// ── SCORE LABEL ───────────────────────────────────────────────────────────────

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Exceptional fit";
  if (score >= 80) return "Strong fit";
  if (score >= 70) return "Good fit";
  if (score >= 60) return "Moderate fit";
  if (score >= 50) return "Possible fit";
  return "Weak fit";
}
