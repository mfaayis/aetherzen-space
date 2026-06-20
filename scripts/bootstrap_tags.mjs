import fs from 'fs';
import path from 'path';

// Note: Ensure courses.ts is readable or simply hardcode the categories here for the bootstrap
const categories = [
  {
    title: "Engineering and Technology",
    courses: [
      "Mechanical Engineering", "Automobile Engineering", "Civil Engineering", 
      "Computer Science Engineering", "Artificial Intelligence and Machine Learning", 
      "Electronics and Communication Engineering", "Electrical Engineering", 
      "Chemical Engineering", "Aeronautical Engineering", "Aerospace Engineering", 
      "Marine Engineering", "Mechatronics Engineering", "Robotics Engineering", 
      "Petroleum Engineering", "Biotechnology Engineering", "Mining Engineering", 
      "Metallurgical Engineering", "Industrial Engineering", "Production Engineering", 
      "Environmental Engineering", "Agricultural Engineering", "Food Technology", 
      "Nanotechnology", "Biomedical Engineering"
    ]
  },
  {
    title: "Medical and Allied Health Sciences",
    courses: [
      "MBBS", "BDS", "BAMS", "BHMS", "BUMS", "BSMS", "BPT (Physiotherapy)", 
      "B.Sc Nursing", "B.Pharm", "Pharm D", "Occupational Therapy", "Optometry", 
      "Audiology and Speech Therapy", "Medical Laboratory Technology", 
      "Radiology and Imaging Technology", "Operation Theatre Technology", 
      "Dialysis Technology", "Cardiac Technology", "Emergency Medical Technology", 
      "Nutrition and Dietetics"
    ]
  },
  {
    title: "Commerce and Management",
    courses: [
      "B.Com", "BBA", "BBM", "Bachelor of Economics", "Bachelor of Finance", 
      "Banking and Insurance", "International Business", "Retail Management", 
      "Logistics and Supply Chain Management", "Financial Markets", "Investment Banking", 
      "Hospital Management", "Hotel Management", "Event Management", "Sports Management", 
      "Aviation Management", "Digital Business", 
      "Chartered Accountancy (CA)", "Company Secretary (CS)", "CMA", "CFA", "ACCA", 
      "Financial Risk Management (FRM)"
    ]
  },
  {
    title: "Pure Science",
    courses: [
      "B.Sc Physics", "B.Sc Chemistry", "B.Sc Mathematics", "B.Sc Statistics", 
      "B.Sc Computer Science", "B.Sc Data Science", "B.Sc Biotechnology", 
      "B.Sc Microbiology", "B.Sc Zoology", "B.Sc Botany", "B.Sc Geology", 
      "B.Sc Oceanography", "B.Sc Environmental Science", "B.Sc Forensic Science", 
      "B.Sc Agriculture", "B.Sc Food Science"
    ]
  },
  {
    title: "Computer and IT Courses",
    courses: [
      "BCA", "Bachelor of Information Technology", "Software Engineering", 
      "Data Science", "Artificial Intelligence", "Machine Learning", "Cybersecurity", 
      "Ethical Hacking", "Cloud Computing", "Blockchain Technology", 
      "Internet of Things (IoT)", "Game Development", "Mobile App Development", 
      "Full Stack Development"
    ]
  },
  {
    title: "Law",
    courses: [
      "BA LLB", "BBA LLB", "B.Com LLB", "B.Sc LLB", "LLB (after graduation)", 
      "Cyber Law", "Corporate Law", "International Law"
    ]
  },
  {
    title: "Aviation",
    courses: [
      "Commercial Pilot License (CPL)", "Aircraft Maintenance Engineering (AME)", 
      "Airport Management", "Cabin Crew", "Air Traffic Management", "Aviation Hospitality"
    ]
  },
  {
    title: "Arts, Humanities and Social Sciences",
    courses: [
      "BA English", "BA History", "BA Economics", "BA Political Science", 
      "BA Sociology", "BA Psychology", "BA Philosophy", "BA Public Administration", 
      "BA Journalism", "BA Mass Communication", "BA International Relations", 
      "BA Anthropology", "BA Geography"
    ]
  },
  {
    title: "Design and Creative Arts",
    courses: [
      "BA Interior Design", "B.Des Fashion Design", "B.Des Graphic Design", 
      "B.Des Industrial Design", "B.Des Product Design", "Animation and VFX", 
      "Photography", "Fine Arts (BFA)", "Cinematography", "Web Design"
    ]
  },
  {
    title: "Hospitality and Tourism",
    courses: [
      "B.Sc Hotel Management", "Bachelor of Tourism and Travel Management", 
      "Culinary Arts", "Catering Technology"
    ]
  },
  {
    title: "Agriculture and Environment",
    courses: [
      "B.Sc Agriculture", "B.Sc Forestry", "B.Sc Horticulture", "B.Sc Fisheries", 
      "Dairy Technology", "Wildlife Management"
    ]
  },
  {
    title: "Defence and Uniform Services",
    courses: [
      "National Defence Academy (NDA)", "Indian Naval Academy (INA)", 
      "Indian Military Academy (IMA)", "Air Force Academy (AFA)", "Merchant Navy", 
      "Coast Guard"
    ]
  },
  {
    title: "Diploma Courses",
    courses: [
      "Diploma in Engineering (Polytechnic)", "Diploma in Pharmacy (D.Pharm)", 
      "Diploma in Nursing", "Diploma in Education (D.Ed)"
    ]
  },
  {
    title: "Foreign Language Courses",
    courses: [
      "BA French", "BA German", "BA Spanish", "BA Japanese", "BA Mandarin"
    ]
  },
  {
    title: "Modern Skill-Based Courses",
    courses: [
      "Digital Marketing", "UI/UX Design", "Video Editing and Animation", 
      "Data Analytics", "Content Writing", "Sound Engineering"
    ]
  },
  {
    title: "Government Career Preparation",
    courses: [
      "UPSC Civil Services", "State PSC", "SSC CGL", "Banking (IBPS/SBI)", "Railway Recruitment Board (RRB)"
    ]
  }
];

const categoryDefaults = {
  "Engineering and Technology": { streams: ["pcm"], tags: { analytical: 4, tech: 3, hands_on: 2, office: 2, math: 4 }, coreTags: ["math", "analytical"] },
  "Medical and Allied Health Sciences": { streams: ["pcb"], tags: { biology: 5, lab: 4, people_facing: 3, long_duration: 3, hands_on: 2 }, coreTags: ["biology"] },
  "Commerce and Management": { streams: ["commerce", "humanities", "pcm"], tags: { business: 5, office: 4, analytical: 2, people_facing: 2, math: 1 }, coreTags: ["business"] },
  "Pure Science": { streams: ["pcm", "pcb"], tags: { analytical: 5, lab: 3, tech: 1, math: 2 }, coreTags: ["analytical"] },
  "Computer and IT Courses": { streams: ["pcm", "commerce"], tags: { tech: 5, analytical: 4, remote: 3, office: 2, math: 2 }, coreTags: ["tech"] },
  "Law": { streams: ["humanities", "commerce", "pcm", "pcb"], tags: { humanities: 3, analytical: 3, people_facing: 3, office: 3, long_duration: 2 }, coreTags: ["analytical", "humanities"] },
  "Aviation": { streams: ["pcm", "commerce"], tags: { field: 4, hands_on: 3, tech: 2, risk_tolerant: 2 }, coreTags: ["hands_on"] },
  "Arts, Humanities and Social Sciences": { streams: ["humanities", "commerce", "pcb"], tags: { humanities: 5, people_facing: 3, creative: 2, analytical: 2 }, coreTags: ["humanities"] },
  "Design and Creative Arts": { streams: ["humanities", "commerce", "pcm"], tags: { creative: 5, studio: 4, remote: 2, hands_on: 2 }, coreTags: ["creative"] },
  "Hospitality and Tourism": { streams: ["humanities", "commerce"], tags: { people_facing: 5, hands_on: 2, field: 2, business: 2 }, coreTags: ["people_facing"] },
  "Agriculture and Environment": { streams: ["pcb", "pcm"], tags: { field: 4, biology: 3, lab: 2, hands_on: 2 }, coreTags: ["field"] },
  "Defence and Uniform Services": { streams: ["pcm", "pcb", "humanities"], tags: { field: 5, hands_on: 4, risk_tolerant: 3, people_facing: 2 }, coreTags: ["field", "hands_on"] },
  "Diploma Courses": { streams: ["pcm", "commerce", "humanities", "pcb"], tags: { short_duration: 5, hands_on: 4, tech: 2 }, coreTags: ["short_duration"] },
  "Foreign Language Courses": { streams: ["humanities", "commerce", "pcm", "pcb"], tags: { humanities: 4, people_facing: 3, remote: 2 }, coreTags: ["humanities"] },
  "Modern Skill-Based Courses": { streams: ["commerce", "humanities", "pcm"], tags: { creative: 3, tech: 3, remote: 5, short_duration: 4, risk_tolerant: 3 }, coreTags: [] },
  "Government Career Preparation": { streams: ["humanities", "commerce", "pcm", "pcb"], tags: { risk_averse: 5, office: 4, analytical: 3, long_duration: 3 }, coreTags: ["risk_averse", "office"] },
};

// Course-specific overrides (only adding things that stand out uniquely)
const courseOverrides = {
  "Computer Science Engineering": { tags: { tech: 6, remote: 3 }, coreTags: ["tech", "analytical"] },
  "MBBS": { tags: { biology: 6, long_duration: 5, lab: 5 }, coreTags: ["biology", "long_duration"] },
  "Civil Engineering": { tags: { field: 4, office: 1 }, coreTags: ["hands_on", "field"] },
  "Mechanical Engineering": { tags: { hands_on: 5 }, coreTags: ["hands_on"] },
  "Chartered Accountancy (CA)": { tags: { math: 4, business: 5, analytical: 5, long_duration: 4, office: 5 }, coreTags: ["business", "analytical", "long_duration"] },
  "Event Management": { tags: { people_facing: 5, field: 3, creative: 3, office: 1 }, coreTags: ["people_facing", "creative"] },
  "Game Development": { tags: { tech: 5, creative: 5, studio: 4 }, coreTags: ["tech", "creative"] },
  "BA Psychology": { tags: { humanities: 5, people_facing: 5, analytical: 3 }, coreTags: ["people_facing", "humanities"] },
};

let output = `export interface CourseTagProfile {
  title: string;
  category: string;
  streams: string[];
  tags: Record<string, number>;
  coreTags: string[];
}

export const courseTags: CourseTagProfile[] = [\n`;

categories.forEach(cat => {
  const defaults = categoryDefaults[cat.title] || { streams: ["humanities"], tags: {}, coreTags: [] };
  
  cat.courses.forEach(course => {
    const override = courseOverrides[course] || { tags: {}, coreTags: null };
    
    // Merge tags
    const mergedTags = { ...defaults.tags };
    for (const [key, val] of Object.entries(override.tags || {})) {
      mergedTags[key] = val; // overwrite
    }
    
    // Merge core tags (override entirely if exists)
    const finalCoreTags = override.coreTags !== null && override.coreTags !== undefined 
      ? override.coreTags 
      : defaults.coreTags;

    output += `  {
    title: "${course}",
    category: "${cat.title}",
    streams: ${JSON.stringify(defaults.streams)},
    tags: ${JSON.stringify(mergedTags)},
    coreTags: ${JSON.stringify(finalCoreTags)}
  },\n`;
  });
});

output += `];\n`;

const outPath = path.join(process.cwd(), 'src/data/courseTags.ts');
fs.writeFileSync(outPath, output);
console.log('Successfully bootstrapped courseTags.ts');
