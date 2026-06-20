import { getAllBlogPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | NextStep Career Guidance",
  description: "Read the latest articles on exams, careers, and university admissions.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 bg-black/50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-white/20 bg-white/5 text-neutral-300 inline-block mb-4">
            Editorial
          </span>
          <h1 className="text-4xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tighter leading-tight">
            Latest Insights
          </h1>
          <p className="text-lg text-neutral-400 font-sans max-w-2xl">
            Expert advice, exam strategies, and career path deep-dives to help you navigate your future.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all hover:bg-white/5 group block"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4 text-xs font-sans text-neutral-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Tag size={14} /> {post.tags[0] || 'General'}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/50 text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                  <ArrowRight size={14} />
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-neutral-400 font-sans leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-20 border border-white/10 rounded-3xl bg-white/5">
              <h3 className="text-xl font-heading text-white mb-2">No posts yet</h3>
              <p className="text-neutral-400 font-sans text-sm">Check back soon for new articles.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
