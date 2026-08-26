import { scoreCourses } from '../src/lib/matching';
import { courseTags } from '../src/data/courseTags';
import { assessmentQuestions } from '../src/data/assessmentQuestions';

// Test answers aligned with the new 12-question format
// Q1: stream, Q2: subjects (multi), Q3: aptitude (multi), Q4: work style (multi),
// Q5: environment (multi), Q6: education, Q7: tech, Q8: risk, Q9: independence,
// Q10: physical, Q11: motivation (multi), Q12: financial priority
const answers = [
  ["pcm"],                          // Q1: Science PCM
  ["math", "comp_sci"],             // Q2: Subjects
  ["apt_logic", "apt_tech"],        // Q3: Aptitude
  ["ws_research", "ws_digital"],    // Q4: Work style
  ["env_office", "env_remote"],     // Q5: Environment
  ["edu_standard"],                 // Q6: Education duration
  ["tech_build"],                   // Q7: Tech comfort
  ["risk_balanced"],                // Q8: Risk
  ["ind_both"],                     // Q9: Independence
  ["phys_no"],                      // Q10: Physical
  ["mot_income", "mot_learn"],      // Q11: Motivation
  ["fin_important"],                // Q12: Financial priority
];

const results = scoreCourses(courseTags, answers, assessmentQuestions);
console.log("\nTop results:");
results.forEach((r, i) =>
  console.log(`${i + 1}. ${r.title} — ${r.matchPercentage} (${r.confidence} confidence) — ${r.resultLabel}`)
);

// Find a specific course
const cse = results.find((r) => r.title.toLowerCase().includes("computer science"));
if (cse) {
  console.log("\nCSE Result:", cse.title, cse.matchPercentage);
  console.log("Why it fits:", cse.whyItFits);
}
