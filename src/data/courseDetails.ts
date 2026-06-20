export interface CourseDetail {
  id: string;
  slug: string;
  name: string;
  category: string;
  duration: string;
  description: string;
  eligibility: {
    stream: string;
    minimumMarks: string;
    details: string;
  };
  salary: {
    startingLPA: string;
    midCareerLPA: string;
  };
  careerScope: string[];
  topRecruiters: string[];
  higherStudyOptions: string[];
  isRightForYou: string;
  relatedCourses: string[]; // Slugs of related courses
}

export const courseDetails: CourseDetail[] = [
  {
    id: "btech-cse",
    slug: "btech-computer-science",
    name: "B.Tech in Computer Science",
    category: "Engineering",
    duration: "4 Years",
    description: "A comprehensive undergraduate program focusing on computer programming, algorithms, software development, and computing theory.",
    eligibility: {
      stream: "Science (PCM)",
      minimumMarks: "75% aggregate in 12th Board",
      details: "Must qualify JEE Main (and JEE Advanced for IITs) or state-level engineering entrances."
    },
    salary: {
      startingLPA: "₹6L - ₹15L",
      midCareerLPA: "₹18L - ₹40L+"
    },
    careerScope: ["Software Engineer", "Data Scientist", "System Analyst", "Cybersecurity Expert", "Cloud Architect"],
    topRecruiters: ["TCS", "Infosys", "Google", "Microsoft", "Amazon", "Wipro", "Atlassian"],
    higherStudyOptions: ["M.Tech in CS/AI", "MS in Computer Science (Abroad)", "MBA"],
    isRightForYou: "If you love logical problem solving, have an aptitude for mathematics, and enjoy sitting in front of a computer building digital solutions, this is the perfect course for you.",
    relatedCourses: ["bca", "btech-electronics"]
  },
  {
    id: "mbbs",
    slug: "mbbs",
    name: "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
    category: "Medical",
    duration: "5.5 Years (includes 1 year internship)",
    description: "The foundational professional degree in medical science to become a certified doctor in India.",
    eligibility: {
      stream: "Science (PCB)",
      minimumMarks: "50% aggregate in 12th Board (UR)",
      details: "Must qualify NEET-UG entrance examination."
    },
    salary: {
      startingLPA: "₹8L - ₹12L",
      midCareerLPA: "₹15L - ₹35L+"
    },
    careerScope: ["General Physician", "Surgeon", "Medical Researcher", "Healthcare Administrator"],
    topRecruiters: ["Apollo Hospitals", "Fortis Healthcare", "AIIMS", "Max Healthcare", "Government Hospitals"],
    higherStudyOptions: ["MD (Doctor of Medicine)", "MS (Master of Surgery)", "Fellowships"],
    isRightForYou: "If you are highly empathetic, resilient under pressure, and ready for lifelong intense study to save and improve human lives.",
    relatedCourses: ["bds", "bams"]
  },
  {
    id: "bcom-hons",
    slug: "bcom-honours",
    name: "B.Com (Honours)",
    category: "Commerce",
    duration: "3 or 4 Years",
    description: "An advanced commerce degree focusing deeply on accounting, taxation, economics, and corporate finance.",
    eligibility: {
      stream: "Commerce or Science with Mathematics",
      minimumMarks: "50% - 60% aggregate depending on University",
      details: "CUET UG required for Central Universities like DU. Mathematics often required for Honours."
    },
    salary: {
      startingLPA: "₹4L - ₹8L",
      midCareerLPA: "₹10L - ₹25L+"
    },
    careerScope: ["Accountant", "Financial Analyst", "Tax Consultant", "Investment Banker", "Auditor"],
    topRecruiters: ["Deloitte", "EY", "KPMG", "PwC", "HDFC Bank", "ICICI Bank", "Goldman Sachs"],
    higherStudyOptions: ["CA (Chartered Accountancy)", "MBA in Finance", "M.Com", "CFA"],
    isRightForYou: "Ideal if you have a strong affinity for numbers, business structures, and financial markets, and want a stable corporate career.",
    relatedCourses: ["bba", "ba-economics"]
  },
  {
    id: "ba-llb",
    slug: "ba-llb",
    name: "BA LLB (Integrated Law)",
    category: "Law",
    duration: "5 Years",
    description: "An integrated dual degree combining liberal arts (BA) with legal studies (LLB).",
    eligibility: {
      stream: "Any Stream",
      minimumMarks: "45% aggregate in 12th Board",
      details: "Must qualify CLAT (for NLUs), AILET, or LSAT India."
    },
    salary: {
      startingLPA: "₹5L - ₹16L",
      midCareerLPA: "₹20L - ₹50L+"
    },
    careerScope: ["Corporate Lawyer", "Litigator", "Legal Advisor", "Judge", "Public Prosecutor"],
    topRecruiters: ["Cyril Amarchand Mangaldas", "Khaitan & Co", "AZB & Partners", "Trilegal", "Luthra & Luthra"],
    higherStudyOptions: ["LLM", "UPSC (Civil Services)"],
    isRightForYou: "Perfect if you have strong reading comprehension, excellent debating skills, and a passion for justice or corporate negotiations.",
    relatedCourses: ["bba-llb"]
  },
  {
    id: "bdes",
    slug: "bachelor-of-design",
    name: "Bachelor of Design (B.Des)",
    category: "Design",
    duration: "4 Years",
    description: "A professional degree focusing on UI/UX, product design, fashion, or visual communication.",
    eligibility: {
      stream: "Any Stream",
      minimumMarks: "50% aggregate in 12th Board",
      details: "Must qualify UCEED, NID DAT, or NIFT Entrance."
    },
    salary: {
      startingLPA: "₹6L - ₹14L",
      midCareerLPA: "₹15L - ₹35L+"
    },
    careerScope: ["UI/UX Designer", "Product Designer", "Fashion Designer", "Graphic Designer"],
    topRecruiters: ["Google", "Microsoft", "Flipkart", "Zomato", "TCS Design", "Razorpay"],
    higherStudyOptions: ["M.Des", "MBA", "Masters in HCI"],
    isRightForYou: "If you have a strong aesthetic sense, creativity, and love solving user problems through intuitive visual interfaces or products.",
    relatedCourses: ["barch"]
  }
];

export function getCourseBySlug(slug: string): CourseDetail | undefined {
  return courseDetails.find(c => c.slug === slug);
}

export function getAllCourses(): CourseDetail[] {
  return courseDetails;
}

export function getRelatedCourses(slugs: string[]): CourseDetail[] {
  return courseDetails.filter(c => slugs.includes(c.slug));
}
