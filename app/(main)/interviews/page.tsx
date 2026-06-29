import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Interviews" };
export const dynamic = "force-dynamic";

export default async function InterviewsPage() {
  const interviews = await prisma.interview.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-content mx-auto px-6 md:px-10">

      {/* Page header */}
      <div className="pt-24 pb-14 border-b border-border">
        <div className="rule-gold" />
        <h1 className="font-serif text-[2.75rem] md:text-[3.75rem] text-fg mb-4 leading-[1.1]">
          Interviews
        </h1>
        <p className="text-fg-muted text-[1rem] max-w-lg leading-[1.75]">
          Unfiltered conversations with the operators, builders, and strategists who make iGaming move.
        </p>
      </div>

      {interviews.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-serif text-[1.5rem] text-fg-faint mb-2">Coming soon</p>
          <p className="text-[0.875rem] text-fg-faint">First interviews are being prepared.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {interviews.map((iv) => (
            <Link
              key={iv.id}
              href={`/interviews/${iv.slug}`}
              className="group flex flex-col bg-bg-card hover:bg-bg-hover transition-colors duration-200 p-7"
            >
              <p className="eyebrow mb-4">{iv.guestCompany}</p>
              <h2 className="font-serif text-[1.5rem] text-fg mb-1.5 leading-tight group-hover:text-gold-light transition-colors duration-200">
                {iv.guestName}
              </h2>
              <p className="text-[0.8rem] text-fg-faint mb-6 tracking-wide">{iv.guestTitle}</p>
              <p className="text-[0.9375rem] text-fg-muted italic leading-[1.7] line-clamp-4 flex-1">
                &ldquo;{iv.keyQuote}&rdquo;
              </p>
              <div className="flex items-center justify-between mt-6">
                <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gold group-hover:text-gold-light transition-colors">
                  Read interview
                  <svg width={14} height={14} className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {iv.publishedAt && (
                  <span className="text-[0.72rem] text-fg-faint tracking-wide">
                    {new Date(iv.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="py-20" />
    </div>
  );
}
