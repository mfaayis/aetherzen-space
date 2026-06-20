export interface CourseTagProfile {
  title: string;
  category: string;
  streams: string[];
  tags: Record<string, number>;
}

export const courseTags: CourseTagProfile[] = [
  {
    title: "Mechanical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":5,"office":2,"math":4}
  },
  {
    title: "Automobile Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Civil Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":1,"math":4,"field":4}
  },
  {
    title: "Computer Science Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":6,"hands_on":2,"office":2,"math":4,"remote":3}
  },
  {
    title: "Artificial Intelligence and Machine Learning",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Electronics and Communication Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Electrical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Chemical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Aeronautical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Aerospace Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Marine Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Mechatronics Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Robotics Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Petroleum Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Biotechnology Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Mining Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Metallurgical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Industrial Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Production Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Environmental Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Agricultural Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Food Technology",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Nanotechnology",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "Biomedical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4}
  },
  {
    title: "MBBS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":6,"lab":5,"people_facing":3,"long_duration":5,"hands_on":2}
  },
  {
    title: "BDS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "BAMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "BHMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "BUMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "BSMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "BPT (Physiotherapy)",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "B.Sc Nursing",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "B.Pharm",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Pharm D",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Occupational Therapy",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Optometry",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Audiology and Speech Therapy",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Medical Laboratory Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Radiology and Imaging Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Operation Theatre Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Dialysis Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Cardiac Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Emergency Medical Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "Nutrition and Dietetics",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2}
  },
  {
    title: "B.Com",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "BBA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "BBM",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Bachelor of Economics",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Bachelor of Finance",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Banking and Insurance",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "International Business",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Retail Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Logistics and Supply Chain Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Financial Markets",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Investment Banking",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Hospital Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Hotel Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Event Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":1,"analytical":2,"people_facing":5,"math":1,"field":3,"creative":3}
  },
  {
    title: "Sports Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Aviation Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Digital Business",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Chartered Accountancy (CA)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":5,"analytical":5,"people_facing":2,"math":4,"long_duration":4}
  },
  {
    title: "Company Secretary (CS)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "CMA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "CFA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "ACCA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "Financial Risk Management (FRM)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1}
  },
  {
    title: "B.Sc Physics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Chemistry",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Mathematics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Statistics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Computer Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Data Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Biotechnology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Microbiology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Zoology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Botany",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Geology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Oceanography",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Environmental Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Forensic Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Agriculture",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "B.Sc Food Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2}
  },
  {
    title: "BCA",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Bachelor of Information Technology",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Software Engineering",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Data Science",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Artificial Intelligence",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Machine Learning",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Cybersecurity",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Ethical Hacking",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Cloud Computing",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Blockchain Technology",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Internet of Things (IoT)",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Game Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2,"creative":5,"studio":4}
  },
  {
    title: "Mobile App Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "Full Stack Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2}
  },
  {
    title: "BA LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2}
  },
  {
    title: "BBA LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2}
  },
  {
    title: "B.Com LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2}
  },
  {
    title: "B.Sc LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2}
  },
  {
    title: "LLB (after graduation)",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2}
  },
  {
    title: "Cyber Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2}
  },
  {
    title: "Corporate Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2}
  },
  {
    title: "International Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2}
  },
  {
    title: "Commercial Pilot License (CPL)",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2}
  },
  {
    title: "Aircraft Maintenance Engineering (AME)",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2}
  },
  {
    title: "Airport Management",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2}
  },
  {
    title: "Cabin Crew",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2}
  },
  {
    title: "Air Traffic Management",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2}
  },
  {
    title: "Aviation Hospitality",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2}
  },
  {
    title: "BA English",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA History",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Economics",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Political Science",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Sociology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Psychology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":5,"creative":2,"analytical":3}
  },
  {
    title: "BA Philosophy",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Public Administration",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Journalism",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Mass Communication",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA International Relations",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Anthropology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Geography",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2}
  },
  {
    title: "BA Interior Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "B.Des Fashion Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "B.Des Graphic Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "B.Des Industrial Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "B.Des Product Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "Animation and VFX",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "Photography",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "Fine Arts (BFA)",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "Cinematography",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "Web Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2}
  },
  {
    title: "B.Sc Hotel Management",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2}
  },
  {
    title: "Bachelor of Tourism and Travel Management",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2}
  },
  {
    title: "Culinary Arts",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2}
  },
  {
    title: "Catering Technology",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2}
  },
  {
    title: "B.Sc Agriculture",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2}
  },
  {
    title: "B.Sc Forestry",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2}
  },
  {
    title: "B.Sc Horticulture",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2}
  },
  {
    title: "B.Sc Fisheries",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2}
  },
  {
    title: "Dairy Technology",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2}
  },
  {
    title: "Wildlife Management",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2}
  },
  {
    title: "National Defence Academy (NDA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2}
  },
  {
    title: "Indian Naval Academy (INA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2}
  },
  {
    title: "Indian Military Academy (IMA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2}
  },
  {
    title: "Air Force Academy (AFA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2}
  },
  {
    title: "Merchant Navy",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2}
  },
  {
    title: "Coast Guard",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2}
  },
  {
    title: "Diploma in Engineering (Polytechnic)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2}
  },
  {
    title: "Diploma in Pharmacy (D.Pharm)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2}
  },
  {
    title: "Diploma in Nursing",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2}
  },
  {
    title: "Diploma in Education (D.Ed)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2}
  },
  {
    title: "BA French",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2}
  },
  {
    title: "BA German",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2}
  },
  {
    title: "BA Spanish",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2}
  },
  {
    title: "BA Japanese",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2}
  },
  {
    title: "BA Mandarin",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2}
  },
  {
    title: "Digital Marketing",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3}
  },
  {
    title: "UI/UX Design",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3}
  },
  {
    title: "Video Editing and Animation",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3}
  },
  {
    title: "Data Analytics",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3}
  },
  {
    title: "Content Writing",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3}
  },
  {
    title: "Sound Engineering",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3}
  },
  {
    title: "UPSC Civil Services",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3}
  },
  {
    title: "State PSC",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3}
  },
  {
    title: "SSC CGL",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3}
  },
  {
    title: "Banking (IBPS/SBI)",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3}
  },
  {
    title: "Railway Recruitment Board (RRB)",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3}
  },
];
