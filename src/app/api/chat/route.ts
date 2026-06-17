import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Bypass local SSL certificate verification issues in development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Initialize the Gemini client. It will automatically pick up GEMINI_API_KEY from the environment.
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_ACTUAL_KEY_HERE") {
      return NextResponse.json(
        { error: "API Key not configured! Please open the .env.local file in your project folder, paste your real Gemini API key, and restart the dev server." },
        { status: 500 }
      );
    }

    // Format the conversation history for the prompt
    const historyText = messages.map((m: { role: string, content: string }) => `${m.role === 'user' ? 'Student' : 'Counselor'}: ${m.content}`).join('\n');
    
    const prompt = `You are a highly knowledgeable, empathetic, and professional career counselor for 12th-grade students in India. Your goal is to guide students regarding their stream choices (PCM, PCB, Commerce, Humanities), undergraduate courses (B.Tech, B.Com, B.A., MBBS, B.Des, etc.), and entrance exams (JEE, NEET, CUET, CLAT, NID DAT).
Keep your answers concise, encouraging, and highly informative.

Conversation History:
${historyText}

Counselor:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Attempt to extract a friendly error message
    let errorMsg = "An error occurred while communicating with the AI. Please try again.";
    if (error?.message) {
      if (error.message.includes("400") || error.message.includes("API_KEY_INVALID")) {
        errorMsg = "Your API Key appears to be invalid. Please check your .env.local file.";
      } else {
        errorMsg = `API Error: ${error.message}`;
      }
    }

    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
