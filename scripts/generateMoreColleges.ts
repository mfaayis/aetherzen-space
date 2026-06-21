import fs from 'fs';
import path from 'path';

const states = [
  "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Uttar Pradesh",
  "Gujarat", "West Bengal", "Rajasthan", "Madhya Pradesh", "Andhra Pradesh",
  "Telangana", "Punjab", "Haryana", "Bihar", "Odisha", "Kerala"
];

const citiesByState: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"],
  "Delhi": ["New Delhi"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Varanasi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Howrah"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  "Haryana": ["Gurgaon", "Faridabad", "Panipat", "Ambala"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"]
};

const types = ["Arts & Science College", "Engineering College", "Institute of Technology", "Medical College", "College of Nursing", "Management Institute", "Law College", "Architecture School"];
const namesPrefix = ["National", "Global", "Indian", "Royal", "Apex", "Pioneer", "Summit", "Horizon", "Excel", "Merit", "Paramount", "Elite"];

function generateRandomColleges(count: number) {
  const newColleges = [];
  
  for (let i = 0; i < count; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const cities = citiesByState[state];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const prefix = namesPrefix[Math.floor(Math.random() * namesPrefix.length)];
    
    // Some variation to the name format
    const nameFormat = Math.random() > 0.5 
      ? `${prefix} ${type}, ${city}` 
      : `${city} ${type}`;

    const isGovt = Math.random() > 0.8; // 20% chance to be government

    let courses: string[] = [];
    if (type.includes("Engineering") || type.includes("Technology")) courses = ["Engineering", "Computer Applications"];
    else if (type.includes("Medical") || type.includes("Nursing")) courses = ["Medical", "Nursing", "Allied Health Sciences"];
    else if (type.includes("Management")) courses = ["Management", "Commerce"];
    else if (type.includes("Law")) courses = ["Law"];
    else if (type.includes("Architecture")) courses = ["Architecture", "Design"];
    else courses = ["Arts", "Science", "Commerce"];

    newColleges.push({
      id: `generated-col-${Math.random().toString(36).substr(2, 9)}`,
      name: nameFormat,
      location: { city, state },
      type: isGovt ? "Government" : "Private",
      feeRange: isGovt ? "Low" : (Math.random() > 0.5 ? "Mid" : "High"),
      approxFee: isGovt ? "₹15,000 / year" : "₹1L - ₹3L / year",
      coursesOffered: courses,
      admissionProcess: isGovt ? "Merit/State Entrance Exam" : "Merit, Management Quota, or National Entrance Exam",
      officialWebsite: "https://example.edu.in"
    });
  }
  return newColleges;
}

async function run() {
  const inputPath = path.join(__dirname, '../public/data/colleges.json');
  let existingColleges: any[] = [];
  
  if (fs.existsSync(inputPath)) {
    const raw = fs.readFileSync(inputPath, 'utf-8');
    existingColleges = JSON.parse(raw);
    console.log(`Loaded ${existingColleges.length} existing colleges from JSON.`);
  } else {
    console.log("No existing colleges.json found!");
    return;
  }

  const generated = generateRandomColleges(1000);
  const combinedColleges = [...existingColleges, ...generated];

  fs.writeFileSync(inputPath, JSON.stringify(combinedColleges, null, 2), 'utf-8');
  console.log(`Successfully added 1000 colleges. Total is now ${combinedColleges.length}. Saved to ${inputPath}`);
}

run();
