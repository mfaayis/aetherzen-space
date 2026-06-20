import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/data/colleges.ts');

const citiesByState = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Vasant Kunj"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Rohtak"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Dharamshala", "Solan"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Chandigarh"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Bikaner"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Noida", "Prayagraj"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"]
};

const states = Object.keys(citiesByState);

const prefixes = [
  "National Institute of", "Government College of", "Institute of", "School of", "Faculty of",
  "Global Institute of", "Indian Institute of", "State College of", "Regional Institute of",
  "Mahatma Gandhi Institute of", "Dr. B.R. Ambedkar College of", "Sri Sai Institute of",
  "Modern College of", "Advanced Institute of", "Central University of", "State University of",
  "Royal College of", "Presidency Institute of", "Apex College of", "Pioneer Institute of"
];

const domains = [
  "Technology", "Engineering and Science", "Medical Sciences", "Pharmacy", "Law",
  "Commerce and Business", "Management Studies", "Arts and Humanities", "Design and Architecture",
  "Information Technology", "Computer Applications", "Nursing and Allied Health", "Education and Training",
  "Mass Communication", "Aviation and Hospitality", "Hotel Management", "Biotechnology",
  "Social Work", "Fine Arts", "Paramedical Sciences"
];

const types = ["Government", "Private", "Deemed"];
const feeRanges = ["Low", "Mid", "High"];

const domainToCourses = {
  "Technology": ["Engineering", "Science"],
  "Engineering and Science": ["Engineering", "Science"],
  "Medical Sciences": ["Medical", "Allied Health Sciences"],
  "Pharmacy": ["Pharmacy", "Medical"],
  "Law": ["Law"],
  "Commerce and Business": ["Commerce", "Management"],
  "Management Studies": ["Management"],
  "Arts and Humanities": ["Arts", "Humanities"],
  "Design and Architecture": ["Design", "Architecture"],
  "Information Technology": ["Computer Applications", "Engineering"],
  "Computer Applications": ["Computer Applications"],
  "Nursing and Allied Health": ["Nursing", "Allied Health Sciences"],
  "Education and Training": ["Education", "Arts"],
  "Mass Communication": ["Media", "Arts"],
  "Aviation and Hospitality": ["Aviation", "Management"],
  "Hotel Management": ["Management"],
  "Biotechnology": ["Science", "Engineering"],
  "Social Work": ["Arts", "Humanities"],
  "Fine Arts": ["Arts", "Design"],
  "Paramedical Sciences": ["Allied Health Sciences", "Medical"]
};

function generateCollege(idx) {
  const state = states[Math.floor(Math.random() * states.length)];
  const cities = citiesByState[state];
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const name = prefix + " " + domain + ", " + city;
  
  const type = types[Math.floor(Math.random() * types.length)];
  const feeRange = feeRanges[Math.floor(Math.random() * feeRanges.length)];
  
  const courses = domainToCourses[domain] || ["Arts"];
  
  let approxFee = "1L - 2L / year";
  if (type === "Government") {
    approxFee = feeRange === "Low" ? "10,000 - 30,000 / year" : "50,000 - 1L / year";
  } else {
    approxFee = feeRange === "Low" ? "80,000 - 1.5L / year" : (feeRange === "High" ? "3L - 8L / year" : "1.5L - 3L / year");
  }
  
  let rankStr = Math.random() > 0.8 ? "    nirfRank: " + (Math.floor(Math.random() * 150) + 10) + ",\n" : "";
  
  const idStr = prefix.toLowerCase() + "-" + domain.toLowerCase() + "-" + city.toLowerCase() + "-" + idx;
  const id = idStr.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return "  {\n" +
    "    id: \"" + id + "\",\n" +
    "    name: \"" + name + "\",\n" +
    "    location: { city: \"" + city + "\", state: \"" + state + "\" },\n" +
    "    type: \"" + type + "\",\n" +
    "    feeRange: \"" + feeRange + "\",\n" +
    "    approxFee: \"Rs " + approxFee + "\",\n" +
    rankStr + 
    "    coursesOffered: " + JSON.stringify(courses) + ",\n" +
    "    admissionProcess: \"Admissions based on respective state and national level entrance exams along with merit.\",\n" +
    "    officialWebsite: \"https://www.google.com/search?q=" + encodeURIComponent(name) + "\"\n" +
    "  }";
}

// Generate exactly 1000 colleges
const numToGenerate = 1000;
const newEntries = Array.from({ length: numToGenerate }).map((_, i) => generateCollege(i + 1000)); 

let content = fs.readFileSync(file, 'utf8');

const arrayEndIndex = content.lastIndexOf('];');
if (arrayEndIndex !== -1) {
  const beforeEnd = content.slice(0, arrayEndIndex);
  const afterEnd = content.slice(arrayEndIndex);
  
  const updatedContent = beforeEnd.trimEnd() + ',\n' + newEntries.join(',\n') + '\n' + afterEnd;
  fs.writeFileSync(file, updatedContent);
  console.log("Successfully added " + newEntries.length + " colleges.");
} else {
  console.log('Could not find the end of the colleges array.');
}
