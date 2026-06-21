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

export interface UserInfo {
  name: string;
  email: string;
  location: string;
}

const loadImage = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } else {
        reject(new Error("No context"));
      }
    };
    img.onerror = reject;
    img.src = url;
  });
};

export const generateBlueprintPDF = async (results: BlueprintResult[], userInfo?: UserInfo) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let logoDataUrl = "";
  try {
    logoDataUrl = await loadImage("/logo.png");
  } catch (e) {
    console.error("Failed to load logo", e);
  }

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let cursorY = margin;

  const fillBackground = () => {
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  };

  fillBackground();

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - margin) {
      doc.addPage();
      fillBackground();
      cursorY = margin + 10;
      return true;
    }
    return false;
  };

  // 1. Header
  if (logoDataUrl) {
    // Center logo (w:20, h:20)
    doc.addImage(logoDataUrl, "PNG", pageWidth / 2 - 10, cursorY, 20, 20);
    cursorY += 28;
  } else {
    cursorY += 10;
  }

  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  const titleText = "NextStep";
  doc.text(titleText, (pageWidth - doc.getTextWidth(titleText)) / 2, cursorY);
  cursorY += 8;

  const subText = "CAREER BLUEPRINT";
  doc.setFontSize(11);
  doc.setTextColor(168, 85, 247); // purple-500
  doc.setFont("helvetica", "bold");
  doc.text(subText, (pageWidth - doc.getTextWidth(subText)) / 2, cursorY);
  cursorY += 20;

  if (userInfo && userInfo.name) {
    doc.setFillColor(20, 20, 20);
    doc.setDrawColor(30, 30, 30);
    doc.roundedRect(margin, cursorY, pageWidth - margin * 2, 25, 3, 3, "FD");
    
    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.setFont("helvetica", "bold");
    
    const col1 = margin + 8;
    const col2 = margin + (pageWidth - margin*2)/3 + 5;
    const col3 = margin + ((pageWidth - margin*2)/3)*2;

    doc.text("PREPARED FOR", col1, cursorY + 10);
    doc.text("EMAIL", col2, cursorY + 10);
    doc.text("LOCATION", col3, cursorY + 10);

    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    
    doc.text(userInfo.name, col1, cursorY + 17);
    doc.text(userInfo.email || "N/A", col2, cursorY + 17);
    doc.text(userInfo.location || "N/A", col3, cursorY + 17);
    
    cursorY += 40;
  } else {
    cursorY += 10;
  }

  doc.setDrawColor(59, 130, 246); // blue-500
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 15;

  // 2. Results Section
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("Top Recommended Paths", margin, cursorY);
  cursorY += 15;

  results.forEach((res, index) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(res.desc, pageWidth - margin * 2 - 14);
    
    const baseHeight = 35;
    const descHeight = descLines.length * 5;
    const cardHeight = baseHeight + descHeight;

    checkPageBreak(cardHeight + 10);

    doc.setFillColor(20, 20, 20);
    doc.setDrawColor(40, 40, 40);
    doc.roundedRect(margin, cursorY, pageWidth - margin * 2, cardHeight, 4, 4, "FD");

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${res.title}`, margin + 7, cursorY + 12);
    
    const matchText = `${res.match} Match`;
    doc.setFontSize(10);
    const matchWidth = doc.getTextWidth(matchText);
    const badgePadding = 4;
    
    doc.setFillColor(30, 58, 138); 
    doc.roundedRect(pageWidth - margin - matchWidth - badgePadding * 2 - 7, cursorY + 7, matchWidth + badgePadding * 2, 7, 2, 2, "F");
    
    doc.setTextColor(96, 165, 250); 
    doc.setFont("helvetica", "bold");
    doc.text(matchText, pageWidth - margin - matchWidth - badgePadding - 7, cursorY + 12);

    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.setFont("helvetica", "italic");
    let statsText = "";
    if (res.duration) statsText += `DURATION: ${res.duration}   `;
    if (res.salaryRange) statsText += `SALARY: ${res.salaryRange}   `;
    if (res.costRange) statsText += `COST: ${res.costRange}`;
    doc.text(statsText, margin + 7, cursorY + 22);

    doc.setFontSize(10);
    doc.setTextColor(209, 213, 219); 
    doc.setFont("helvetica", "normal");
    doc.text(descLines, margin + 7, cursorY + 32);

    cursorY += cardHeight + 8;
  });

  cursorY += 5;

  // 3. Next Steps
  checkPageBreak(80);

  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("Action Plan", margin, cursorY);
  cursorY += 12;

  const uniqueExams = Array.from(new Set(results.flatMap(r => r.exams || [])));
  
  let examText = "Check official entrance exam dates and deadlines.";
  if (uniqueExams.length > 0) {
    examText = `Check official entrance exam dates for: ${uniqueExams.join(", ")}.`;
  }

  const steps = [
    "Explore these specific courses in our Course Directory.",
    "Search for top-ranked colleges offering these programs.",
    examText,
    "Use the NextStep AI Counselor for specific follow-up questions."
  ];

  const stepsBoxHeight = steps.length * 10 + 10;
  doc.setFillColor(20, 20, 20);
  doc.setDrawColor(40, 40, 40);
  doc.roundedRect(margin, cursorY, pageWidth - margin * 2, stepsBoxHeight, 4, 4, "FD");
  
  let stepY = cursorY + 12;
  steps.forEach(step => {
    doc.setFillColor(168, 85, 247); 
    doc.circle(margin + 10, stepY - 1, 1.5, "F"); 
    doc.setFontSize(11);
    doc.setTextColor(209, 213, 219);
    doc.setFont("helvetica", "normal");
    
    const stepLines = doc.splitTextToSize(step, pageWidth - margin * 2 - 20);
    doc.text(stepLines, margin + 15, stepY);
    stepY += stepLines.length * 6 + 4;
  });
  
  // 4. Footer
  const footerY = pageHeight - 15;
  doc.setDrawColor(40, 40, 40);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); 
  doc.setFont("helvetica", "normal");
  doc.text("Generated by NextStep Career Guidance Platform", margin, footerY);
  
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const urlText = `Date: ${dateStr}`;
  const urlWidth = doc.getTextWidth(urlText);
  doc.text(urlText, pageWidth - margin - urlWidth, footerY);

  const filename = userInfo?.name ? `NextStep_Blueprint_${userInfo.name.replace(/\s+/g, '_')}.pdf` : "NextStep-Career-Blueprint.pdf";
  doc.save(filename);
};
