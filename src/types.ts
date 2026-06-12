export interface SurveyResponse {
  stream: string; // "pcm" | "pcb" | "commerce" | "humanities" | "vocational"
  aggregateMarks: string; // ">90%" | "80-90%" | "65-80%" | "<65%"
  primaryInterests: string[]; // e.g., ["coding", "healthcare", "business", "arts", "law", "design"]
  preferredOutcome: string; // "corporate" | "research" | "creative" | "entrepreneur" | "government"
  budgetTier: string; // "budget-gov" | "mid-tier" | "premium-private"
  locationPref: string; // "home-state" | "anywhere-india" | "abroad"
}

export interface RecommendationCourse {
  courseName: string;
  duration: string;
  suitabilityRationale: string;
  idealForStrengths: string;
  admissionRoute: string; // e.g. "CUET PG" / "JEE Main" / "Merit based"
}

export interface TimelinePhase {
  phase: string; // e.g. "Months 1-3"
  focusArea: string;
  actionItems: string[];
}

export interface CareerRecommendationReport {
  recommendedStream: string;
  execSummary: string;
  courses: RecommendationCourse[];
  recommendedExamsToTake: string[];
  timeline: TimelinePhase[];
  preparationTips: string[];
}

export interface CourseCatalogItem {
  id: string;
  name: string;
  fullName: string;
  streamCategory: string; // e.g. "Science", "Commerce"
  duration: string;
  difficulty: "High Rigor" | "Moderate" | "Balanced";
  averageStartingSalary: string;
  overview: string;
  eligibility: string;
  topEntranceExams: string[];
  admissionProcess: string;
  careerRoles: string[];
}

export interface EntranceExam {
  id: string;
  name: string;
  fullName: string;
  stream: string;
  difficulty: string;
  eligibility: string;
  examPattern: string;
  keySubjects: string[];
  registrationTimeline: string;
  estimatedExamMonth: string;
  officialWebsite: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
