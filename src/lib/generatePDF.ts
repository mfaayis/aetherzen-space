import jsPDF from "jspdf";

export interface BlueprintResult {
  title: string;
  match: string;
  desc: string;
  exams: string[];
  duration?: string;
  costRange?: string;
  salaryRange?: string;
  jobStats?: string;
  coreSubjects?: string[];
  careerOutcomes?: string[];
}

export const generateBlueprintPDF = async (results: BlueprintResult[], userName?: string) => {
  // Create a new A4 document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let cursorY = margin;

  // Helper to add centered text
  const addCenteredText = (text: string, y: number, size: number, color: number[], fontStyle: string = "normal") => {
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFont("helvetica", fontStyle);
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, y);
  };

  // Helper to wrap text and add block
  const addTextBlock = (text: string, y: number, size: number, color: number[], fontStyle: string = "normal", maxWidth: number = pageWidth - margin * 2) => {
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFont("helvetica", fontStyle);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, y);
    return lines.length * (size * 0.4); // Approximate height
  };

  // 1. Header / Branding
  // Draw a very subtle top accent line
  doc.setFillColor(59, 130, 246); // Tailwind blue-500
  doc.rect(0, 0, pageWidth, 5, "F");

  cursorY += 15;
  
  // Title
  addCenteredText("NextStep", cursorY, 28, [15, 23, 42], "bold"); // Dark slate
  cursorY += 10;
  
  // Subtitle
  const titleText = userName ? `${userName}'s Career Blueprint` : "Your Personalized Career Blueprint";
  addCenteredText(titleText, cursorY, 16, [59, 130, 246], "bold"); // Blue
  cursorY += 8;

  // Date
  const dateStr = `Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
  addCenteredText(dateStr, cursorY, 10, [100, 116, 139], "normal"); // Slate 500
  cursorY += 20;

  // Divider
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 15;

  // 2. Results Section
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Recommended Career Paths", margin, cursorY);
  cursorY += 12;

  results.forEach((res, index) => {
    // Check page break
    if (cursorY > pageHeight - 40) {
      doc.addPage();
      cursorY = margin;
    }

    // Card background simulation (light gray rounded rect)
    const cardHeight = 45;
    doc.setFillColor(248, 250, 252); // Slate 50
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.roundedRect(margin, cursorY, pageWidth - margin * 2, cardHeight, 3, 3, "FD");

    // Title 
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${res.title}`, margin + 5, cursorY + 10);
    
    // Match badge (colored badge right aligned inside card)
    const matchText = `${res.match} Match`;
    const matchWidth = doc.getTextWidth(matchText);
    const badgePadding = 3;
    
    // Match badge background
    doc.setFillColor(239, 246, 255); // blue-50
    doc.roundedRect(pageWidth - margin - matchWidth - badgePadding * 2 - 5, cursorY + 5, matchWidth + badgePadding * 2, 8, 2, 2, "F");
    
    // Match badge text
    doc.setTextColor(59, 130, 246); // blue-500
    doc.setFontSize(10);
    doc.text(matchText, pageWidth - margin - matchWidth - badgePadding - 5, cursorY + 10.5);

    // Rich Data (Duration, Salary)
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.setFont("helvetica", "italic");
    let statsText = "";
    if (res.duration) statsText += `Duration: ${res.duration}  |  `;
    if (res.salaryRange) statsText += `Expected Salary: ${res.salaryRange}  |  `;
    if (res.costRange) statsText += `Est. Cost: ${res.costRange}`;
    doc.text(statsText, margin + 5, cursorY + 18);

    // Description
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105); // Slate 600
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(res.desc, pageWidth - margin * 2 - 10);
    doc.text(descLines, margin + 5, cursorY + 28);

    cursorY += cardHeight + 10;
  });

  cursorY += 5;

  // 3. Next Steps & Recommended Exams
  if (cursorY > pageHeight - 60) {
    doc.addPage();
    cursorY = margin;
  }

  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Actionable Next Steps", margin, cursorY);
  cursorY += 10;

  // Compile unique exams
  const uniqueExams = Array.from(new Set(results.flatMap(r => r.exams || [])));
  
  let examText = "Check official entrance exam dates.";
  if (uniqueExams.length > 0) {
    examText = `Check official entrance exam dates for: ${uniqueExams.join(", ")}.`;
  }

  const steps = [
    "Explore these specific courses in our Course Directory.",
    "Search for top-ranked colleges offering these programs.",
    examText,
    "Use the NextStep AI Counselor for specific follow-up questions."
  ];

  steps.forEach(step => {
    doc.setFillColor(59, 130, 246);
    doc.circle(margin + 2, cursorY - 1, 1.5, "F"); // Bullet point
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    
    // Wrap step text just in case it's long
    const stepLines = doc.splitTextToSize(step, pageWidth - margin * 2 - 10);
    doc.text(stepLines, margin + 8, cursorY);
    cursorY += stepLines.length * 5 + 3;
  });

  // 4. Footer
  const footerY = pageHeight - 15;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.setFont("helvetica", "normal");
  doc.text("Generated by NextStep Career Guidance", margin, footerY);
  
  const urlText = process.env.NEXT_PUBLIC_SITE_URL || "https://aetherzen-space-1s1x.vercel.app";
  const urlWidth = doc.getTextWidth(urlText);
  doc.text(urlText, pageWidth - margin - urlWidth, footerY);

  // Save the PDF
  const filename = userName ? `NextStep_Blueprint_${userName.replace(/\s+/g, '_')}.pdf` : "NextStep-Career-Blueprint.pdf";
  doc.save(filename);
};
