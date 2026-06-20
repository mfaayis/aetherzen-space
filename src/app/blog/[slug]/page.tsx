import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found | NextStep" };
  return {
    title: `${post.metadata.title} | NextStep Blog`,
    description: post.metadata.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (just the latest 2 that aren't this one for now)
  const relatedPosts = getAllBlogPosts()
    .filter(p => p.slug !== slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 bg-black/50">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-500 uppercase tracking-widest mb-6">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.metadata.date}</span>
            <span className="flex items-center gap-1.5"><User size={14} /> {post.metadata.author}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tighter leading-tight">
            {post.metadata.title}
          </h1>
          <p className="text-xl text-neutral-400 font-sans leading-relaxed">
            {post.metadata.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {post.metadata.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neutral-300 font-sans">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg font-sans max-w-none mb-16">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-white/10">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">Read Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(rp => (
                <Link 
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all hover:bg-white/5"
                >
                  <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">{rp.title}</h4>
                  <p className="text-neutral-400 text-sm line-clamp-2">{rp.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
