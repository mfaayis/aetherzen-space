import jsPDF from "jspdf";
import { EnrichedResult } from "@/lib/assessmentEngine";

export type { EnrichedResult as BlueprintResult };

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

export const generateBlueprintPDF = async (
  results: EnrichedResult[],
  userInfo?: UserInfo
) => {
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

  // ── HEADER ──────────────────────────────────────────────────────────────────
  if (logoDataUrl) {
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
  doc.setTextColor(168, 85, 247);
  doc.setFont("helvetica", "bold");
  doc.text(subText, (pageWidth - doc.getTextWidth(subText)) / 2, cursorY);
  cursorY += 6;

  const tagline = "Career paths that best match your assessment";
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 140);
  doc.setFont("helvetica", "italic");
  doc.text(tagline, (pageWidth - doc.getTextWidth(tagline)) / 2, cursorY);
  cursorY += 18;

  // ── USER INFO ───────────────────────────────────────────────────────────────
  if (userInfo?.name) {
    doc.setFillColor(20, 20, 20);
    doc.setDrawColor(30, 30, 30);
    doc.roundedRect(margin, cursorY, pageWidth - margin * 2, 25, 3, 3, "FD");

    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.setFont("helvetica", "bold");

    const col1 = margin + 8;
    const col2 = margin + (pageWidth - margin * 2) / 3 + 5;
    const col3 = margin + ((pageWidth - margin * 2) / 3) * 2;

    doc.text("PREPARED FOR", col1, cursorY + 10);
    doc.text("EMAIL", col2, cursorY + 10);
    doc.text("LOCATION", col3, cursorY + 10);

    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");

    doc.text(userInfo.name, col1, cursorY + 17);
    doc.text(userInfo.email || "N/A", col2, cursorY + 17);
    doc.text(userInfo.location || "N/A", col3, cursorY + 17);

    cursorY += 38;
  } else {
    cursorY += 8;
  }

  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 14;

  // ── RESULTS ─────────────────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("Career Paths That Match Your Assessment", margin, cursorY);
  cursorY += 14;

  results.forEach((res, index) => {
    const descLines = doc.splitTextToSize(
      res.desc || "",
      pageWidth - margin * 2 - 14
    );

    // Why it fits
    const whyLines: string[][] = (res.whyItFits || []).map((w) =>
      doc.splitTextToSize(`✓ ${w}`, pageWidth - margin * 2 - 20)
    );
    const whyHeight = whyLines.reduce((s, l) => s + l.length * 5, 0);

    // Factor bars (text representation in PDF)
    const factorHeight = res.factorScores ? 42 : 0;
    
    // Income/Salary height
    let salaryHeight = 0;
    if (res.incomeModel) salaryHeight = 15;
    else if (res.salaryEntry) salaryHeight = 10;
    
    // Recommended Education height
    let eduHeight = 0;
    if (res.recommendedEducation && res.recommendedEducation.length > 0) {
      eduHeight = res.recommendedEducation.length * 5 + 8;
    }

    const baseHeight = 42;
    const descHeight = descLines.length * 5;
    const cardHeight = baseHeight + descHeight + whyHeight + factorHeight + salaryHeight + eduHeight + 5;

    checkPageBreak(cardHeight + 10);

    // Card background
    doc.setFillColor(18, 18, 22);
    doc.setDrawColor(50, 50, 80);
    doc.roundedRect(margin, cursorY, pageWidth - margin * 2, cardHeight, 4, 4, "FD");

    // Label pill
    const labelColors: Record<string, [number, number, number]> = {
      "Best Match":             [59, 130, 246],
      "Strong Alternative":     [99, 102, 241],
      "Alternative Career Path":[139, 92, 246],
      "Safe / Stable Option":   [16, 185, 129],
      "High-Growth Option":     [245, 158, 11],
      "Entrepreneurial Option": [239, 68, 68],
    };
    const [lr, lg, lb] = labelColors[res.resultLabel] || [59, 130, 246];
    doc.setFillColor(lr, lg, lb);
    const labelText = res.resultLabel || `#${index + 1}`;
    const lw = doc.getTextWidth(labelText) + 8;
    doc.roundedRect(margin + 7, cursorY + 7, lw, 6, 2, 2, "F");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(labelText, margin + 11, cursorY + 11.5);

    // Title
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(res.title, margin + 7, cursorY + 21);
    
    // Career Type
    if (res.careerTypeLabel) {
      doc.setFontSize(8);
      doc.setTextColor(190, 190, 210);
      doc.setFont("helvetica", "normal");
      doc.text(`${res.careerTypeLabel} · ${res.category}`, margin + 7, cursorY + 26);
    }

    // Match % badge
    const matchText = `${res.matchPercentage} Match`;
    doc.setFontSize(9);
    const matchWidth = doc.getTextWidth(matchText);
    doc.setFillColor(30, 58, 138);
    doc.roundedRect(
      pageWidth - margin - matchWidth - 10,
      cursorY + 7,
      matchWidth + 6,
      7,
      2, 2, "F"
    );
    doc.setTextColor(96, 165, 250);
    doc.setFont("helvetica", "bold");
    doc.text(matchText, pageWidth - margin - matchWidth - 7, cursorY + 12.5);

    // Confidence
    const confColors: Record<string, [number, number, number]> = {
      High:     [16, 185, 129],
      Moderate: [245, 158, 11],
      Low:      [239, 68, 68],
    };
    const [cr, cg, cb] = confColors[res.confidence] || [120, 120, 120];
    doc.setTextColor(cr, cg, cb);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text(`Confidence: ${res.confidence}`, margin + 7, cursorY + 29);

    let innerY = cursorY + 34;

    // Description
    if (descLines.length > 0) {
      doc.setFontSize(9);
      doc.setTextColor(190, 190, 210);
      doc.setFont("helvetica", "normal");
      doc.text(descLines, margin + 7, innerY);
      innerY += descLines.length * 5 + 6;
    }

    // Factor scores
    if (res.factorScores) {
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 140);
      doc.setFont("helvetica", "bold");
      doc.text("MATCH BREAKDOWN", margin + 7, innerY);
      
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 120);
      doc.setFont("helvetica", "normal");
      doc.text("Overall = Σ(factor × weight)", pageWidth - margin - 7 - doc.getTextWidth("Overall = Σ(factor × weight)"), innerY);
      
      innerY += 5;

      const factorLabels: [string, number][] = [
        [`Interest (x${Math.round((res.factorWeights?.interest || 0)*100)}%)`,    res.factorScores.interest],
        [`Aptitude (x${Math.round((res.factorWeights?.aptitude || 0)*100)}%)`,    res.factorScores.aptitude],
        [`Work Style (x${Math.round((res.factorWeights?.workStyle || 0)*100)}%)`,  res.factorScores.workStyle],
        [`Environ. (x${Math.round((res.factorWeights?.environment || 0)*100)}%)`, res.factorScores.environment],
        [`Education (x${Math.round((res.factorWeights?.education || 0)*100)}%)`,   res.factorScores.education],
        [`Risk/Goals (x${Math.round((res.factorWeights?.riskGoals || 0)*100)}%)`, res.factorScores.riskGoals],
      ];
      const barWidth = 50;
      const barH = 3;
      const colW = (pageWidth - margin * 2 - 14) / 2;

      factorLabels.forEach(([label, value], fi) => {
        const fx = margin + 7 + (fi % 2) * colW;
        const fy = innerY + Math.floor(fi / 2) * 9;

        doc.setFontSize(7);
        doc.setTextColor(180, 180, 200);
        doc.setFont("helvetica", "normal");
        doc.text(`${label}: ${value}%`, fx, fy);

        // Background bar
        doc.setFillColor(40, 40, 60);
        doc.roundedRect(fx, fy + 1.5, barWidth, barH, 1, 1, "F");
        // Fill bar
        const fillW = (value / 100) * barWidth;
        doc.setFillColor(lr, lg, lb);
        doc.roundedRect(fx, fy + 1.5, fillW, barH, 1, 1, "F");
      });

      innerY += Math.ceil(factorLabels.length / 2) * 9 + 3;
    }

    // Why it fits
    if (whyLines.length > 0) {
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 140);
      doc.setFont("helvetica", "bold");
      doc.text("WHY IT FITS", margin + 7, innerY);
      innerY += 4;
      doc.setTextColor(16, 185, 129);
      doc.setFont("helvetica", "normal");
      for (const lines of whyLines) {
        doc.text(lines, margin + 7, innerY);
        innerY += lines.length * 5;
      }
    }

    // Income / Salary
    if (res.incomeModel) {
      innerY += 2;
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 140);
      doc.setFont("helvetica", "bold");
      doc.text("INCOME MODEL", margin + 7, innerY);
      innerY += 4;
      doc.setTextColor(245, 158, 11); // amber
      doc.setFont("helvetica", "bold");
      doc.text(res.incomeModel, margin + 7, innerY);
      if (res.salaryNote) {
        innerY += 4;
        doc.setTextColor(150, 150, 170);
        doc.setFont("helvetica", "normal");
        const noteLines = doc.splitTextToSize(res.salaryNote, pageWidth - margin * 2 - 14);
        doc.text(noteLines, margin + 7, innerY);
        innerY += (noteLines.length - 1) * 4;
      }
      innerY += 4;
    } else if (res.salaryEntry || res.salaryMid || res.salaryExperienced) {
      innerY += 2;
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 140);
      doc.setFont("helvetica", "bold");
      doc.text("INDICATIVE SALARY RANGE", margin + 7, innerY);
      innerY += 4;
      doc.setTextColor(200, 200, 200);
      doc.setFont("helvetica", "normal");
      const salStr = [
        res.salaryEntry ? `Entry: ${res.salaryEntry}` : null,
        res.salaryMid ? `Mid: ${res.salaryMid}` : null,
        res.salaryExperienced ? `Experienced: ${res.salaryExperienced}` : null,
      ].filter(Boolean).join("  |  ");
      doc.text(salStr, margin + 7, innerY);
      innerY += 4;
    }
    
    // Recommended Education
    if (res.recommendedEducation && res.recommendedEducation.length > 0) {
      innerY += 2;
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 140);
      doc.setFont("helvetica", "bold");
      doc.text("RECOMMENDED EDUCATION", margin + 7, innerY);
      innerY += 4;
      doc.setTextColor(96, 165, 250); // blue-400
      doc.setFont("helvetica", "normal");
      for (const edu of res.recommendedEducation) {
        doc.text(`• ${edu}`, margin + 7, innerY);
        innerY += 5;
      }
    }

    cursorY += cardHeight + 8;
  });

  cursorY += 5;

  // ── NEXT STEPS ───────────────────────────────────────────────────────────────
  const top = results[0];
  if (top?.nextSteps?.length) {
    checkPageBreak(80);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("What To Do Next", margin, cursorY);
    cursorY += 4;

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 140);
    doc.setFont("helvetica", "italic");
    doc.text(`For your top match: ${top.title}`, margin, cursorY);
    cursorY += 10;

    const stepsBoxHeight = top.nextSteps.length * 9 + 10;
    doc.setFillColor(18, 18, 22);
    doc.setDrawColor(40, 40, 60);
    doc.roundedRect(margin, cursorY, pageWidth - margin * 2, stepsBoxHeight, 4, 4, "FD");

    let stepY = cursorY + 10;
    top.nextSteps.forEach((step, si) => {
      doc.setFillColor(59, 130, 246);
      doc.circle(margin + 10, stepY - 1.5, 2, "F");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text(`Step ${si + 1}`, margin + 15, stepY - 1);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(200, 200, 220);
      const stepLines = doc.splitTextToSize(step, pageWidth - margin * 2 - 40);
      doc.text(stepLines, margin + 35, stepY - 1);
      stepY += 9;
    });

    cursorY += stepsBoxHeight + 10;
  }

  // ── FOOTER ───────────────────────────────────────────────────────────────────
  const footerY = pageHeight - 15;
  doc.setDrawColor(40, 40, 40);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Generated by NextStep Career Guidance Platform  |  Scores reflect assessment answers only. Salary figures are indicative.",
    margin,
    footerY,
    { maxWidth: pageWidth - margin * 2 }
  );

  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const urlText = `Date: ${dateStr}`;
  const urlWidth = doc.getTextWidth(urlText);
  doc.text(urlText, pageWidth - margin - urlWidth, footerY - 5);

  const filename = userInfo?.name
    ? `NextStep_Blueprint_${userInfo.name.replace(/\s+/g, "_")}.pdf`
    : "NextStep-Career-Blueprint.pdf";
  doc.save(filename);
};
