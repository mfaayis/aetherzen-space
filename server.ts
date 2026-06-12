import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up Gemini AI Client
const apiKey = process.env.GEMINI_API_KEY;
const isKeyValid = !!(apiKey && apiKey.trim().length > 0 && apiKey !== "TODO" && apiKey.toLowerCase() !== "undefined");

const ai = new GoogleGenAI({
  apiKey: isKeyValid ? apiKey : "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.use(express.json());

// Smart offline/error fallback recommendation generator
function getSmartFallback(stream: string, aggregateMarks: string, primaryInterests: string[], preferredOutcome: string, budgetTier: string, locationPref: string) {
  let recommendedStream = "";
  let execSummary = "";
  let courses: any[] = [];
  let recommendedExamsToTake: string[] = [];
  let timeline: any[] = [];
  let preparationTips: string[] = [];

  const interestsStr = primaryInterests && primaryInterests.length > 0 ? primaryInterests.join(", ") : "professional specialization";

  if (stream === "pcm") {
    recommendedStream = "Engineering & Mathematical Sciences";
    execSummary = `With your core background in Physics, Chemistry, and Mathematics (aggregate: ${aggregateMarks}) and interest in ${interestsStr}, a dynamic technology pathway is highly aligned with your future goals. This setup prepares you exceptionally for a specialized ${preferredOutcome} outcome.`;
    
    courses = [
      {
        courseName: "B.Tech in Computer Science & Engineering (AI / Data Science focus)",
        duration: "4 Years",
        suitabilityRationale: `Directly matches your interest in ${interestsStr}. Highly sought after for premium domestic placements and corporate expansion.`,
        idealForStrengths: "Quantitative problem solving, mathematical reasoning, software logic.",
        admissionRoute: "JEE Main & Advanced, BITSAT, State Engineering Entrance exams"
      },
      {
        courseName: "B.Sc (Hons.) in Physics or Applied Mathematics & Stats",
        duration: "3-4 Years",
        suitabilityRationale: "Excellent alternative focusing heavily on numerical modeling, research foundations, or higher academic tracks.",
        idealForStrengths: "Analytical inquiry, abstract computation, scientific methodology.",
        admissionRoute: "CUET-UG, Joint Admission test for M.Sc"
      }
    ];

    recommendedExamsToTake = ["JEE Main", "BITSAT", "CUET-UG", "VITEEE"];
    
    timeline = [
      {
        phase: "Immediate (Next 2 Months)",
        focusArea: "Online Admissions & Form Submissions",
        actionItems: [
          "Check JoSAA counseling manuals and make sure category certificates are updated.",
          "Register for CUET-UG and selective state entrance exams."
        ]
      },
      {
        phase: "Mid-term (Next 6-12 Months)",
        focusArea: "Preparation Strategies & Mock Testing",
        actionItems: [
          "Solve previous 10 years of JEE Main question banks under strict time limits.",
          "Perfect high-weightage topics like Calculus, Mechanics, and Organic Chemistry."
        ]
      }
    ];

    preparationTips = [
      "Review NCERT concepts systematically as they form the primary syllabus baseline.",
      "Track mistakes carefully in an error journal to constantly fine-tune accuracy.",
      "Work on selective question solving to handle negative marking gracefully."
    ];
  } else if (stream === "pcb") {
    recommendedStream = "Medical, Clinical & Life Sciences";
    execSummary = `Your strong core in Biology and Allied Sciences coupled with an aggregate of ${aggregateMarks} matches direct medical professions. Combined with your enthusiasm in ${interestsStr}, you are primed for medical discovery or clinical work.`;

    courses = [
      {
        courseName: "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
        duration: "5.5 Years (including internship)",
        suitabilityRationale: "The traditional golden standard for medicine practitioners in India. Demands supreme memorization and clinical empathy.",
        idealForStrengths: "Medical diagnosis, logical elimination of symptoms, high rote memorization.",
        admissionRoute: "NEET-UG National Merit entrance exam"
      },
      {
        courseName: "B.Sc (Hons) in Medical Biotechnology or Genetics",
        duration: "3-4 Years",
        suitabilityRationale: "Outstanding corporate non-clinical alternative focusing heavily on vaccine therapeutics, biomedical instruments, and pharmaceuticals.",
        idealForStrengths: "Laboratory techniques, molecular modeling, gene sequencing studies.",
        admissionRoute: "CUET-UG, Institutional Exams"
      }
    ];

    recommendedExamsToTake = ["NEET-UG", "CUET-UG", "AIIMS Allied Sciences"];

    timeline = [
      {
        phase: "Immediate (Next 2 Months)",
        focusArea: "NEET/CUET Registration and Verification",
        actionItems: [
          "Track NEET-UG registration notifications and upload required photographs.",
          "Complete optional state counseling forms for Allied Nursing or Biotech seats."
        ]
      }
    ];

    preparationTips = [
      "NCERT textbooks for Biology must be fully mastered, including side-diagrams and captions.",
      "Schedule physical training or stress management routines; exams demand extreme endurance."
    ];
  } else if (stream === "commerce") {
    recommendedStream = "Management, Commerce & Corporate Business Finance";
    execSummary = `Your strong financial and economic foundations match perfectly with specialized corporate counseling, banking, and strategic advisory. Your interest in ${interestsStr} matches a highly lucrative corporate profile.`;

    courses = [
      {
        courseName: "B.Com (Hons.) in Finance, Corporate Analytics & Accountancy",
        duration: "3-4 Years",
        suitabilityRationale: "Ideal for entering Chartered Accountancy (CA), Company Secretary (CS), or global MBA pathways.",
        idealForStrengths: "Double-entry accounting, taxation principles, commercial audit controls.",
        admissionRoute: "CUET-UG and Class 12 Merit criteria"
      },
      {
        courseName: "Integrated Program in Management (IPM - BBA+MBA)",
        duration: "5 Years",
        suitabilityRationale: "Elite fast-track to prestigious Indian Institutes of Management (IIMs) without experiencing the high CAT pressure later.",
        idealForStrengths: "Executive communication, logical data interpretation, general business aptitude.",
        admissionRoute: "IPMAT (IIM Indore/Rohtak), JIPMAT"
      }
    ];

    recommendedExamsToTake = ["CUET-UG", "IPMAT", "NPAT", "SET Exam"];

    timeline = [
      {
        phase: "Immediate (Next 2 Months)",
        focusArea: "Admissions Submission & Board Consolidation",
        actionItems: [
          "Apply for the IPMAT exam via the official IIM Indore registration portal.",
          "Register for CUET selecting Accountancy, Business Studies, Economics, and General Test."
        ]
      }
    ];

    preparationTips = [
      "Build consistent habits of speed calculating to maximize quantitative analytics speed.",
      "Keep standard business newspapers like Economic Times handy to excel at group parameters."
    ];
  } else {
    // arts or other
    recommendedStream = "Liberal Arts, Legal Studies & Design Sciences";
    execSummary = `A stellar creative or analytical career path matches your humanities background and interests. With specialized courses, this leads safely to outcomes like government examinations, media, design, or law.`;

    courses = [
      {
        courseName: "Integrated Bachelor of Arts & Bachelor of Laws (B.A. LL.B. Hons.)",
        duration: "5 Years",
        suitabilityRationale: "High-integrity professional path with extensive options in judiciary, corporate law, and consulting.",
        idealForStrengths: "Critical english comprehension, legal rationale, analytical arguing.",
        admissionRoute: "CLAT (Common Law Admission Test), AILET"
      },
      {
        courseName: "B.Des in Communication Design / Product Design",
        duration: "4 Years",
        suitabilityRationale: "Strong professional alignment for creative thinkers who want structure in user interfaces, creative media, and industrial visual arts.",
        idealForStrengths: "Visuospatial logic, spatial sketching, artistic proportions, aesthetic conceptualization.",
        admissionRoute: "NID DAT, UCEED, NIFT Entrance"
      }
    ];

    recommendedExamsToTake = ["CUET-UG", "CLAT-UG", "NID DAT", "UCEED"];

    timeline = [
      {
        phase: "Immediate (Next 2 Months)",
        focusArea: "Form Submission & Entrance Strategy",
        actionItems: [
          "Complete your application with CLAT or National Institute of Design (NID) portals.",
          "Prepare dynamic portfolios for professional evaluation rounds."
        ]
      }
    ];

    preparationTips = [
      "Cultivate the habit of rapid-reading standard opinion columns to answer huge English passages in seconds.",
      "Stay active on current socioeconomic reforms and constitutional highlights."
    ];
  }

  // Adjust budget tier customization
  if (budgetTier === "budget-friendly") {
    courses.forEach(c => {
      c.suitabilityRationale += " Standardized cost structure is highly affordable in central universities and premier government institutes.";
    });
  } else if (budgetTier === "high-end") {
    courses.forEach(c => {
      c.suitabilityRationale += " Exceptionally viable for premium private universities (including Ashoka, Manipal, Symbiosis, and BITS Pilani) offering elite global faculties and advanced placements.";
    });
  }

  return {
    isOfflineFallback: true,
    recommendedStream,
    execSummary,
    courses,
    recommendedExamsToTake,
    timeline,
    preparationTips
  };
}

// Smart chatbot fallback generator
function getSmartChatFallback(message: string) {
  const msg = message.toLowerCase();
  
  if (msg.includes("math") || msg.includes("nata") || msg.includes("b.arch") || msg.includes("architecture")) {
    return `### Mathematics eligibility in Indian B.Arch (Architecture) & NATA:

Under standard Council of Architecture (CoA) rules:
1. **Maths, Physics, and Chemistry (PCM)** are strictly compulsory subjects in Class 12 standard +2 to get admission to any architecture program in India.
2. You must obtain at least **50% aggregate marks** in Physics, Chemistry, and Mathematics, as well as 50% overall in the 12th standard.
3. You also need to qualify in the **NATA (National Aptitude Test in Architecture)** or possess a valid rank in a paper like **JEE Main Paper 2**.

*Tip: If you do not have Mathematics in 12th, you might want to look at B.Des (Design) options like NID (National Institute of Design) or NIFT, where Math is not a strict mandatory qualification.*`;
  }
  
  if (msg.includes("commerce") || msg.includes("ca") || msg.includes("finance") || msg.includes("bba")) {
    return `### Commerce streams and lucrative alternatives to CA (Chartered Accountancy) in India:

While CA is prestigious, here are major alternative career avenues with high earning potential:
1. **IPMAT (Integrated Program in Management)**: Enter IIM Indore, Rohtak, Ranchi, IPM at IIM Jammu or Bodh Gaya right after Class 12. Generates an integrated BBA+MBA degree.
2. **Global Certifications (ACCA, CFA, CMA)**: Highly corporate-ready, less linear and faster clearing rate than CA. Excellent for investment banking.
3. **B.Com (Hons.) & Corporate Actuarial Science**: Outstanding for students with good analytical and mathematics skills; actuarial analysts handle risk profiling in insurance packages.
4. **Economics / Data Analytics**: Pursuing B.A. Economics from premier colleges (e.g. SRCC, St. Stephen's, Ashoka) opens corporate consulting placements.

*Would you like detailed preparation tips for the IPMAT exam?*`;
  }

  if (msg.includes("ipmat") || msg.includes("iim") || msg.includes("management")) {
    return `### IIM Integrated Program in Management (IPMAT) overview:

The IPM is a premium five-year dual-degree course (BBA + MBA) offered by leading IIMs (Indore, Rohtak, Ranchi, Jammu, and Bodh Gaya).

**Admission Flow:**
- **IPMAT Indore**: Accepted by IIM Indore, IIM Ranchi, and Nirma University. Focuses heavily on Quantitative Ability (both MCQs and Short Answer) and Verbal Ability. Includes high level math.
- **IPMAT Rohtak**: Accepted by IIM Rohtak. Focuses on Quant, Verbal, and Logical Reasoning.
- **JIPMAT**: Joint Integrated Programme in Management Admission Test for IIM Jammu and IIM Bodh Gaya. Under standard National Testing Agency (NTA).

**Key Preparation Strategy:**
1. **Speed Mathematics**: Quantitative section tests up to high-school level maths, but under strict timed pressure.
2. **Vocabulary & Comprehension**: Daily reading of publications like *The Hindu* or *Aeon Essays* to master verbal evaluation.
3. **Mock Tests**: Focus heavily on sectional cutoffs. Many candidates pass overall marks but miss the math sectional constraint inside high-tier IIMs.`;
  }

  if (msg.includes("josaa") || msg.includes("counsel") || msg.includes("jee") || msg.includes("main") || msg.includes("nit") || msg.includes("iit")) {
    return `### JoSAA and CSAB Admission & Seat Allocation Process:

The Joint Seat Allocation Authority (JoSAA) manages central seat allocation for undergraduate programs in 23 IITs, 31 NITs, IIITs, and other GFTIs.

**The Sequential Flow of JoSAA Counseling:**
1. **Registration & Choice Filling**: Submit a single list of colleges and branches in strict priority. If you put choice A above B, you'll be evaluated for A first!
2. **Mock Seat Allotment**: Happens in 2 rounds beforehand to let you gauge where you stand based on raw rankings.
3. **Regular Seat Rounds (Rounds 1 to 5)**: If allocated a seat, you must choose:
   - **Freeze**: Lock the seat (happy with current branch and institute).
   - **Slide**: Wait for a better branch in the *same* institute.
   - **Float**: Wait for a better branch or institute.
4. **Document Verification & Fee**: Pay the Seat Acceptance Fee (SAF) online to keep the seat secured.

*CSAB (Central Seat Allocation Board)* conducts special 'supernumerary' rounds for any remaining vacant seats inside NITs and IIITs subsequent to JoSAA completion.`;
  }

  if (msg.includes("science") || msg.includes("biology") || msg.includes("mbbs") || msg.includes("neet") || msg.includes("alternative")) {
    return `### High-potential career pathways for Class 12 PCB/PCM science other than Engineering & MBBS:

If you want alternative medical/scientific routes in India, notice these high-growth tracks:
1. **Bioinformatics & Computational Biology**: Combines data analysis with biological streams. Huge demand in pharma, AI drug-discovery, and global laboratories.
2. **Pharmacy & Clinical Research (B.Pharm)**: Positioned within the production, formulation, and quality management sector in India (known as the pharmacy of the world).
3. **Food Technology & Agritech**: Highly supported by government subsidies. Offers excellent administrative research roles.
4. **Clinical Psychology & Cognitive Sciences**: Rapidly expanding professional scope in pediatric and adult counseling.
5. **Combined IAS/Civil Service research pathways via standard B.Sc (Hons.) from Central Universities.**

*Which of these domains matches your personal interests most closely?*`;
  }

  // Generic fallback if no keyword matches
  return `### Career Advisor Insights:

Choosing a career track after Class 12 in India can feel intimidating with so many competitive constraints. Let's tackle it strategically:
1. **Identify the exam framework**: Standard examinations like JEE, NEET, CUET, CLAT, and IPMAT govern most placements. Focus early on the specific syllabus format.
2. **Academic Safety Nets**: Always plan secondary exams (e.g., CUET for central universities, or regional CETs) alongside major national competitive headers.
3. **Budget and Location alignment**: Indian higher education cost structures range from minimal (Central/State government institutions of national importance) to premium (private institutions like Ashoka or BITS).

What specific subjects (e.g. Physics, Accountancy, Humanities) are you currently studying, and what are your standard goals?`;
}

// API: Career Survey Evaluation Endpoint
app.post("/api/advisor/survey-evaluate", async (req, res) => {
  const { stream, aggregateMarks, primaryInterests, preferredOutcome, budgetTier, locationPref } = req.body;

  try {
    if (!isKeyValid) {
      // Use smart, customized recommendation fallback
      const smartResult = getSmartFallback(stream, aggregateMarks, primaryInterests, preferredOutcome, budgetTier, locationPref);
      return res.status(200).json(smartResult);
    }

    const payloadString = `
      Evaluate the student passing 12th standard (+2) in India:
      - 12th Stream Track: ${stream}
      - Approx. aggregate marks/bracket: ${aggregateMarks}
      - Student's primary interests: ${primaryInterests ? primaryInterests.join(", ") : "general guidance"}
      - Preferred post-degree outcome choice: ${preferredOutcome}
      - Parental budget tier / willingness: ${budgetTier}
      - Location preference: ${locationPref}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are an expert career counselor specialized in the Indian Higher Education space (post 12th standard / +2). Analyze this student profile carefully and recommend custom, highly fitting career tracks, courses, exactly which entrance exams to consider, prep tips, and a clear step-by-step roadmap timeline.
      
      Student Profile context:
      ${payloadString}
      
      Provide tailored recommendations matching Indian undergraduate frameworks, specific degree formats (B.Tech, B.Sc, B.Com, Integrated MBA, B.Des, LLB, etc.), appropriate public/private sector options, and timelines.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedStream: { type: Type.STRING, description: "Primary recommended educational stream or sector (e.g. engineering, design, commerce)" },
            execSummary: { type: Type.STRING, description: "A highly personalized 2-sentence executive summary explaining why this pathway fits the student." },
            courses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  courseName: { type: Type.STRING, description: "Official course name (e.g., B.Tech Computer Science, B.Des Communication Design, etc.)" },
                  duration: { type: Type.STRING, description: "Expected duration (e.g. 4 Years, 3 Years)" },
                  suitabilityRationale: { type: Type.STRING, description: "Clear explanation connecting this course with their survey inputs" },
                  idealForStrengths: { type: Type.STRING, description: "Specific skills or strengths this suits" },
                  admissionRoute: { type: Type.STRING, description: "Main admission entrance or criteria (e.g., JEE Main, CUET, CLAT, NIFT etc.)" }
                },
                required: ["courseName", "duration", "suitabilityRationale", "idealForStrengths", "admissionRoute"]
              }
            },
            recommendedExamsToTake: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specific popular competitive exams in India applicable to this candidate"
            },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING, description: "Time phase, e.g., 'Immediate (Next 2 Months)', 'Mid-term (First Semester)'" },
                  focusArea: { type: Type.STRING },
                  actionItems: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["phase", "focusArea", "actionItems"]
              }
            },
            preparationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: [
            "recommendedStream",
            "execSummary",
            "courses",
            "recommendedExamsToTake",
            "timeline",
            "preparationTips"
          ]
        }
      }
    });

    const textOutput = response.text || "{}";
    return res.json(JSON.parse(textOutput));
  } catch (err: any) {
    console.error("Survey evaluation engine error (falling back dynamically):", err);
    // Graceful automatic recovery with tailored response
    const smartResult = getSmartFallback(stream, aggregateMarks, primaryInterests, preferredOutcome, budgetTier, locationPref);
    return res.status(200).json(smartResult);
  }
});

// API: Career Advisor Chat Endpoint
app.post("/api/advisor/counselor-chat", async (req, res) => {
  const { message, history } = req.body;

  try {
    if (!message) {
      return res.status(400).json({ error: "Message prompt is required." });
    }

    if (!isKeyValid) {
      // Return smart keyword-matching dynamic advise
      const text = getSmartChatFallback(message);
      return res.status(200).json({ text });
    }

    // Prepare context or use Chat interface
    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: "You are 'MargDarshak', an empathetic, authoritative career advisor specialized in helping Indian students who have completed 12th standard (+2) understand their career pathways. You have high alignment with state and national options in India, eligibility rules, and competitive examinations. You communicate in a supportive, crystal-clear, structured manner with clean Markdown tables or bullet lists. Suggest high-value outcomes. Keep answers structured but friendly. Advise them exactly which portal, counsellors, or timeline to check."
      }
    });

    const response = await chatInstance.sendMessage({ message });
    return res.json({ text: response.text });
  } catch (err: any) {
    console.error("Advisor chat error (falling back dynamically):", err);
    const text = getSmartChatFallback(message || "");
    return res.status(200).json({ text });
  }
});

// Configure Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
