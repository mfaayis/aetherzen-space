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
Write a 2-3 sentence personalized explanation for EACH course explaining specifically why it fits this student's profile. Reference their exact interests, working style, and motivations from the profile above.

RULES:
- Be direct and specific — mention the student's actual traits (e.g., "your interest in Biology", "your preference for hands-on work")
- Do NOT use vague phrases like "aligns well" or "is a good fit" without explaining why
- Do NOT use caveats like "even though", "despite", "although" — if you feel the need to, the match is poor and you should state plainly what aspects align and what to be aware of
- Keep each explanation to 2-3 sentences max

Return STRICTLY as a JSON array:
[
  {
    "title": "Exact Course Name Here",
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
