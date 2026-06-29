import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) notFound();

  const more = await prisma.blogPost.findMany({
    where: { NOT: { slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: { slug: true, title: true, publishedAt: true },
  });

  return (
    <div className="max-w-content mx-auto px-6 w-full" style={{ maxWidth: "720px" }}>

      {/* Back link */}
      <div className="pt-24 pb-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.1em] uppercase text-fg-faint hover:text-gold transition-colors">
          <svg width={14} height={14} className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16L3 12m0 0l4-4M3 12h18" />
          </svg>
          All Posts
        </Link>
      </div>

      {/* Header */}
      <header className="pb-10 mb-10 border-b border-border">
        <p className="eyebrow mb-5">
          {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h1 className="font-serif text-[2.25rem] md:text-[3rem] text-fg leading-[1.12] mb-5">
          {post.title}
        </h1>
        <p className="text-[1.05rem] text-fg-muted leading-[1.7]">{post.excerpt}</p>
      </header>

      {/* Body — same typography as interviews */}
      <div className="interview-content" dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* More posts */}
      {more.length > 0 && (
        <div className="mt-16 mb-24 border-t border-border pt-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-border-mid" />
            <span className="eyebrow">More from the Blog</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-border">
            {more.map((m) => (
              <Link
                key={m.slug}
                href={`/blog/${m.slug}`}
                className="group block bg-bg-card p-5 hover:bg-bg-hover transition-colors"
              >
                <p className="eyebrow mb-2">
                  {new Date(m.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <p className="font-serif text-[1.05rem] text-fg group-hover:text-gold-light transition-colors leading-tight line-clamp-3">
                  {m.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
