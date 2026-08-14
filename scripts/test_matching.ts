import { calculateStudentVector, scoreCourses } from '../src/lib/matching';
import { courseTags } from '../src/data/courseTags';
import { assessmentQuestions } from '../src/data/assessmentQuestions';

const answers = [
  ["pcm"], // Q1: Stream (pcm)
  ["math"], // Q2: Subjects (math)
  ["analytical"], // Q3: Work style (analytical)
  ["office"], // Q4: Env (office)
  ["short"], // Q5: duration (short)
  ["no_code"], // Q6: tech/coding ("no_code" -> tech: -3)
  ["stable"], // Q7: risk (stable)
  ["no_endurance"], // Q8: endurance (no_endurance)
  ["money"], // Q9: motivation (money)
  ["data"], // Q10: data/things/people (data)
];

const vector = calculateStudentVector(answers, assessmentQuestions);
console.log("Student Vector:", vector);

const results = scoreCourses(courseTags, vector, "pcm");
console.log("\nTop 5 Results for Student who dislikes Tech:");
results.slice(0, 5).forEach((r, i) => console.log(`${i+1}. ${r.title} (${r.matchPercentage}) - Score: ${r.score.toFixed(3)} - Exams: ${r.exams}`));

// Also check Computer Science Engineering explicitly
const cse = results.find(r => r.title === "Computer Science Engineering");
console.log("\nCSE Result:", cse ? `${cse.title} (${cse.matchPercentage}) - Score: ${cse.score.toFixed(3)}` : "Not Found");
