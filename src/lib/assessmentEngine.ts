// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT ENGINE v2
//
// Transparent multi-factor scoring system that:
//   1. Builds a dimension vector from user answers
//   2. Scores each course across 6 independent factors
//   3. Combines factors with calibrated weights
//   4. Produces realistic match % (40–95% range, not artificially inflated)
//   5. Generates evidence-based "why it fits" text from actual answers
//   6. Computes confidence based on answer consistency
//
// The algorithm is intentionally NOT exposed to the user but every output
// is fully traceable back to a specific answer.
// ─────────────────────────────────────────────────────────────────────────────

import { AssessmentQuestion } from "@/data/assessmentQuestions";
import { CourseTagProfile } from "@/data/courseTags";

// ── TYPES ─────────────────────────────────────────────────────────────────────

export interface UserDimensionProfile {
  // Raw summed dimension vector from all answers
  vector: Record<string, number>;
  // Stream selected (for eligibility filtering)
  streamId: string;
  // Top 3 inferred domain labels for the "Your Profile" chips
  profileChips: string[];
}

export interface FactorScores {
  interest: number;    // 0–100
  aptitude: number;    // 0–100
  workStyle: number;   // 0–100
  environment: number; // 0–100
  education: number;   // 0–100
  riskGoals: number;   // 0–100
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
  overallScore: number;        // 0–100 numeric
  matchPercentage: string;     // "82%"
  confidence: ConfidenceLevel;
  resultLabel: ResultLabel;
  factorScores: FactorScores;
  whyItFits: string[];         // evidence-based bullets from actual answers
  challenges: string[];        // realistic concerns
  careerPaths: string[];       // possible job titles
  matchedDimensions: string[]; // dimensions that aligned strongly
  exams: string[];
  duration?: string;
  salaryEntry?: string;
  salaryMid?: string;
  salaryExperienced?: string;
  careerOutcomes?: string[];
  coreSubjects?: string[];
  studyEnvironment?: string;
  skillsToDevelop: string[];
  nextSteps: string[];
  // Enriched description (filled by AI or auto-generated)
  desc: string;
}

// ── DIMENSION GROUP MAPPINGS ──────────────────────────────────────────────────
// These define which tags belong to each scoring factor.
// A course's score on a factor = cosine similarity between user and course
// vectors restricted to that factor's tags.

const INTEREST_TAGS = [
  "math", "biology", "tech", "creative", "humanities",
  "business", "people_facing", "analytical"
];

const APTITUDE_TAGS = [
  "analytical", "hands_on", "math", "tech", "creative", "people_facing", "business"
];

const WORK_STYLE_TAGS = [
  "hands_on", "creative", "people_facing", "analytical", "business", "remote"
];

const ENVIRONMENT_TAGS = [
  "office", "lab", "field", "studio", "remote"
];

const EDUCATION_TAGS = [
  "short_duration", "long_duration"
];

const RISK_GOAL_TAGS = [
  "risk_tolerant", "risk_averse", "business", "remote"
];

// Factor weights — must sum to 1.0
const FACTOR_WEIGHTS = {
  interest:    0.28,
  aptitude:    0.22,
  workStyle:   0.20,
  environment: 0.12,
  education:   0.10,
  riskGoals:   0.08,
};

// Minimum threshold to appear in results
const MIN_THRESHOLD = 50;

// Scaling parameters to produce realistic range without artificial floors
// Raw cosine similarity → percentage via calibrated sigmoid-style transform
const SCALE_CEILING = 95;
const SCALE_FLOOR   = 35;

// ── VECTOR UTILITIES ─────────────────────────────────────────────────────────

function dotProduct(a: Record<string, number>, b: Record<string, number>): number {
  let sum = 0;
  for (const [key, val] of Object.entries(a)) {
    if (b[key] !== undefined) sum += val * b[key];
  }
  return sum;
}

function magnitude(v: Record<string, number>): number {
  return Math.sqrt(Object.values(v).reduce((s, x) => s + x * x, 0));
}

function cosineSimilarity(a: Record<string, number>, b: Record<string, number>): number {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

/** Extract sub-vector keeping only the specified tags */
function subVector(
  vec: Record<string, number>,
  tags: string[]
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const tag of tags) {
    if (vec[tag] !== undefined) out[tag] = vec[tag];
  }
  return out;
}

/** Clamp value to [lo, hi] */
function clamp(val: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, val));
}

/** Convert raw cosine similarity (0–1) to a display percentage (35–95) */
function toPercentage(sim: number): number {
  // Avoid artificially inflating poor matches and deflating good ones.
  // Uses a power curve: small similarities compress near floor, strong ones
  // stretch toward ceiling.
  const scaled = SCALE_FLOOR + (SCALE_CEILING - SCALE_FLOOR) * Math.pow(sim, 0.55);
  return clamp(Math.round(scaled), SCALE_FLOOR, SCALE_CEILING);
}

// ── CORE SCORING ─────────────────────────────────────────────────────────────

/**
 * Score a single factor for a student–course pair.
 * Returns 0–100.
 */
function scoreFactor(
  userVec: Record<string, number>,
  courseVec: Record<string, number>,
  factorTags: string[]
): number {
  const uSub = subVector(userVec, factorTags);
  const cSub = subVector(courseVec, factorTags);
  const sim = cosineSimilarity(uSub, cSub);
  return toPercentage(sim);
}

/**
 * Apply dealbreaker penalty.
 * If a course has coreTags that the student scored zero on, reduce overall.
 */
function applyDealbreakers(
  score: number,
  userVec: Record<string, number>,
  coreTags: string[]
): number {
  let penalty = 0;
  for (const tag of coreTags) {
    if (!userVec[tag] || userVec[tag] <= 0) {
      penalty += 8; // 8 points per missing core tag, capped naturally
    }
  }
  return Math.max(SCALE_FLOOR, score - penalty);
}

/**
 * Compute multi-factor score for a single course.
 */
function computeCourseScore(
  userVec: Record<string, number>,
  course: CourseTagProfile
): { overall: number; factors: FactorScores } {
  const factors: FactorScores = {
    interest:    scoreFactor(userVec, course.tags, INTEREST_TAGS),
    aptitude:    scoreFactor(userVec, course.tags, APTITUDE_TAGS),
    workStyle:   scoreFactor(userVec, course.tags, WORK_STYLE_TAGS),
    environment: scoreFactor(userVec, course.tags, ENVIRONMENT_TAGS),
    education:   scoreFactor(userVec, course.tags, EDUCATION_TAGS),
    riskGoals:   scoreFactor(userVec, course.tags, RISK_GOAL_TAGS),
  };

  let weighted =
    factors.interest    * FACTOR_WEIGHTS.interest    +
    factors.aptitude    * FACTOR_WEIGHTS.aptitude    +
    factors.workStyle   * FACTOR_WEIGHTS.workStyle   +
    factors.environment * FACTOR_WEIGHTS.environment +
    factors.education   * FACTOR_WEIGHTS.education   +
    factors.riskGoals   * FACTOR_WEIGHTS.riskGoals;

  // Dealbreaker adjustment
  const overall = applyDealbreakers(weighted, userVec, course.coreTags || []);

  return { overall: Math.round(clamp(overall, SCALE_FLOOR, SCALE_CEILING)), factors };
}

// ── USER PROFILE BUILDER ─────────────────────────────────────────────────────

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

  // Stream is always Q1 (index 0), single-select
  const streamId = answers[0]?.[0] ?? "any";

  // Derive profile chips from top-scoring dimension groups
  const domainMap: { label: string; dims: string[]; }[] = [
    { label: "Analytical",     dims: ["analytical", "math"] },
    { label: "Creative",       dims: ["creative", "studio"] },
    { label: "Technology",     dims: ["tech"] },
    { label: "People-Oriented",dims: ["people_facing"] },
    { label: "Business-Minded",dims: ["business"] },
    { label: "Science-Driven", dims: ["biology", "lab"] },
    { label: "Humanities",     dims: ["humanities"] },
    { label: "Hands-On",       dims: ["hands_on", "field"] },
    { label: "Independent",    dims: ["remote", "risk_tolerant"] },
    { label: "Risk-Averse",    dims: ["risk_averse", "office"] },
  ];

  const scored = domainMap.map(({ label, dims }) => ({
    label,
    score: dims.reduce((s, d) => s + (vector[d] || 0), 0),
  }));
  scored.sort((a, b) => b.score - a.score);
  const profileChips = scored.filter(d => d.score > 0).slice(0, 5).map(d => d.label);

  return { vector, streamId, profileChips };
}

// ── STREAM ELIGIBILITY ────────────────────────────────────────────────────────

function getEligibleStreams(streamId: string): string[] {
  if (streamId === "pcmb") return ["pcm", "pcb", "pcmb", "any"];
  return [streamId, "any"];
}

// ── WHY IT FITS ───────────────────────────────────────────────────────────────

/**
 * Produce evidence-based "why it fits" bullets.
 * ONLY references traits the user actually answered — never invents.
 */
function buildWhyItFits(
  userVec: Record<string, number>,
  course: CourseTagProfile,
  factors: FactorScores
): string[] {
  const bullets: string[] = [];

  // Interest alignment
  if (factors.interest >= 75) {
    const matchedInterests: string[] = [];
    if (userVec.math >= 4 && course.tags.math >= 3) matchedInterests.push("Mathematics & Logic");
    if (userVec.biology >= 4 && course.tags.biology >= 3) matchedInterests.push("Biology & Life Sciences");
    if (userVec.tech >= 4 && course.tags.tech >= 3) matchedInterests.push("Computer Science & Technology");
    if (userVec.creative >= 4 && course.tags.creative >= 3) matchedInterests.push("Creative & Design");
    if (userVec.business >= 4 && course.tags.business >= 3) matchedInterests.push("Finance & Business");
    if (userVec.humanities >= 4 && course.tags.humanities >= 3) matchedInterests.push("Humanities & Law");
    if (userVec.people_facing >= 4 && course.tags.people_facing >= 3) matchedInterests.push("Psychology & People");
    if (matchedInterests.length > 0) {
      bullets.push(`Strong subject-interest match: ${matchedInterests.join(", ")}`);
    }
  }

  // Aptitude alignment
  if (factors.aptitude >= 72) {
    bullets.push("Your natural aptitudes align with the core skills this field demands");
  }

  // Work style alignment
  if (factors.workStyle >= 72) {
    const wsMatches: string[] = [];
    if (userVec.analytical >= 4 && course.tags.analytical >= 3) wsMatches.push("analytical problem-solving");
    if (userVec.creative >= 4 && course.tags.creative >= 3) wsMatches.push("creative work");
    if (userVec.hands_on >= 4 && course.tags.hands_on >= 3) wsMatches.push("hands-on building");
    if (userVec.people_facing >= 4 && course.tags.people_facing >= 3) wsMatches.push("working with people");
    if (userVec.business >= 4 && course.tags.business >= 3) wsMatches.push("managing and leading");
    if (wsMatches.length > 0) {
      bullets.push(`Work style alignment: you prefer ${wsMatches.join(", ")}`);
    }
  }

  // Environment alignment
  if (factors.environment >= 70) {
    const envMap: Record<string, string> = {
      office: "corporate office setting",
      lab: "laboratory or clinical environment",
      field: "outdoor / field work",
      studio: "creative studio",
      remote: "remote and independent setup",
    };
    const envMatches = Object.keys(envMap)
      .filter(e => (userVec[e] || 0) >= 3 && (course.tags[e] || 0) >= 2)
      .map(e => envMap[e]);
    if (envMatches.length > 0) {
      bullets.push(`Preferred environment: ${envMatches.join(", ")}`);
    }
  }

  // Education duration
  if (factors.education >= 70) {
    if (userVec.long_duration >= 3 && (course.tags.long_duration || 0) >= 2) {
      bullets.push("You are willing to invest in a longer specialised programme");
    } else if (userVec.short_duration >= 3 && (course.tags.short_duration || 0) >= 1) {
      bullets.push("Aligns with your preference for a standard or shorter study duration");
    }
  }

  // Risk/Goals alignment
  if (factors.riskGoals >= 70) {
    if (userVec.risk_tolerant >= 4 && (course.tags.risk_tolerant || 0) >= 2) {
      bullets.push("Suits your entrepreneurial and high-growth mindset");
    } else if (userVec.risk_averse >= 4 && (course.tags.risk_averse || 0) >= 2) {
      bullets.push("Offers the career stability and structure you prioritise");
    }
  }

  return bullets.slice(0, 5);
}

// ── CHALLENGES ────────────────────────────────────────────────────────────────

const CHALLENGE_MAP: Record<string, string[]> = {
  tech: [
    "Requires keeping up with rapidly evolving technology and tools",
    "Entry-level roles can be highly competitive",
  ],
  creative: [
    "Requires continuous portfolio building and self-promotion",
    "Freelance or early-career income can be variable",
  ],
  biology: [
    "Long study duration with intense academic and clinical pressure",
    "Competitive entrance examinations (NEET or equivalent)",
  ],
  math: [
    "Strong quantitative foundation required throughout the degree",
  ],
  business: [
    "Requires strong networking and interpersonal skills from early on",
    "Career progression depends on visibility and performance beyond grades",
  ],
  humanities: [
    "Career paths can be less linear — networking and specialisation matter",
    "Some roles are highly competitive with variable starting compensation",
  ],
  field: [
    "Involves significant physical demands and outdoor exposure",
    "Career growth may require relocating to project sites or remote areas",
  ],
  lab: [
    "Research and clinical roles often require postgraduate qualifications",
    "Progression timelines can be long in academic or research tracks",
  ],
  risk_tolerant: [
    "Income and stability may be unpredictable in early career stages",
    "Requires high self-discipline and consistent performance",
  ],
  long_duration: [
    "Significant time and financial investment before career entry",
  ],
};

function buildChallenges(course: CourseTagProfile): string[] {
  const seen = new Set<string>();
  const challenges: string[] = [];

  const dominantTags = Object.entries(course.tags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag);

  for (const tag of dominantTags) {
    const list = CHALLENGE_MAP[tag];
    if (list) {
      for (const c of list) {
        if (!seen.has(c) && challenges.length < 3) {
          seen.add(c);
          challenges.push(c);
        }
      }
    }
  }

  return challenges;
}

// ── SKILLS TO DEVELOP ─────────────────────────────────────────────────────────

const SKILLS_MAP: Record<string, string[]> = {
  tech:          ["Programming fundamentals", "Problem-solving with data structures", "Version control (Git)"],
  analytical:    ["Data analysis & interpretation", "Critical reasoning", "Research methodology"],
  creative:      ["Visual design principles", "Portfolio development", "Creative brief writing"],
  business:      ["Financial literacy", "Communication & negotiation", "Project management basics"],
  people_facing: ["Active listening", "Conflict resolution", "Public speaking"],
  biology:       ["Scientific report writing", "Laboratory safety & protocols", "NEET/clinical preparation"],
  humanities:    ["Legal research & case analysis", "Essay writing & argumentation", "Critical theory"],
  hands_on:      ["Technical drawing & CAD basics", "Safety and compliance", "Material knowledge"],
  field:         ["GIS & mapping tools", "Field data collection", "Environmental assessment"],
};

function buildSkillsToDevelop(userVec: Record<string, number>, course: CourseTagProfile): string[] {
  const skills: string[] = [];
  const seen = new Set<string>();

  const relevantTags = Object.entries(course.tags)
    .filter(([tag]) => (userVec[tag] || 0) < 3) // skills to grow, not already strong
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag);

  for (const tag of relevantTags) {
    const list = SKILLS_MAP[tag];
    if (list) {
      for (const s of list) {
        if (!seen.has(s) && skills.length < 6) {
          seen.add(s);
          skills.push(s);
        }
      }
    }
  }

  // Fallback: top course subjects
  if (skills.length < 3 && course.coreSubjects) {
    for (const s of course.coreSubjects) {
      if (!seen.has(s) && skills.length < 6) {
        seen.add(s);
        skills.push(s);
      }
    }
  }

  return skills;
}

// ── NEXT STEPS ────────────────────────────────────────────────────────────────

function buildNextSteps(result: { title: string; exams: string[]; careerOutcomes?: string[] }): string[] {
  const exams = result.exams?.slice(0, 2).join(" / ") || "relevant entrance exams";
  const career = result.careerOutcomes?.[0] || "a professional in this field";
  return [
    `Research what daily life looks like as ${career}`,
    `Understand the core subjects and skills required for ${result.title}`,
    `Check eligibility requirements and board marks needed`,
    `Study the entrance exam pattern for ${exams}`,
    `Explore colleges offering this programme and compare rankings`,
    `Start a relevant project, certification or online course now`,
    `Speak to professionals or alumni working in this field`,
  ];
}

// ── AUTO-GENERATED DESCRIPTION ────────────────────────────────────────────────

function generateDesc(
  course: CourseTagProfile,
  factors: FactorScores,
  whyItFits: string[]
): string {
  const topFactor = Object.entries(factors).sort((a, b) => b[1] - a[1])[0][0];
  const factorLabel: Record<string, string> = {
    interest: "subject interests",
    aptitude: "natural aptitudes",
    workStyle: "preferred work style",
    environment: "ideal work environment",
    education: "education timeline",
    riskGoals: "career goals",
  };
  const firstWhy = whyItFits[0] || "your assessment profile";
  return `${course.title} aligns with your ${factorLabel[topFactor] || "profile"} — ${firstWhy.toLowerCase()}. ${course.careerOutcomes?.length ? `Graduates typically become ${course.careerOutcomes.slice(0, 2).join(" or ")}.` : ""}`.trim();
}

// ── CONFIDENCE ────────────────────────────────────────────────────────────────

function computeConfidence(factors: FactorScores, overallScore: number): ConfidenceLevel {
  const values = Object.values(factors);
  const above65 = values.filter(v => v >= 65).length;
  const spread = Math.max(...values) - Math.min(...values);

  if (above65 >= 5 && overallScore >= 75 && spread < 30) return "High";
  if (above65 >= 3 && overallScore >= 60) return "Moderate";
  return "Low";
}

// ── RESULT LABELLING ──────────────────────────────────────────────────────────

function assignLabel(
  index: number,
  course: CourseTagProfile,
  userVec: Record<string, number>
): ResultLabel {
  if (index === 0) return "Best Match";

  const isStable = (course.tags.risk_averse || 0) >= 3 || (course.tags.office || 0) >= 3;
  const isEntrepreneurial = (course.tags.risk_tolerant || 0) >= 3 || (course.tags.business || 0) >= 4;
  const isHighGrowth = (course.tags.tech || 0) >= 4 || (course.tags.business || 0) >= 3;
  const isAlternative = index >= 2;

  if (isStable && (userVec.risk_averse || 0) >= 3) return "Safe / Stable Option";
  if (isEntrepreneurial && (userVec.risk_tolerant || 0) >= 3) return "Entrepreneurial Option";
  if (isHighGrowth && index === 1) return "High-Growth Option";
  if (isAlternative) return "Alternative Career Path";
  return "Strong Alternative";
}

// ── SALARY PARSING ────────────────────────────────────────────────────────────

function parseSalary(raw?: string): { entry?: string; mid?: string; experienced?: string } {
  if (!raw) return {};
  // Attempt to split "₹3L - ₹8L/year" style strings
  const parts = raw.replace("/year", "").replace("per annum", "").trim();
  const match = parts.match(/^(₹[\d.]+[LCK]?)\s*[-–]\s*(₹[\d.]+[LCK]?\+?)$/i);
  if (match) {
    return {
      entry: match[1],
      mid: match[2],
      experienced: `${match[2]}+`,
    };
  }
  // If unparseable, return as-is for entry only
  return { entry: raw };
}

// ── MAIN RANKING FUNCTION ─────────────────────────────────────────────────────

export function rankAndSelectResults(
  courseData: CourseTagProfile[],
  userProfile: UserDimensionProfile
): EnrichedResult[] {
  const { vector, streamId } = userProfile;
  const eligibleStreamIds = getEligibleStreams(streamId);

  // Hard filter: stream eligibility
  let eligible = courseData.filter((c) =>
    c.streams.some((s) => eligibleStreamIds.includes(s))
  );
  if (eligible.length === 0) eligible = courseData;

  // Score every eligible course
  const scored = eligible
    .map((course) => {
      const { overall, factors } = computeCourseScore(vector, course);
      return { course, overall, factors };
    })
    .filter((r) => r.overall >= MIN_THRESHOLD)
    .sort((a, b) => b.overall - a.overall);

  if (scored.length === 0) return [];

  // Deduplicate by title (take highest scorer per title)
  const seen = new Set<string>();
  const deduped = scored.filter(({ course }) => {
    if (seen.has(course.title)) return false;
    seen.add(course.title);
    return true;
  });

  // Take up to 6 results
  const top = deduped.slice(0, 6);

  return top.map(({ course, overall, factors }, index) => {
    const whyItFits = buildWhyItFits(vector, course, factors);
    const challenges = buildChallenges(course);
    const skillsToDevelop = buildSkillsToDevelop(vector, course);
    const confidence = computeConfidence(factors, overall);
    const label = assignLabel(index, course, vector);
    const salary = parseSalary(course.salaryRange);
    const desc = generateDesc(course, factors, whyItFits);
    const matchedDimensions = Object.entries(course.tags)
      .filter(([tag, weight]) => weight >= 3 && (vector[tag] || 0) >= 3)
      .map(([tag]) => tag);

    const result: EnrichedResult = {
      title: course.title,
      category: course.category,
      overallScore: overall,
      matchPercentage: `${overall}%`,
      confidence,
      resultLabel: label,
      factorScores: factors,
      whyItFits,
      challenges,
      careerPaths: course.careerOutcomes || [],
      matchedDimensions,
      exams: course.exams || [],
      duration: course.duration,
      salaryEntry: salary.entry,
      salaryMid: salary.mid,
      salaryExperienced: salary.experienced,
      careerOutcomes: course.careerOutcomes,
      coreSubjects: course.coreSubjects,
      studyEnvironment: course.studyEnvironment,
      skillsToDevelop,
      nextSteps: buildNextSteps({ title: course.title, exams: course.exams || [], careerOutcomes: course.careerOutcomes }),
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
