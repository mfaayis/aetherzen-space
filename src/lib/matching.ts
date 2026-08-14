import { AssessmentQuestion } from "@/data/assessmentQuestions";
import { courseTags, CourseTagProfile } from "@/data/courseTags";

// Calculates the dot product between two vectors
function calculateDotProduct(vecA: Record<string, number>, vecB: Record<string, number>): number {
  let product = 0;
  for (const [key, value] of Object.entries(vecA)) {
    if (vecB[key]) {
      product += value * vecB[key];
    }
  }
  return product;
}

// Calculates the magnitude of a vector
function calculateMagnitude(vec: Record<string, number>): number {
  let sumSq = 0;
  for (const value of Object.values(vec)) {
    sumSq += value * value;
  }
  return Math.sqrt(sumSq);
}

// Cosine Similarity between two tag vectors
function calculateCosineSimilarity(vecA: Record<string, number>, vecB: Record<string, number>): number {
  const magA = calculateMagnitude(vecA);
  const magB = calculateMagnitude(vecB);
  if (magA === 0 || magB === 0) return 0;
  return calculateDotProduct(vecA, vecB) / (magA * magB);
}

export function calculateStudentVector(answers: string[][], questions: AssessmentQuestion[]): Record<string, number> {
  const vector: Record<string, number> = {};

  answers.forEach((selectedIds, index) => {
    const question = questions[index];
    if (!question) return;

    selectedIds.forEach(id => {
      const option = question.options.find(opt => opt.id === id);
      if (option && option.tags) {
        for (const [tag, weight] of Object.entries(option.tags)) {
          vector[tag] = (vector[tag] || 0) + weight;
        }
      }
    });
  });

  return vector;
}

export interface MatchResult {
  title: string;
  category: string;
  score: number;
  matchPercentage: string;
  desc?: string;
  tags: Record<string, number>;
  exams: string[];
  duration?: string;
  costRange?: string;
  salaryRange?: string;
  jobStats?: string;
  coreSubjects?: string[];
  careerOutcomes?: string[];
  studyEnvironment?: string;
}

// Maps a streamId to the list of stream IDs that should be eligible
// FIX: PCMB students should see both PCM and PCB courses
function getEligibleStreams(streamId: string): string[] {
  if (streamId === "pcmb") return ["pcm", "pcb", "pcmb"];
  return [streamId];
}

export function scoreCourses(courseData: CourseTagProfile[], studentVector: Record<string, number>, streamId: string): MatchResult[] {
  // Hard Filter: Only include courses that allow the student's stream
  const eligibleStreamIds = getEligibleStreams(streamId);
  const dataToSearch = courseData && courseData.length > 0 ? courseData : courseTags;
  let eligibleCourses = dataToSearch.filter(c =>
    c.streams.some(s => eligibleStreamIds.includes(s))
  );

  if (eligibleCourses.length === 0) {
    // Fallback: should not happen with well-maintained data
    eligibleCourses = dataToSearch;
  }

  const scoredCourses = eligibleCourses.map(course => {
    // Skip courses with no tags — cosine similarity is undefined for zero vectors
    const courseTagCount = Object.keys(course.tags).length;
    if (courseTagCount === 0) {
      return {
        title: course.title,
        category: course.category,
        score: -1,
        tags: course.tags,
        exams: course.exams,
        duration: course.duration,
        costRange: course.costRange,
        salaryRange: course.salaryRange,
        jobStats: course.jobStats,
        coreSubjects: course.coreSubjects,
        careerOutcomes: course.careerOutcomes,
        studyEnvironment: course.studyEnvironment
      };
    }

    // Cosine similarity gives 0-1 directional alignment
    let similarity = calculateCosineSimilarity(studentVector, course.tags);

    // Core Trait Penalty: if a course has dealbreaker tags the student doesn't have, penalize hard
    let penalty = 0;
    if (course.coreTags && course.coreTags.length > 0) {
      for (const coreTag of course.coreTags) {
        if (!studentVector[coreTag] || studentVector[coreTag] <= 0) {
          penalty += 0.5;
        }
      }
    }

    const score = Math.max(-1, similarity - penalty);

    return {
      title: course.title,
      category: course.category,
      score,
      tags: course.tags,
      exams: course.exams,
      duration: course.duration,
      costRange: course.costRange,
      salaryRange: course.salaryRange,
      jobStats: course.jobStats,
      coreSubjects: course.coreSubjects,
      careerOutcomes: course.careerOutcomes,
      studyEnvironment: course.studyEnvironment
    };
  });

  // Sort descending by score
  scoredCourses.sort((a, b) => b.score - a.score);

  // Only consider courses with a meaningful positive score to avoid garbage results
  const MINIMUM_SCORE_THRESHOLD = 0.05;
  const qualified = scoredCourses.filter(c => c.score >= MINIMUM_SCORE_THRESHOLD);

  // Take Top 4 from qualified candidates (fallback to top 4 overall if needed)
  const top4 = (qualified.length >= 4 ? qualified : scoredCourses).slice(0, 4);

  // Normalization: best match → 97%, others scaled with a power curve for natural spread
  // NO artificial 60% floor — bad matches will show their true lower scores
  const maxScore = top4[0]?.score || 1;
  const CEILING = 97;

  return top4.map(course => {
    const relativeRatio = maxScore > 0 ? Math.max(0, course.score / maxScore) : 0;
    // Power curve (0.6) widens the gap between top and lower matches
    const percentage = CEILING * Math.pow(relativeRatio, 0.6);

    return {
      ...course,
      matchPercentage: `${Math.max(percentage, 10).toFixed(1)}%`
    };
  });
}

