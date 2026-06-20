import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Bypass local SSL certificate verification issues in development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { studentProfile, matches } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_ACTUAL_KEY_HERE") {
      return NextResponse.json(
        { error: "API Key not configured" },
        { status: 500 }
      );
    }

    const prompt = `You are an expert career counselor. A student has taken a career assessment and their answers indicate the following traits/preferences:
${studentProfile}

Based on a mathematical scoring matrix, the absolute best 4 courses for this student have ALREADY been determined. They are:
${matches.map((m: any, i: number) => `${i + 1}. ${m.title} (Category: ${m.category})`).join('\n')}

YOUR TASK:
For each of these exactly 4 courses, write a 1-2 sentence personalized explanation of why this course fits the student's profile, referencing their specific traits/preferences mentioned above. 
DO NOT suggest different courses. DO NOT rank them. ONLY explain the matches provided.

Return the result STRICTLY as a JSON array of objects with this format:
[
  {
    "title": "Course Name",
    "explanation": "Your personalized 1-2 sentence explanation here."
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
    console.error("Gemini Explanation API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanations" },
      { status: 500 }
    );
  }
}
