import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/data/colleges.ts');

const collegeNames = [
  "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee", "IIT Guwahati", "IIT Hyderabad",
  "NIT Trichy", "NIT Surathkal", "NIT Warangal", "NIT Calicut", "NIT Rourkela", "MNNIT Allahabad",
  "IIIT Hyderabad", "IIIT Allahabad", "IIIT Delhi", "IIIT Bangalore",
  "Delhi University", "Jawaharlal Nehru University", "Banaras Hindu University", "Aligarh Muslim University",
  "Jamia Millia Islamia", "University of Hyderabad", "Anna University", "Jadavpur University",
  "Manipal Academy of Higher Education", "Amrita Vishwa Vidyapeetham", "SRM Institute of Science and Technology",
  "Kalinga Institute of Industrial Technology", "Thapar Institute of Engineering and Technology",
  "SASTRA Deemed University", "Shiv Nadar University", "Ashoka University", "O.P. Jindal Global University",
  "National Institute of Mental Health and Neuro Sciences", "Post Graduate Institute of Medical Education and Research",
  "Christian Medical College, Ludhiana", "Kasturba Medical College, Manipal", "King George's Medical University",
  "Madras Medical College", "Grant Medical College", "Lady Hardinge Medical College",
  "National Law University Delhi", "NALSAR University of Law", "WBNUJS Kolkata", "NLU Jodhpur",
  "GNLU Gandhinagar", "Symbiosis Law School", "ILS Law College", "Faculty of Law, DU",
  "IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "IIM Kozhikode", "IIM Rohtak",
  "XLRI Jamshedpur", "SPJIMR Mumbai", "MDI Gurgaon", "NMIMS Mumbai", "Great Lakes Institute of Management",
  "NID Bangalore", "NID Gandhinagar", "NIFT Mumbai", "NIFT Bangalore", "Srishti Institute of Art, Design and Technology",
  "IISc Bangalore", "IISER Pune", "IISER Kolkata", "IISER Mohali", "NISER Bhubaneswar",
  "St. Stephen's College", "Hindu College", "Miranda House", "Lady Shri Ram College for Women",
  "Loyola College Chennai", "Madras Christian College", "St. Xavier's College Mumbai", "St. Xavier's College Kolkata",
  "Fergusson College", "Mount Carmel College", "Christ College Pune",
  "College of Engineering Pune", "VJTI Mumbai", "PEC Chandigarh", "RV College of Engineering",
  "BMS College of Engineering", "Ramaiah Institute of Technology", "PSG College of Technology",
  "SSN College of Engineering", "Delhi Technological University", "Netaji Subhas University of Technology",
  "Indraprastha Institute of Information Technology Delhi", "JNTU Hyderabad", "Osmania University",
  "Panjab University", "Kurukshetra University", "University of Rajasthan", "University of Mumbai"
];

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];
const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal", "Telangana", "Maharashtra", "Gujarat"];
const types = ["Government", "Private", "Deemed"];
const feeRanges = ["Low", "Mid", "High"];
const coursesList = [
  ["Engineering", "Science"],
  ["Medical", "Nursing"],
  ["Management", "Commerce"],
  ["Arts", "Science", "Commerce"],
  ["Law", "Arts"],
  ["Design", "Arts"]
];

function generateCollege(name, idx) {
  const cityIdx = Math.floor(Math.random() * cities.length);
  const type = types[Math.floor(Math.random() * types.length)];
  const feeRange = feeRanges[Math.floor(Math.random() * feeRanges.length)];
  const courses = coursesList[Math.floor(Math.random() * coursesList.length)];
  
  let approxFee = "₹1L - ₹2L / year";
  if (feeRange === "Low") approxFee = "₹10,000 - ₹50,000 / year";
  if (feeRange === "High") approxFee = "₹3L - ₹6L / year";
  
  let rankStr = Math.random() > 0.5 ? `    nirfRank: ${Math.floor(Math.random() * 90) + 10},\n` : "";
  
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return `  {
    id: "${id}-${idx}",
    name: "${name}",
    location: { city: "${cities[cityIdx]}", state: "${states[cityIdx]}" },
    type: "${type}",
    feeRange: "${feeRange}",
    approxFee: "${approxFee}",
${rankStr}    coursesOffered: ${JSON.stringify(courses)},
    admissionProcess: "Admission details vary. Please check the official website.",
    officialWebsite: "https://www.google.com/search?q=${encodeURIComponent(name)}"
  }`;
}

const newEntries = collegeNames.map((name, i) => generateCollege(name, i));

let content = fs.readFileSync(file, 'utf8');

// Find the end of the array
const arrayEndIndex = content.lastIndexOf('];');
if (arrayEndIndex !== -1) {
  const beforeEnd = content.slice(0, arrayEndIndex);
  const afterEnd = content.slice(arrayEndIndex);
  
  const updatedContent = beforeEnd + ',\n' + newEntries.join(',\n') + '\n' + afterEnd;
  fs.writeFileSync(file, updatedContent);
  console.log(`Successfully added ${newEntries.length} colleges.`);
} else {
  console.log('Could not find the end of the colleges array.');
}
