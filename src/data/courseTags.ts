export interface CourseTagProfile {
  title: string;
  category: string;
  streams: string[];
  tags: Record<string, number>;
  coreTags: string[];
}

export const courseTags: CourseTagProfile[] = [
  {
    title: "Mechanical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":5,"office":2,"math":4},
    coreTags: ["hands_on"]
  },
  {
    title: "Automobile Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Civil Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":1,"math":4,"field":4},
    coreTags: ["hands_on","field"]
  },
  {
    title: "Computer Science Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":6,"hands_on":2,"office":2,"math":4,"remote":3},
    coreTags: ["tech","analytical"]
  },
  {
    title: "Artificial Intelligence and Machine Learning",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Electronics and Communication Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Electrical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Chemical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Aeronautical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Aerospace Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Marine Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Mechatronics Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Robotics Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Petroleum Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Biotechnology Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Mining Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Metallurgical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Industrial Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Production Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Environmental Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Agricultural Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Food Technology",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Nanotechnology",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "Biomedical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"]
  },
  {
    title: "MBBS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":6,"lab":5,"people_facing":3,"long_duration":5,"hands_on":2},
    coreTags: ["biology","long_duration"]
  },
  {
    title: "BDS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "BAMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "BHMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "BUMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "BSMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "BPT (Physiotherapy)",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "B.Sc Nursing",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "B.Pharm",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Pharm D",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Occupational Therapy",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Optometry",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Audiology and Speech Therapy",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Medical Laboratory Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Radiology and Imaging Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Operation Theatre Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Dialysis Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Cardiac Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Emergency Medical Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "Nutrition and Dietetics",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"]
  },
  {
    title: "B.Com",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "BBA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "BBM",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Bachelor of Economics",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Bachelor of Finance",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Banking and Insurance",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "International Business",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Retail Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Logistics and Supply Chain Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Financial Markets",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Investment Banking",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Hospital Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Hotel Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Event Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":1,"analytical":2,"people_facing":5,"math":1,"field":3,"creative":3},
    coreTags: ["people_facing","creative"]
  },
  {
    title: "Sports Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Aviation Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Digital Business",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Chartered Accountancy (CA)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":5,"analytical":5,"people_facing":2,"math":4,"long_duration":4},
    coreTags: ["business","analytical","long_duration"]
  },
  {
    title: "Company Secretary (CS)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "CMA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "CFA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "ACCA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "Financial Risk Management (FRM)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"]
  },
  {
    title: "B.Sc Physics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Chemistry",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Mathematics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Statistics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Computer Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Data Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Biotechnology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Microbiology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Zoology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Botany",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Geology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Oceanography",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Environmental Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Forensic Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Agriculture",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "B.Sc Food Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"]
  },
  {
    title: "BCA",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Bachelor of Information Technology",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Software Engineering",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Data Science",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Artificial Intelligence",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Machine Learning",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Cybersecurity",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Ethical Hacking",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Cloud Computing",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Blockchain Technology",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Internet of Things (IoT)",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Game Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2,"creative":5,"studio":4},
    coreTags: ["tech","creative"]
  },
  {
    title: "Mobile App Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "Full Stack Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"]
  },
  {
    title: "BA LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"]
  },
  {
    title: "BBA LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"]
  },
  {
    title: "B.Com LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"]
  },
  {
    title: "B.Sc LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"]
  },
  {
    title: "LLB (after graduation)",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"]
  },
  {
    title: "Cyber Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"]
  },
  {
    title: "Corporate Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"]
  },
  {
    title: "International Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"]
  },
  {
    title: "Commercial Pilot License (CPL)",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"]
  },
  {
    title: "Aircraft Maintenance Engineering (AME)",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"]
  },
  {
    title: "Airport Management",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"]
  },
  {
    title: "Cabin Crew",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"]
  },
  {
    title: "Air Traffic Management",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"]
  },
  {
    title: "Aviation Hospitality",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"]
  },
  {
    title: "BA English",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA History",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Economics",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Political Science",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Sociology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Psychology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":5,"creative":2,"analytical":3},
    coreTags: ["people_facing","humanities"]
  },
  {
    title: "BA Philosophy",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Public Administration",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Journalism",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Mass Communication",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA International Relations",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Anthropology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Geography",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Interior Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "B.Des Fashion Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "B.Des Graphic Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "B.Des Industrial Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "B.Des Product Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "Animation and VFX",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "Photography",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "Fine Arts (BFA)",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "Cinematography",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "Web Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"]
  },
  {
    title: "B.Sc Hotel Management",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2},
    coreTags: ["people_facing"]
  },
  {
    title: "Bachelor of Tourism and Travel Management",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2},
    coreTags: ["people_facing"]
  },
  {
    title: "Culinary Arts",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2},
    coreTags: ["people_facing"]
  },
  {
    title: "Catering Technology",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2},
    coreTags: ["people_facing"]
  },
  {
    title: "B.Sc Agriculture",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"]
  },
  {
    title: "B.Sc Forestry",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"]
  },
  {
    title: "B.Sc Horticulture",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"]
  },
  {
    title: "B.Sc Fisheries",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"]
  },
  {
    title: "Dairy Technology",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"]
  },
  {
    title: "Wildlife Management",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"]
  },
  {
    title: "National Defence Academy (NDA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"]
  },
  {
    title: "Indian Naval Academy (INA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"]
  },
  {
    title: "Indian Military Academy (IMA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"]
  },
  {
    title: "Air Force Academy (AFA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"]
  },
  {
    title: "Merchant Navy",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"]
  },
  {
    title: "Coast Guard",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"]
  },
  {
    title: "Diploma in Engineering (Polytechnic)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2},
    coreTags: ["short_duration"]
  },
  {
    title: "Diploma in Pharmacy (D.Pharm)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2},
    coreTags: ["short_duration"]
  },
  {
    title: "Diploma in Nursing",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2},
    coreTags: ["short_duration"]
  },
  {
    title: "Diploma in Education (D.Ed)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2},
    coreTags: ["short_duration"]
  },
  {
    title: "BA French",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA German",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Spanish",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Japanese",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"]
  },
  {
    title: "BA Mandarin",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"]
  },
  {
    title: "Digital Marketing",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: []
  },
  {
    title: "UI/UX Design",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: []
  },
  {
    title: "Video Editing and Animation",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: []
  },
  {
    title: "Data Analytics",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: []
  },
  {
    title: "Content Writing",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: []
  },
  {
    title: "Sound Engineering",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: []
  },
  {
    title: "UPSC Civil Services",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"]
  },
  {
    title: "State PSC",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"]
  },
  {
    title: "SSC CGL",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"]
  },
  {
    title: "Banking (IBPS/SBI)",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"]
  },
  {
    title: "Railway Recruitment Board (RRB)",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"]
  },
];
