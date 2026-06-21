import fs from 'fs';
import path from 'path';

async function run() {
  const inputPath = path.join(__dirname, '../public/data/colleges.json');
  if (!fs.existsSync(inputPath)) {
    console.error("No existing colleges.json found!");
    return;
  }

  const raw = fs.readFileSync(inputPath, 'utf-8');
  const existingColleges = JSON.parse(raw);
  console.log(`Loaded ${existingColleges.length} existing colleges.`);

  const newColleges = [
    {
      id: "sctce-tvm",
      name: "Sree Chitra Thirunal College of Engineering (SCTCE)",
      location: { city: "Thiruvananthapuram", state: "Kerala" },
      type: "Government",
      feeRange: "Mid",
      approxFee: "₹35,000 - ₹65,000 / year",
      coursesOffered: ["Engineering"],
      admissionProcess: "Admission through KEAM rank.",
      officialWebsite: "http://www.sctce.ac.in/"
    },
    {
      id: "aj-college-tvm",
      name: "A.J. College of Science and Technology",
      location: { city: "Thiruvananthapuram", state: "Kerala" },
      type: "Private",
      feeRange: "Low",
      approxFee: "₹25,000 - ₹40,000 / year",
      coursesOffered: ["Arts", "Science", "Commerce", "Management"],
      admissionProcess: "Merit and Management quota admission.",
      officialWebsite: "http://www.ajcollege.in/"
    }
  ];

  const combinedColleges = [...existingColleges, ...newColleges];

  fs.writeFileSync(inputPath, JSON.stringify(combinedColleges, null, 2), 'utf-8');
  console.log(`Successfully added specific colleges. Total is now ${combinedColleges.length}.`);
}

run();
