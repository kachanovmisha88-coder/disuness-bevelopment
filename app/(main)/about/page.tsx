import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-6 md:px-10">

      {/* Page header */}
      <div className="pt-24 pb-14 border-b border-border">
        <div className="rule-gold" />
        <h1 className="font-serif text-[2.75rem] md:text-[3.75rem] text-fg leading-[1.1]">
          Why this exists
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 py-16">

        {/* Main text */}
        <div className="max-w-reading">
          <div className="space-y-6 text-[1rem] text-fg-secondary leading-[1.85]">

            <p>
              The iGaming industry has a content problem. Everything is either fluffy conference banter,
              vendor marketing dressed up as thought leadership, or the same five talking points recycled
              at every Sigma booth.
            </p>

            <p>
              <span className="text-fg font-medium">Disuness Bevelopment</span> started as a
              personal project — a place to have the conversations I actually wanted to have with people
              I genuinely respected in the space.
            </p>

            <p>
              The kind of conversations where someone admits a deal went sideways and tells you exactly
              why. Where an affiliate head talks about what actually drives decisions, not what sounds
              good in a press release. Where a studio founder explains the part of their roadmap
              they&apos;re most nervous about.
            </p>

            {/* Pull quote */}
            <blockquote className="relative border-l-[3px] border-gold pl-6 py-1 my-10">
              <p className="font-serif italic text-[1.25rem] text-fg leading-[1.6]">
                &ldquo;If you can&apos;t say it to my face in a bar at 1am, I don&apos;t want it in the interview.&rdquo;
              </p>
            </blockquote>

            <p>
              That&apos;s the bar. Not literally — but that&apos;s the energy. Late-night industry bar, not a
              corporate blog. Real opinions. Real context. Real stakes.
            </p>

            <p>
              The project lives on{" "}
              <a
                href="https://t.me/DisunessBevelopment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light underline underline-offset-3 transition-colors"
              >
                Telegram
              </a>{" "}
              and this website. It&apos;s not a media company. It&apos;s not trying to be. It&apos;s one person
              with a microphone and a Notion doc asking questions the industry press is too polished to ask.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-10">
          <div>
            <p className="eyebrow mb-5">Who gets featured</p>
            <ul className="space-y-4">
              {[
                "BD managers who've actually closed difficult deals",
                "CMOs who can talk about what doesn't work",
                "Affiliate leads who understand both sides of the table",
                "Game studio founders post-launch, post-failure, or mid-pivot",
                "Operators who've navigated a regulatory shitstorm",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.45rem] w-1 h-1 flex-shrink-0 rounded-full bg-gold" />
                  <span className="text-[0.875rem] text-fg-muted leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-8">
            <p className="font-serif text-fg text-[1.1rem] mb-3">Think you qualify?</p>
            <p className="text-[0.8rem] text-fg-muted mb-5 leading-[1.65]">
              Apply below. No pitch deck required.
            </p>
            <Link
              href="/apply"
              className="inline-block text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-5 py-2.5 bg-gold text-black hover:bg-gold-light transition-colors"
            >
              Apply for Interview
            </Link>
          </div>
        </aside>
      </div>

      <div className="pb-20" />
    </div>
  );
}
