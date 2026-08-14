import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Bypass local SSL certificate verification issues in development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { studentProfile } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_ACTUAL_KEY_HERE") {
      return NextResponse.json(
        { error: "API Key not configured" },
        { status: 500 }
      );
    }

    const prompt = `You are an expert career counselor in India. A student has completed a career assessment. Their exact answers are:

${studentProfile}

YOUR TASK:
Based ONLY on this profile, recommend the TOP 4 absolute best, REAL-WORLD courses/degrees available in India for this student. 

CRITICAL RULES:
- The courses MUST BE REAL and widely recognized (e.g. "B.Tech Computer Science", "B.A. Psychology", "B.Des Communication Design", "Chartered Accountancy"). Do NOT invent weird concatenated titles.
- Order them from best match to 4th best match.
- Provide a realistic match percentage (e.g., "98%", "95%", "92%", "88%"). Do not just give 100% or 10%.
- Keep the personalized description ('desc') to exactly 2-3 sentences, explaining WHY this course fits their specific answers.
- Return EXACTLY in this JSON array format, and nothing else:

[
  {
    "title": "Course Title",
    "matchPercentage": "95%",
    "desc": "Personalized explanation here...",
    "category": "Broad Category (e.g., Engineering, Arts, Business)",
    "exams": ["List", "Of", "Entrance", "Exams"],
    "duration": "e.g. 3 years, 4 years",
    "costRange": "e.g. ₹2L - ₹10L",
    "salaryRange": "e.g. ₹4L - ₹15L",
    "jobStats": "Steady demand",
    "coreSubjects": ["Subject 1", "Subject 2", "Subject 3"],
    "careerOutcomes": ["Role 1", "Role 2", "Role 3"]
  }
]
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error("Gemini Recommendation API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
