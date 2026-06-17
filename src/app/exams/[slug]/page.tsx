import { examsData } from "@/data/exams";
import { notFound } from "next/navigation";
import ExamDetailClient from "./ExamDetailClient";

export function generateStaticParams() {
  return examsData.map((exam) => ({
    slug: exam.slug,
  }));
}

export default async function ExamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const exam = examsData.find(e => e.slug === resolvedParams.slug);

  if (!exam) {
    notFound();
  }

  return <ExamDetailClient exam={exam} />;
}
