import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm">
        <div className="rule-gold" />
        <p className="font-serif text-[6rem] text-[#1a1a1a] leading-none mb-4 select-none">404</p>
        <h1 className="font-serif text-[1.75rem] text-fg mb-3 leading-tight">Page not found</h1>
        <p className="text-[0.875rem] text-fg-muted mb-8 leading-[1.7]">
          This page doesn&apos;t exist. Maybe the interview was pulled — or the URL is wrong.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.08em] uppercase px-5 py-2.5 bg-gold text-black hover:bg-gold-light transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
