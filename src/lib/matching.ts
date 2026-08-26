// ─────────────────────────────────────────────────────────────────────────────
// matching.ts — Thin adapter layer
//
// All heavy scoring logic has moved to assessmentEngine.ts.
// This file re-exports what AssessmentFlow.tsx and other consumers need
// for backward compatibility, and provides the calculateStudentVector helper
// used by the shared view (URL-based blueprint reconstruction).
// ─────────────────────────────────────────────────────────────────────────────

import { AssessmentQuestion } from "@/data/assessmentQuestions";
import { CourseTagProfile } from "@/data/courseTags";
import {
  buildUserProfile,
  rankAndSelectResults,
  EnrichedResult,
} from "@/lib/assessmentEngine";

export type { EnrichedResult };

/**
 * Build user dimension vector from raw answer arrays.
 * Used by AssessmentFlow to pass data to the engine.
 */
export function calculateStudentVector(
  answers: string[][],
  questions: AssessmentQuestion[]
): Record<string, number> {
  return buildUserProfile(answers, questions).vector;
}

/**
 * Full scoring pipeline: build profile → score all eligible courses → return ranked results.
 * Returns up to 6 results above the minimum threshold (≥50%).
 */
export function scoreCourses(
  courseData: CourseTagProfile[],
  answers: string[][],
  questions: AssessmentQuestion[]
): EnrichedResult[] {
  const userProfile = buildUserProfile(answers, questions);
  return rankAndSelectResults(courseData, userProfile);
}
