import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Bypass local SSL certificate verification issues in development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ai = new GoogleGenAI({});

/**
 * POST /api/assessment/recommend
 *
 * Role change: This endpoint NO LONGER calculates match percentages or
 * generates recommendations. All scoring is done client-side by assessmentEngine.ts.
 *
 * This endpoint ONLY enriches the written description for each pre-scored result.
 * If the API key is unavailable or the call fails, the client uses auto-generated
 * descriptions and the assessment still works fully.
 *
 * Request body:
 *   { results: Array<{ title: string; matchPercentage: string; whyItFits: string[]; careerPaths: string[] }> }
 *
 * Response body:
 *   { enriched: Array<{ title: string; desc: string }> }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { results } = body;

    if (!Array.isArray(results) || results.length === 0) {
      return NextResponse.json({ enriched: [] });
    }

    if (
      !process.env.GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY === "YOUR_ACTUAL_KEY_HERE"
    ) {
      // Gracefully skip enrichment — client descriptions will be used instead
      return NextResponse.json({ enriched: [] });
    }

    const summaries = results
      .map(
        (r: { title: string; matchPercentage: string; whyItFits: string[]; careerPaths: string[] }, i: number) =>
          `${i + 1}. ${r.title} (${r.matchPercentage} match)\n` +
          `   Why it fits: ${r.whyItFits?.join("; ") || "N/A"}\n` +
          `   Career paths: ${r.careerPaths?.slice(0, 3).join(", ") || "N/A"}`
      )
      .join("\n\n");

    const prompt = `You are a career guidance writer. For each course below, write a single clear, factual, 2-sentence description explaining what studying this course leads to professionally. Do NOT invent or exaggerate. Do NOT mention match percentages or scores. Use neutral, evidence-based language.

Courses to describe:

${summaries}

Return ONLY a JSON array in this exact format — no markdown, no extra text:
[
  { "title": "exact course title from above", "desc": "2-sentence description." }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let enriched: { title: string; desc: string }[] = [];
    try {
      enriched = JSON.parse(response.text ?? "[]");
    } catch {
      // Malformed response — client uses fallback descriptions
      enriched = [];
    }

    return NextResponse.json({ enriched });
  } catch (error) {
    console.error("Gemini enrichment API error:", error);
    // Non-fatal — client uses auto-generated descriptions
    return NextResponse.json({ enriched: [] });
  }
}
