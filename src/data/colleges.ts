export interface College {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  type: "Government" | "Private" | "Deemed";
  feeRange: "Low" | "Mid" | "High";
  approxFee: string;
  nirfRank?: number;
  coursesOffered: string[]; // E.g. "Engineering", "Management"
  admissionProcess: string;
  officialWebsite: string;
}

export const colleges: College[] = [
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology (IIT) Bombay",
    location: { city: "Mumbai", state: "Maharashtra" },
    type: "Government",
    feeRange: "Mid",
    approxFee: "₹2.2L - ₹2.5L / year",
    nirfRank: 3,
    coursesOffered: ["Engineering", "Design", "Science"],
    admissionProcess: "Admission through JEE Advanced followed by JoSAA counselling.",
    officialWebsite: "https://www.iitb.ac.in/"
  },
  {
    id: "bits-pilani",
    name: "Birla Institute of Technology and Science (BITS)",
    location: { city: "Pilani", state: "Rajasthan" },
    type: "Private",
    feeRange: "High",
    approxFee: "₹5L - ₹6L / year",
    coursesOffered: ["Engineering", "Pharmacy", "Science"],
    admissionProcess: "Admission through BITSAT score.",
    officialWebsite: "https://www.bits-pilani.ac.in/"
  },
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences (AIIMS)",
    location: { city: "New Delhi", state: "Delhi" },
    type: "Government",
    feeRange: "Low",
    approxFee: "₹1,628 / year",
    nirfRank: 1,
    coursesOffered: ["Medical", "Nursing", "Allied Health Sciences"],
    admissionProcess: "Admission through NEET-UG.",
    officialWebsite: "https://www.aiims.edu/"
  },
  {
    id: "srcc-delhi",
    name: "Shri Ram College of Commerce (SRCC)",
    location: { city: "New Delhi", state: "Delhi" },
    type: "Government",
    feeRange: "Low",
    approxFee: "₹30,000 / year",
    nirfRank: 11,
    coursesOffered: ["Commerce", "Economics"],
    admissionProcess: "Admission through CUET UG followed by CSAS portal allocation.",
    officialWebsite: "https://www.srcc.edu/"
  },
  {
    id: "nls-bangalore",
    name: "National Law School of India University (NLSIU)",
    location: { city: "Bengaluru", state: "Karnataka" },
    type: "Government",
    feeRange: "High",
    approxFee: "₹3.3L / year",
    nirfRank: 1,
    coursesOffered: ["Law"],
    admissionProcess: "Admission exclusively through CLAT.",
    officialWebsite: "https://www.nls.ac.in/"
  },
  {
    id: "nid-ahmedabad",
    name: "National Institute of Design (NID)",
    location: { city: "Ahmedabad", state: "Gujarat" },
    type: "Government",
    feeRange: "Mid",
    approxFee: "₹3.8L / year",
    coursesOffered: ["Design"],
    admissionProcess: "Admission through NID Design Aptitude Test (DAT) Prelims and Mains.",
    officialWebsite: "https://www.nid.edu/"
  },
  {
    id: "christ-university",
    name: "Christ University",
    location: { city: "Bengaluru", state: "Karnataka" },
    type: "Deemed",
    feeRange: "Mid",
    approxFee: "₹1.5L - ₹2.5L / year",
    coursesOffered: ["Commerce", "Management", "Arts", "Science", "Law"],
    admissionProcess: "CUET (Christ University Entrance Test) followed by Micro Presentation & Personal Interview.",
    officialWebsite: "https://christuniversity.in/"
  },
  {
    id: "vit-vellore",
    name: "Vellore Institute of Technology (VIT)",
    location: { city: "Vellore", state: "Tamil Nadu" },
    type: "Private",
    feeRange: "High",
    approxFee: "₹2L - ₹5L / year (depending on category)",
    nirfRank: 11,
    coursesOffered: ["Engineering", "Science", "Management"],
    admissionProcess: "Admission through VITEEE rank.",
    officialWebsite: "https://vit.ac.in/"
  },
  {
    id: "nift-delhi",
    name: "National Institute of Fashion Technology (NIFT)",
    location: { city: "New Delhi", state: "Delhi" },
    type: "Government",
    feeRange: "High",
    approxFee: "₹3L - ₹3.5L / year",
    coursesOffered: ["Design", "Fashion Technology"],
    admissionProcess: "Admission through NIFT Entrance Exam.",
    officialWebsite: "https://www.nift.ac.in/"
  },
  {
    id: "cmc-vellore",
    name: "Christian Medical College (CMC)",
    location: { city: "Vellore", state: "Tamil Nadu" },
    type: "Private",
    feeRange: "Low",
    approxFee: "₹50,000 / year",
    nirfRank: 3,
    coursesOffered: ["Medical", "Nursing", "Allied Health Sciences"],
    admissionProcess: "Admission through NEET-UG.",
    officialWebsite: "https://www.cmch-vellore.edu/"
  },
  {
    id: "iim-indore",
    name: "Indian Institute of Management (IIM) Indore - IPM",
    location: { city: "Indore", state: "Madhya Pradesh" },
    type: "Government",
    feeRange: "High",
    approxFee: "₹4L - ₹5L / year",
    nirfRank: 8,
    coursesOffered: ["Management", "Arts"],
    admissionProcess: "Admission through IPMAT (Integrated Programme in Management Aptitude Test).",
    officialWebsite: "https://www.iimidr.ac.in/"
  },
  {
    id: "jadavpur-university",
    name: "Jadavpur University",
    location: { city: "Kolkata", state: "West Bengal" },
    type: "Government",
    feeRange: "Low",
    approxFee: "₹2,500 - ₹10,000 / year",
    nirfRank: 4,
    coursesOffered: ["Engineering", "Arts", "Science"],
    admissionProcess: "Admission through WBJEE for Engineering, and merit/entrance for Arts/Science.",
    officialWebsite: "http://www.jaduniv.edu.in/"
  },
  {
    id: "symbiosis-pune",
    name: "Symbiosis International (Deemed University)",
    location: { city: "Pune", state: "Maharashtra" },
    type: "Deemed",
    feeRange: "High",
    approxFee: "₹3.5L - ₹4L / year",
    nirfRank: 32,
    coursesOffered: ["Management", "Law", "Media", "Computer Applications"],
    admissionProcess: "Admission through SET (Symbiosis Entrance Test), SLAT, or SITEEE.",
    officialWebsite: "https://siu.edu.in/"
  }
];

export function getAllColleges(): College[] {
  return colleges;
}
