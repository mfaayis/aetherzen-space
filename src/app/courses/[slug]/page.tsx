import { getCourseBySlug } from "@/data/courseDetails";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, GraduationCap, Building2, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found | NextStep" };
  return {
    title: `${course.name} | NextStep Course Directory`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    // If we don't have detailed data for this slug yet, show a generic placeholder
    return (
      <main className="min-h-screen pt-32 pb-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/courses" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Directory
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">
            Coming Soon
          </h1>
          <p className="text-neutral-400">Detailed information for this course is being compiled.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 bg-black/50">
      <div className="max-w-4xl mx-auto">
        <Link href="/courses" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Directory
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-white/20 bg-white/5 text-neutral-300">
              {course.category}
            </span>
            <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-white/20 bg-white/5 text-neutral-300">
              {course.duration}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tighter leading-tight">
            {course.name}
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed font-sans max-w-3xl">
            {course.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Eligibility Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 md:col-span-2">
            <h3 className="text-sm font-sans font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} /> Eligibility
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-white font-bold mb-1">Stream Required</div>
                <div className="text-neutral-400 text-sm">{course.eligibility.stream}</div>
              </div>
              <div>
                <div className="text-white font-bold mb-1">Minimum Marks</div>
                <div className="text-neutral-400 text-sm">{course.eligibility.minimumMarks}</div>
              </div>
              <div>
                <div className="text-white font-bold mb-1">Admission Details</div>
                <div className="text-neutral-400 text-sm">{course.eligibility.details}</div>
              </div>
            </div>
          </div>

          {/* Salary Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-center">
            <h3 className="text-sm font-sans font-bold text-neutral-500 uppercase tracking-widest mb-6">Average Salary</h3>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-heading font-bold text-white tracking-tight">{course.salary.startingLPA}</div>
                <div className="text-neutral-500 text-xs uppercase tracking-widest mt-1">Starting</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-white tracking-tight">{course.salary.midCareerLPA}</div>
                <div className="text-neutral-500 text-xs uppercase tracking-widest mt-1">Mid-Career</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scope & Recruiters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10">
            <h3 className="text-sm font-sans font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Briefcase size={16} /> Career Scope
            </h3>
            <ul className="space-y-3">
              {course.careerScope.map((role, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10">
            <h3 className="text-sm font-sans font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Building2 size={16} /> Top Recruiters
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.topRecruiters.map((company, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-neutral-300">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right For You & Higher Studies */}
        <div className="glass-panel p-6 md:p-10 rounded-3xl border border-white/10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-sans font-bold text-neutral-500 uppercase tracking-widest mb-4">Is this right for you?</h3>
              <p className="text-neutral-300 leading-relaxed font-sans text-sm">
                {course.isRightForYou}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-sans font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <GraduationCap size={16} /> Higher Study Options
              </h3>
              <ul className="space-y-3">
                {course.higherStudyOptions.map((opt, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-1.5 shrink-0" />
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
