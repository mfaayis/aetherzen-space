export interface CourseTagProfile {
  title: string;
  category: string;
  streams: string[];
  tags: Record<string, number>;
  coreTags: string[];
  exams: string[];
}

export const courseTags: CourseTagProfile[] = [
  {
    title: "Mechanical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":5,"office":2,"math":4},
    coreTags: ["hands_on"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Automobile Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Civil Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":1,"math":4,"field":4},
    coreTags: ["hands_on","field"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Computer Science Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":6,"hands_on":2,"office":2,"math":4,"remote":3},
    coreTags: ["tech","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Artificial Intelligence and Machine Learning",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Electronics and Communication Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Electrical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Chemical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Aeronautical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Aerospace Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Marine Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Mechatronics Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Robotics Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Petroleum Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Biotechnology Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Mining Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Metallurgical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Industrial Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Production Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Environmental Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Agricultural Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Food Technology",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Nanotechnology",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "Biomedical Engineering",
    category: "Engineering and Technology",
    streams: ["pcm"],
    tags: {"analytical":4,"tech":3,"hands_on":2,"office":2,"math":4},
    coreTags: ["math","analytical"],
    exams: ["JEE Main","JEE Advanced","State CETs"]
  },
  {
    title: "MBBS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":6,"lab":5,"people_facing":3,"long_duration":5,"hands_on":2},
    coreTags: ["biology","long_duration"],
    exams: ["NEET UG"]
  },
  {
    title: "BDS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "BAMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "BHMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "BUMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "BSMS",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "BPT (Physiotherapy)",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "B.Sc Nursing",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "B.Pharm",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Pharm D",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Occupational Therapy",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Optometry",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Audiology and Speech Therapy",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Medical Laboratory Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Radiology and Imaging Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Operation Theatre Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Dialysis Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Cardiac Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Emergency Medical Technology",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "Nutrition and Dietetics",
    category: "Medical and Allied Health Sciences",
    streams: ["pcb"],
    tags: {"biology":5,"lab":4,"people_facing":3,"long_duration":3,"hands_on":2},
    coreTags: ["biology"],
    exams: ["NEET UG"]
  },
  {
    title: "B.Com",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "BBA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "BBM",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Bachelor of Economics",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Bachelor of Finance",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Banking and Insurance",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "International Business",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Retail Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Logistics and Supply Chain Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Financial Markets",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Investment Banking",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Hospital Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Hotel Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Event Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":1,"analytical":2,"people_facing":5,"math":1,"field":3,"creative":3},
    coreTags: ["people_facing","creative"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Sports Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Aviation Management",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Digital Business",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Chartered Accountancy (CA)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":5,"analytical":5,"people_facing":2,"math":4,"long_duration":4},
    coreTags: ["business","analytical","long_duration"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Company Secretary (CS)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "CMA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "CFA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "ACCA",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "Financial Risk Management (FRM)",
    category: "Commerce and Management",
    streams: ["commerce","humanities","pcm"],
    tags: {"business":5,"office":4,"analytical":2,"people_facing":2,"math":1},
    coreTags: ["business"],
    exams: ["CUET UG","CA Foundation","IPMAT"]
  },
  {
    title: "B.Sc Physics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Chemistry",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Mathematics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Statistics",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Computer Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Data Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Biotechnology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Microbiology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Zoology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Botany",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Geology",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Oceanography",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Environmental Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Forensic Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Agriculture",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "B.Sc Food Science",
    category: "Pure Science",
    streams: ["pcm","pcb"],
    tags: {"analytical":5,"lab":3,"tech":1,"math":2},
    coreTags: ["analytical"],
    exams: ["CUET UG","IISER Aptitude Test (IAT)","NEST"]
  },
  {
    title: "BCA",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Bachelor of Information Technology",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Software Engineering",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Data Science",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Artificial Intelligence",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Machine Learning",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Cybersecurity",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Ethical Hacking",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Cloud Computing",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Blockchain Technology",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Internet of Things (IoT)",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Game Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2,"creative":5,"studio":4},
    coreTags: ["tech","creative"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Mobile App Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "Full Stack Development",
    category: "Computer and IT Courses",
    streams: ["pcm","commerce"],
    tags: {"tech":5,"analytical":4,"remote":3,"office":2,"math":2},
    coreTags: ["tech"],
    exams: ["JEE Main","CUET UG","State CETs"]
  },
  {
    title: "BA LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"],
    exams: ["CLAT","AILET","LSAT India"]
  },
  {
    title: "BBA LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"],
    exams: ["CLAT","AILET","LSAT India"]
  },
  {
    title: "B.Com LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"],
    exams: ["CLAT","AILET","LSAT India"]
  },
  {
    title: "B.Sc LLB",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"],
    exams: ["CLAT","AILET","LSAT India"]
  },
  {
    title: "LLB (after graduation)",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"],
    exams: ["CLAT","AILET","LSAT India"]
  },
  {
    title: "Cyber Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"],
    exams: ["CLAT","AILET","LSAT India"]
  },
  {
    title: "Corporate Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"],
    exams: ["CLAT","AILET","LSAT India"]
  },
  {
    title: "International Law",
    category: "Law",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":3,"analytical":3,"people_facing":3,"office":3,"long_duration":2},
    coreTags: ["analytical","humanities"],
    exams: ["CLAT","AILET","LSAT India"]
  },
  {
    title: "Commercial Pilot License (CPL)",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"],
    exams: ["DGCA Exams","NDA (Air Force)"]
  },
  {
    title: "Aircraft Maintenance Engineering (AME)",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"],
    exams: ["DGCA Exams","NDA (Air Force)"]
  },
  {
    title: "Airport Management",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"],
    exams: ["DGCA Exams","NDA (Air Force)"]
  },
  {
    title: "Cabin Crew",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"],
    exams: ["DGCA Exams","NDA (Air Force)"]
  },
  {
    title: "Air Traffic Management",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"],
    exams: ["DGCA Exams","NDA (Air Force)"]
  },
  {
    title: "Aviation Hospitality",
    category: "Aviation",
    streams: ["pcm","commerce"],
    tags: {"field":4,"hands_on":3,"tech":2,"risk_tolerant":2},
    coreTags: ["hands_on"],
    exams: ["DGCA Exams","NDA (Air Force)"]
  },
  {
    title: "BA English",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA History",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Economics",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Political Science",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Sociology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Psychology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":5,"creative":2,"analytical":3},
    coreTags: ["people_facing","humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Philosophy",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Public Administration",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Journalism",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Mass Communication",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA International Relations",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Anthropology",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Geography",
    category: "Arts, Humanities and Social Sciences",
    streams: ["humanities","commerce","pcb"],
    tags: {"humanities":5,"people_facing":3,"creative":2,"analytical":2},
    coreTags: ["humanities"],
    exams: ["CUET UG","TISS BAT"]
  },
  {
    title: "BA Interior Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "B.Des Fashion Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "B.Des Graphic Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "B.Des Industrial Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "B.Des Product Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "Animation and VFX",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "Photography",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "Fine Arts (BFA)",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "Cinematography",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "Web Design",
    category: "Design and Creative Arts",
    streams: ["humanities","commerce","pcm"],
    tags: {"creative":5,"studio":4,"remote":2,"hands_on":2},
    coreTags: ["creative"],
    exams: ["NID DAT","UCEED","NIFT"]
  },
  {
    title: "B.Sc Hotel Management",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2},
    coreTags: ["people_facing"],
    exams: ["NCHMCT JEE","CUET UG"]
  },
  {
    title: "Bachelor of Tourism and Travel Management",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2},
    coreTags: ["people_facing"],
    exams: ["NCHMCT JEE","CUET UG"]
  },
  {
    title: "Culinary Arts",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2},
    coreTags: ["people_facing"],
    exams: ["NCHMCT JEE","CUET UG"]
  },
  {
    title: "Catering Technology",
    category: "Hospitality and Tourism",
    streams: ["humanities","commerce"],
    tags: {"people_facing":5,"hands_on":2,"field":2,"business":2},
    coreTags: ["people_facing"],
    exams: ["NCHMCT JEE","CUET UG"]
  },
  {
    title: "B.Sc Agriculture",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"],
    exams: ["ICAR AIEEA","CUET UG","State Agriculture CETs"]
  },
  {
    title: "B.Sc Forestry",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"],
    exams: ["ICAR AIEEA","CUET UG","State Agriculture CETs"]
  },
  {
    title: "B.Sc Horticulture",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"],
    exams: ["ICAR AIEEA","CUET UG","State Agriculture CETs"]
  },
  {
    title: "B.Sc Fisheries",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"],
    exams: ["ICAR AIEEA","CUET UG","State Agriculture CETs"]
  },
  {
    title: "Dairy Technology",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"],
    exams: ["ICAR AIEEA","CUET UG","State Agriculture CETs"]
  },
  {
    title: "Wildlife Management",
    category: "Agriculture and Environment",
    streams: ["pcb","pcm"],
    tags: {"field":4,"biology":3,"lab":2,"hands_on":2},
    coreTags: ["field"],
    exams: ["ICAR AIEEA","CUET UG","State Agriculture CETs"]
  },
  {
    title: "National Defence Academy (NDA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"],
    exams: ["NDA","CDS","AFCAT"]
  },
  {
    title: "Indian Naval Academy (INA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"],
    exams: ["NDA","CDS","AFCAT"]
  },
  {
    title: "Indian Military Academy (IMA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"],
    exams: ["NDA","CDS","AFCAT"]
  },
  {
    title: "Air Force Academy (AFA)",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"],
    exams: ["NDA","CDS","AFCAT"]
  },
  {
    title: "Merchant Navy",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"],
    exams: ["NDA","CDS","AFCAT"]
  },
  {
    title: "Coast Guard",
    category: "Defence and Uniform Services",
    streams: ["pcm","pcb","humanities"],
    tags: {"field":5,"hands_on":4,"risk_tolerant":3,"people_facing":2},
    coreTags: ["field","hands_on"],
    exams: ["NDA","CDS","AFCAT"]
  },
  {
    title: "Diploma in Engineering (Polytechnic)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2},
    coreTags: ["short_duration"],
    exams: ["State Polytechnic Entrance Exams"]
  },
  {
    title: "Diploma in Pharmacy (D.Pharm)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2},
    coreTags: ["short_duration"],
    exams: ["State Polytechnic Entrance Exams"]
  },
  {
    title: "Diploma in Nursing",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2},
    coreTags: ["short_duration"],
    exams: ["State Polytechnic Entrance Exams"]
  },
  {
    title: "Diploma in Education (D.Ed)",
    category: "Diploma Courses",
    streams: ["pcm","commerce","humanities","pcb"],
    tags: {"short_duration":5,"hands_on":4,"tech":2},
    coreTags: ["short_duration"],
    exams: ["State Polytechnic Entrance Exams"]
  },
  {
    title: "BA French",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"],
    exams: ["CUET UG"]
  },
  {
    title: "BA German",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"],
    exams: ["CUET UG"]
  },
  {
    title: "BA Spanish",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"],
    exams: ["CUET UG"]
  },
  {
    title: "BA Japanese",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"],
    exams: ["CUET UG"]
  },
  {
    title: "BA Mandarin",
    category: "Foreign Language Courses",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"humanities":4,"people_facing":3,"remote":2},
    coreTags: ["humanities"],
    exams: ["CUET UG"]
  },
  {
    title: "Digital Marketing",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: [],
    exams: ["Portfolio/Direct Admission"]
  },
  {
    title: "UI/UX Design",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: [],
    exams: ["Portfolio/Direct Admission"]
  },
  {
    title: "Video Editing and Animation",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: [],
    exams: ["Portfolio/Direct Admission"]
  },
  {
    title: "Data Analytics",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: [],
    exams: ["Portfolio/Direct Admission"]
  },
  {
    title: "Content Writing",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: [],
    exams: ["Portfolio/Direct Admission"]
  },
  {
    title: "Sound Engineering",
    category: "Modern Skill-Based Courses",
    streams: ["commerce","humanities","pcm"],
    tags: {"creative":3,"tech":3,"remote":5,"short_duration":4,"risk_tolerant":3},
    coreTags: [],
    exams: ["Portfolio/Direct Admission"]
  },
  {
    title: "UPSC Civil Services",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"],
    exams: ["UPSC CSE","SSC CGL","Bank PO"]
  },
  {
    title: "State PSC",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"],
    exams: ["UPSC CSE","SSC CGL","Bank PO"]
  },
  {
    title: "SSC CGL",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"],
    exams: ["UPSC CSE","SSC CGL","Bank PO"]
  },
  {
    title: "Banking (IBPS/SBI)",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"],
    exams: ["UPSC CSE","SSC CGL","Bank PO"]
  },
  {
    title: "Railway Recruitment Board (RRB)",
    category: "Government Career Preparation",
    streams: ["humanities","commerce","pcm","pcb"],
    tags: {"risk_averse":5,"office":4,"analytical":3,"long_duration":3},
    coreTags: ["risk_averse","office"],
    exams: ["UPSC CSE","SSC CGL","Bank PO"]
  },
];
