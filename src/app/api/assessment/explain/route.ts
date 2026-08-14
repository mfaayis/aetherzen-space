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

    const prompt = `You are an expert career counselor in India. A student has completed a career assessment. Their profile is:

${studentProfile}

A mathematical scoring algorithm has identified the best 4 courses for this student. Here they are with their match scores:
${matches.map((m: any, i: number) => `${i + 1}. ${m.title} (Category: ${m.category}, Match: ${m.matchPercentage})`).join('\n')}

YOUR TASK:
1. Write a 2-3 sentence personalized explanation for EACH course explaining specifically why it fits this student's profile. Reference their exact interests, working style, and motivations from the profile above.
2. If the original course title looks like a weird concatenation or grammatically incorrect (e.g., "B.Com in BA Political Science", "B.Sc in BA Journalism & Digital Humanities", "Diploma in BA Economics"), CORRECT IT to a realistic, standard Indian course name (e.g., "B.A. Political Science", "B.A. Journalism & Digital Humanities", "Diploma in Economics"). Ensure the degree makes sense.

RULES:
- Be direct and specific — mention the student's actual traits.
- Do NOT use vague phrases like "aligns well" or "is a good fit" without explaining why.
- Keep each explanation to 2-3 sentences max.

Return STRICTLY as a JSON array (ensure the array maintains the exact 1 to 4 order):
[
  {
    "id": 1,
    "title": "Clean, Corrected Course Name Here",
    "explanation": "Your 2-3 sentence explanation here."
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
