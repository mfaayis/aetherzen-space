import { examsData } from "@/data/exams";
import { notFound } from "next/navigation";
import ExamDetailClient from "./ExamDetailClient";

export function generateStaticParams() {
  return examsData.map((exam) => ({
    slug: exam.slug,
  }));
}

export default function ExamDetailPage({ params }: { params: { slug: string } }) {
  const exam = examsData.find(e => e.slug === params.slug);

  if (!exam) {
    notFound();
  }

  return <ExamDetailClient exam={exam} />;
}
