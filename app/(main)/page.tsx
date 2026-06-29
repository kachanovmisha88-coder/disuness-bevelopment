import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function HomePage() {
  const latestInterviews = await prisma.interview.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 4,
    select: { id: true, slug: true, guestName: true, guestTitle: true, guestCompany: true, keyQuote: true, publishedAt: true },
  });

  const [featured, ...rest] = latestInterviews;

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_60%_-10%,rgba(201,168,76,0.07),transparent)]" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <span className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 font-serif leading-none text-fg/[0.018] select-none pointer-events-none" style={{ fontSize: "22rem" }}>
          DB
        </span>

        <div className="relative max-w-content mx-auto px-6 md:px-10 w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold" />
            <span className="eyebrow">iGaming × Business Development</span>
          </div>

          <h1 className="font-serif font-semibold text-fg leading-[1.05] tracking-[-0.02em] mb-8 max-w-4xl fade-up" style={{ fontSize: "clamp(2.5rem, 7vw, 5.75rem)" }}>
            No PR speak.<br />
            No&nbsp;<em className="text-gold not-italic">fluff.</em><br />
            Just the real&nbsp;talk.
          </h1>

          <p className="text-fg-muted max-w-xl leading-[1.75] mb-12 fade-up fade-up-d1" style={{ fontSize: "1.0625rem" }}>
            Deep conversations with the people actually building, running, and scaling iGaming —
            BD leads, studio founders, affiliate heads, and CMOs who don&apos;t speak in buzzwords.
          </p>

          <div className="flex flex-wrap items-center gap-4 fade-up fade-up-d2">
            <Link
              href="/interviews"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-black text-[0.8rem] font-semibold tracking-[0.08em] uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Read Interviews
              <ArrowRight />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border-mid text-fg-secondary text-[0.8rem] font-semibold tracking-[0.08em] uppercase hover:border-gold/50 hover:text-gold transition-colors duration-200"
            >
              Apply to be Featured
            </Link>
            <a
              href="https://t.me/DisunessBevelopment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-[0.8rem] font-medium tracking-[0.06em] uppercase text-fg-faint hover:text-fg-secondary transition-colors duration-200"
            >
              <TelegramIcon />
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* ─── Featured interview (text only) ───────────────────────────── */}
      {featured && (
        <section className="border-t border-border">
          <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-border-mid" />
                <span className="eyebrow">Latest Conversation</span>
              </div>
              <Link href="/interviews" className="text-[0.78rem] font-medium tracking-[0.08em] uppercase text-fg-faint hover:text-gold transition-colors">
                All interviews →
              </Link>
            </div>

            <Link href={`/interviews/${featured.slug}`} className="group block interview-card p-10 md:p-14">
              <p className="eyebrow mb-6">{featured.guestCompany}</p>
              <h2 className="font-serif text-[2rem] md:text-[2.75rem] text-fg leading-[1.15] mb-2 group-hover:text-gold-light transition-colors duration-300">
                {featured.guestName}
              </h2>
              <p className="text-[0.875rem] text-fg-faint mb-10 tracking-wide">{featured.guestTitle}</p>
              <p className="font-serif italic text-[1.15rem] md:text-[1.3rem] text-fg-secondary leading-[1.7] max-w-2xl mb-12 border-l-2 border-gold/40 pl-5">
                &ldquo;{featured.keyQuote}&rdquo;
              </p>
              <span className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.1em] uppercase text-gold group-hover:text-gold-light transition-colors">
                Read interview
                <ArrowRight />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ─── More interviews grid (text only) ─────────────────────────── */}
      {rest.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-border-mid" />
              <span className="eyebrow">More Conversations</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {rest.map((iv) => (
                <Link
                  key={iv.id}
                  href={`/interviews/${iv.slug}`}
                  className="group block bg-bg-card p-7 hover:bg-bg-hover transition-colors duration-200"
                >
                  <p className="eyebrow mb-4">{iv.guestCompany}</p>
                  <h3 className="font-serif text-[1.25rem] text-fg mb-1.5 leading-tight group-hover:text-gold-light transition-colors duration-200">
                    {iv.guestName}
                  </h3>
                  <p className="text-[0.8rem] text-fg-faint mb-5 tracking-wide">{iv.guestTitle}</p>
                  <p className="text-[0.875rem] text-fg-muted italic leading-[1.65] line-clamp-3">
                    &ldquo;{iv.keyQuote}&rdquo;
                  </p>
                  {iv.publishedAt && (
                    <p className="text-[0.72rem] text-fg-faint mt-5 tracking-wide">
                      {new Date(iv.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Apply CTA ─────────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-xl">
            <div className="rule-gold" />
            <h2 className="font-serif text-[2.25rem] md:text-[3rem] text-fg mb-5 leading-[1.15]">
              Think you have something real to say?
            </h2>
            <p className="text-fg-muted text-[1rem] leading-[1.75] mb-10">
              We talk to people with actual opinions and hard-won experience in iGaming.
              If that sounds like you — no pitch deck required.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-gold text-black text-[0.8rem] font-semibold tracking-[0.08em] uppercase hover:bg-gold-light transition-colors"
            >
              Apply for Interview
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg width={16} height={16} className={`w-4 h-4 shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
