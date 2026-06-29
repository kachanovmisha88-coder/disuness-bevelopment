import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ShareQuoteButton from "@/components/ui/ShareQuoteButton";

export const revalidate = 60;

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const iv = await prisma.interview.findUnique({ where: { slug } });
  if (!iv) return {};
  return {
    title: `${iv.guestName} — ${iv.guestCompany}`,
    description: iv.keyQuote,
  };
}

export async function generateStaticParams() {
  const interviews = await prisma.interview.findMany({ where: { published: true }, select: { slug: true } });
  return interviews.map((iv) => ({ slug: iv.slug }));
}

export default async function InterviewPage({ params }: Props) {
  const { slug } = await params;
  const iv = await prisma.interview.findUnique({ where: { slug } });
  if (!iv || !iv.published) notFound();

  const moreInterviews = await prisma.interview.findMany({
    where: { published: true, NOT: { slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: { slug: true, guestName: true, guestTitle: true, guestCompany: true },
  });

  return (
    <article className="mx-auto px-6 w-full" style={{ maxWidth: "720px" }}>

      {/* Back link */}
      <div className="pt-24 pb-10">
        <Link href="/interviews" className="inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.1em] uppercase text-fg-faint hover:text-gold transition-colors">
          <svg width={14} height={14} className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16L3 12m0 0l4-4M3 12h18" />
          </svg>
          All Interviews
        </Link>
      </div>

      {/* Guest info block */}
      <header className="pb-10 mb-10 border-b border-border">
        {/* Gold company badge */}
        <span className="inline-block text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-gold border border-gold/40 rounded-full px-3 py-1 mb-6">
          {iv.guestCompany}
        </span>

        <h1 className="font-serif text-[2.5rem] md:text-[3.25rem] text-fg leading-[1.08] mb-3">
          {iv.guestName}
        </h1>
        <p className="text-[1rem] text-fg-secondary tracking-wide">{iv.guestTitle}</p>
        {iv.publishedAt && (
          <p className="text-[0.78rem] text-fg-faint mt-3 tracking-wide">
            {new Date(iv.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        )}

        {iv.guestBio && (
          <p className="text-[0.9375rem] text-fg-muted leading-[1.8] mt-7">{iv.guestBio}</p>
        )}
      </header>

      {/* Key quote pull */}
      <div className="border-l-[3px] border-gold pl-6 py-1 mb-12">
        <p className="font-serif italic text-[1.4rem] md:text-[1.6rem] text-fg leading-[1.5]">
          &ldquo;{iv.keyQuote}&rdquo;
        </p>
        <div className="flex items-center justify-between mt-5">
          <p className="text-[0.78rem] text-fg-faint tracking-wide">{iv.guestName}</p>
          <ShareQuoteButton
            quote={iv.keyQuote}
            guestName={iv.guestName}
            guestTitle={iv.guestTitle}
            guestCompany={iv.guestCompany}
          />
        </div>
      </div>

      {/* Embed */}
      {iv.embedUrl && (
        <div className="mb-12">
          <iframe
            src={iv.embedUrl}
            className="w-full aspect-video border border-border"
            allowFullScreen
            title={`Interview with ${iv.guestName}`}
          />
        </div>
      )}

      {/* Q&A body — questions gold serif, answers white body (styled in globals.css) */}
      <div className="interview-content" dangerouslySetInnerHTML={{ __html: iv.content }} />

      {/* Share footer */}
      <div className="mt-16 pt-10 border-t border-border flex items-center justify-between">
        <p className="text-[0.875rem] text-fg-muted">Enjoyed this conversation?</p>
        <ShareQuoteButton
          quote={iv.keyQuote}
          guestName={iv.guestName}
          guestTitle={iv.guestTitle}
          guestCompany={iv.guestCompany}
        />
      </div>

      {/* Community placeholder */}
      <div className="mt-12 border border-border rounded-sm p-8 text-center">
        <p className="eyebrow mb-3">Coming Soon</p>
        <p className="font-serif text-[1.15rem] text-fg-faint">Discussion &amp; Community</p>
        <p className="text-[0.875rem] text-fg-faint mt-2">Reactions and threads — in the next version.</p>
      </div>

      {/* More interviews */}
      {moreInterviews.length > 0 && (
        <div className="mt-16 mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-border-mid" />
            <span className="eyebrow">More Conversations</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-border">
            {moreInterviews.map((m) => (
              <Link
                key={m.slug}
                href={`/interviews/${m.slug}`}
                className="group block bg-bg-card p-5 hover:bg-bg-hover transition-colors"
              >
                <p className="eyebrow mb-2">{m.guestCompany}</p>
                <p className="font-serif text-[1.05rem] text-fg group-hover:text-gold-light transition-colors leading-tight">
                  {m.guestName}
                </p>
                <p className="text-[0.75rem] text-fg-faint mt-1">{m.guestTitle}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
