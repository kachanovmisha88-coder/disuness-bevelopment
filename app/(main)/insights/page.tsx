import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Insights" };
export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const interviews = await prisma.interview.findMany({
    where: { published: true },
    select: { guestName: true, guestTitle: true, guestCompany: true, keyQuote: true, slug: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-content mx-auto px-6 md:px-10">

      {/* Header */}
      <div className="pt-24 pb-14 border-b border-border">
        <div className="rule-gold" />
        <h1 className="font-serif text-[2.75rem] md:text-[3.75rem] text-fg mb-4 leading-[1.1]">
          Insights
        </h1>
        <p className="text-fg-muted text-[1rem] max-w-md leading-[1.75]">
          Key quotes and takeaways from every conversation on the record.
        </p>
      </div>

      {interviews.length === 0 ? (
        <div className="py-32 text-center border-b border-border">
          <p className="eyebrow mb-4">Coming Soon</p>
          <p className="font-serif text-[1.5rem] text-fg-faint mb-2">Insights are being compiled</p>
          <p className="text-[0.875rem] text-fg-faint">Check back once the first interviews are published.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {interviews.map((iv, i) => (
            <div
              key={i}
              className="py-12 grid md:grid-cols-[1fr_180px] gap-8 items-start group"
            >
              <div>
                <p className="eyebrow mb-5">{iv.guestCompany}</p>
                <blockquote className="font-serif italic text-[1.2rem] md:text-[1.4rem] text-fg leading-[1.6] mb-6">
                  &ldquo;{iv.keyQuote}&rdquo;
                </blockquote>
                <p className="text-[0.875rem] text-gold">{iv.guestName}</p>
                <p className="text-[0.8rem] text-fg-faint mt-0.5">{iv.guestTitle}</p>
              </div>
              <div className="md:text-right">
                <Link
                  href={`/interviews/${iv.slug}`}
                  className="inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.1em] uppercase text-fg-faint hover:text-gold transition-colors"
                >
                  Full interview
                  <svg width={14} height={14} className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Newsletter placeholder */}
      <div className="border-t border-border py-20">
        <div className="max-w-md">
          <p className="eyebrow mb-4">Coming Soon</p>
          <p className="font-serif text-[1.5rem] text-fg mb-2 leading-tight">Newsletter</p>
          <p className="text-[0.875rem] text-fg-faint leading-[1.7]">
            Monthly digest of insights from all interviews, direct to your inbox.
          </p>
        </div>
      </div>
    </div>
  );
}
