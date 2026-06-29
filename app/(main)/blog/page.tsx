import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div className="max-w-content mx-auto px-6 md:px-10">

      {/* Header */}
      <div className="pt-24 pb-14 border-b border-border">
        <div className="rule-gold" />
        <h1 className="font-serif text-[2.75rem] md:text-[3.75rem] text-fg mb-4 leading-[1.1]">
          Blog
        </h1>
        <p className="text-fg-muted text-[1rem] max-w-lg leading-[1.75]">
          Notes, analysis, and arguments on the parts of iGaming nobody else writes about plainly.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-serif text-[1.5rem] text-fg-faint mb-2">Coming soon</p>
          <p className="text-[0.875rem] text-fg-faint">First posts are being prepared.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-bg-card hover:bg-bg-hover transition-colors duration-200 p-7"
            >
              <p className="eyebrow mb-4">
                {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <h2 className="font-serif text-[1.4rem] text-fg mb-3 leading-tight group-hover:text-gold-light transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-[0.9375rem] text-fg-muted leading-[1.7] line-clamp-4 flex-1">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gold group-hover:text-gold-light transition-colors mt-6">
                Read more
                <svg width={14} height={14} className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="py-20" />
    </div>
  );
}
