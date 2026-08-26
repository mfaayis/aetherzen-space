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

// We moved the massive 1.4MB array to public/data/colleges.json for performance!
export const colleges: College[] = [];
