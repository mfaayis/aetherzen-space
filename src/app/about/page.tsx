import { Metadata } from "next";
import { ArrowRight, Target, Users, BookOpen, Map, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | NextStep Career Guidance",
  description: "Learn more about NextStep's mission to guide students through their educational and career journeys.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 bg-black/50">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-white/20 bg-white/5 text-neutral-300 inline-block mb-6">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tighter leading-tight">
            Empowering the Next Generation
          </h1>
          <p className="text-lg text-neutral-400 font-sans max-w-2xl mx-auto">
            NextStep is dedicated to providing students with clarity, direction, and the right tools to navigate the complex world of higher education and careers in India.
          </p>
        </div>

        {/* Story */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
          <h2 className="text-3xl font-heading font-bold text-white mb-6">Why NextStep?</h2>
          <div className="space-y-6 text-neutral-300 font-sans leading-relaxed text-lg relative z-10">
            <p>
              Every year, millions of students graduate from high school facing the daunting question: <strong>"What's next?"</strong> The sheer volume of entrance exams, colleges, and evolving career paths can overwhelm even the brightest minds.
            </p>
            <p>
              We built NextStep to cut through the noise. By combining data-driven insights with AI-powered counseling, we aim to democratize access to high-quality career guidance. Whether you're aiming for the IITs, exploring liberal arts, or looking into emerging fields like AI and design, we're here to map out your journey.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-white mb-8 text-center">How We Help You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Map className="text-blue-400" />, title: "Course Discovery", desc: "Detailed breakdowns of undergraduate courses, eligibility, and salary prospects." },
              { icon: <Target className="text-amber-400" />, title: "Exam Roadmaps", desc: "Comprehensive guides to cracking competitive exams like JEE, NEET, and CUET." },
              { icon: <BookOpen className="text-emerald-400" />, title: "College Directory", desc: "Search and filter through top institutions across the country to find your fit." },
              { icon: <MessageSquare className="text-purple-400" />, title: "AI Counseling", desc: "Get personalized answers to your specific career queries instantly." },
            ].map((item, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-white">{item.title}</h3>
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Placeholder */}
        <div className="text-center p-12 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group hover:border-white/20 transition-all">
          <Users size={32} className="mx-auto mb-6 text-neutral-500 group-hover:text-white transition-colors" />
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Join the Team</h2>
          <p className="text-neutral-400 font-sans mb-8 max-w-lg mx-auto">
            We are a small, passionate group of developers and educators. If you believe in our mission, we'd love to have you on board.
          </p>
          <a href="mailto:contact@nextstep.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-sans font-bold text-sm hover:bg-neutral-200 transition-colors">
            Get in Touch <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </main>
  );
}
