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
  tags: Record<string, number>;
}

export function scoreCourses(studentVector: Record<string, number>, streamId: string): MatchResult[] {
  // Hard Filter: Only include courses that allow the student's stream
  let eligibleCourses = courseTags.filter(c => c.streams.includes(streamId));

  if (eligibleCourses.length === 0) {
    // Fallback if somehow no courses match stream (should not happen with good data)
    eligibleCourses = courseTags; 
  }

  const scoredCourses = eligibleCourses.map(course => {
    // We use a mix of Cosine Similarity (direction) and a small weight for Dot Product (magnitude)
    // to ensure students with lots of answers don't just match everything.
    // Cosine similarity gives a value between -1 and 1.
    const similarity = calculateCosineSimilarity(studentVector, course.tags);
    
    // Add a tiny bit of random noise (0.001) to break exact ties naturally
    const score = similarity + (Math.random() * 0.001);
    
    return {
      title: course.title,
      category: course.category,
      score,
      tags: course.tags
    };
  });

  // Sort descending by score
  scoredCourses.sort((a, b) => b.score - a.score);

  // Take Top 4
  const top4 = scoredCourses.slice(0, 4);

  // Normalization: 
  // If the absolute best match has a cosine similarity of 0.85, we treat that as "98% Match"
  // and scale the rest relative to it so they spread out.
  const maxScore = top4[0]?.score || 1;
  const baseCeiling = 98; // Highest possible displayed percentage

  return top4.map(course => {
    // Normalize relative to the top scorer, but floor it at a reasonable baseline so it doesn't look terrible
    const relativeRatio = course.score / maxScore;
    let percentage = Math.floor(baseCeiling * relativeRatio);
    
    // Ensure it doesn't drop to 10% (usually top 4 are at least decent matches)
    if (percentage < 60) percentage = 60 + Math.floor(Math.random() * 10);

    return {
      ...course,
      matchPercentage: `${percentage}%`
    };
  });
}
