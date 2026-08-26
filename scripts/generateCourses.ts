import fs from 'fs';
import path from 'path';
import { courseTags } from '../src/data/courseTags';

// We want to dramatically expand the dataset.
// The base has ~200 courses. We will generate 4-5 variations per course.

const engineeringModifiers = [
  "with AI Specialization",
  "& Machine Learning",
  "with Robotics",
  "& IoT Applications",
  "with Cyber Security",
  "in Sustainable Tech",
  "& Quantum Computing",
  "with Data Analytics",
];

const medicalModifiers = [
  "with Genetic Engineering",
  "& Bioinformatics",
  "in Precision Medicine",
  "with Public Health",
  "& Clinical Research",
  "in Tropical Medicine",
];

const commerceModifiers = [
  "with FinTech",
  "& Blockchain Technologies",
  "in Quantitative Finance",
  "& Venture Capital",
  "with Digital Forensics",
  "& Global Trade",
];

const artsModifiers = [
  "& Digital Humanities",
  "with Cognitive Science",
  "in Behavioral Design",
  "& Media Analytics",
  "with Visual Communication",
];

const prefixModifiers = [
  "B.Tech in",
  "B.Sc in",
  "B.A. in",
  "B.Com in",
  "BBA in",
  "Diploma in",
  "Advanced Certification in",
  "Micro-Credential in"
];

function getVariations(baseCourse: any) {
  const variations: any[] = [];
  let modifiersToUse = engineeringModifiers;
  
  if (baseCourse.category.includes("Medical") || baseCourse.category.includes("Biology") || baseCourse.category.includes("Health")) {
    modifiersToUse = medicalModifiers;
  } else if (baseCourse.category.includes("Commerce") || baseCourse.category.includes("Business") || baseCourse.category.includes("Management")) {
    modifiersToUse = commerceModifiers;
  } else if (baseCourse.category.includes("Arts") || baseCourse.category.includes("Humanities") || baseCourse.category.includes("Design")) {
    modifiersToUse = artsModifiers;
  }

  // Generate 4 variations
  for (let i = 0; i < 4; i++) {
    const modifier = modifiersToUse[Math.floor(Math.random() * modifiersToUse.length)];
    const isPrefix = Math.random() > 0.6;
    
    let newTitle = "";
    if (isPrefix) {
      const prefix = prefixModifiers[Math.floor(Math.random() * prefixModifiers.length)];
      newTitle = `${prefix} ${baseCourse.title} ${modifier}`;
    } else {
      newTitle = `${baseCourse.title} ${modifier}`;
    }

    // Tweak tags slightly
    const newTags = { ...baseCourse.tags };
    Object.keys(newTags).forEach(k => {
      // +/- 1 randomly, bounded by 1 and 5
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      newTags[k] = Math.max(1, Math.min(5, newTags[k] + change));
    });

    variations.push({
      ...baseCourse,
      title: newTitle,
      tags: newTags,
      careerOutcomes: [...baseCourse.careerOutcomes, `Specialist in ${modifier.replace(/with |& |in /g, '')}`]
    });
  }

  return variations;
}

async function run() {
  console.log(`Base courses loaded: ${courseTags.length}`);
  
  const expandedCourses = [...courseTags]; // Start with the base 200

  courseTags.forEach(course => {
    const variations = getVariations(course);
    expandedCourses.push(...variations);
  });

  console.log(`Generated total courses: ${expandedCourses.length}`);

  const outputPath = path.join(__dirname, '../public/data');
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const fileTarget = path.join(outputPath, 'courseTags.json');
  fs.writeFileSync(fileTarget, JSON.stringify(expandedCourses, null, 2), 'utf-8');
  console.log(`Successfully wrote ${expandedCourses.length} courses to ${fileTarget}`);
}

run();
