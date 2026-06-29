"use client";
import { useState } from "react";

interface Props {
  quote: string;
  guestName: string;
  guestTitle: string;
  guestCompany: string;
}

export default function ShareQuoteButton({ quote, guestName, guestTitle, guestCompany }: Props) {
  const [open,   setOpen]   = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `"${quote}"\n\n— ${guestName}, ${guestTitle} at ${guestCompany}\n\nDisuness Bevelopment · t.me/DisunessBevelopment`;

  async function copy() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function tg() {
    window.open(`https://t.me/share/url?url=${encodeURIComponent("https://t.me/DisunessBevelopment")}&text=${encodeURIComponent(shareText)}`, "_blank");
  }

  function tw() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium tracking-[0.1em] uppercase text-fg-faint hover:text-gold transition-colors"
      >
        <svg width={16} height={16} className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share quote
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Panel */}
          <div className="absolute bottom-7 right-0 z-50 w-68 bg-bg-elevated border border-border-mid shadow-2xl shadow-black/60">
            <div className="p-4 border-b border-border">
              <p className="eyebrow mb-0">Share this quote</p>
            </div>

            {/* Preview card */}
            <div className="p-4 border-b border-border">
              <div className="border-l-[2px] border-gold pl-3">
                <p className="font-serif italic text-[0.8rem] text-fg leading-[1.6] line-clamp-4">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="text-[0.72rem] text-gold mt-2">{guestName}</p>
                <p className="text-[0.68rem] text-fg-faint">{guestTitle} · {guestCompany}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 grid grid-cols-3 gap-2">
              <button
                onClick={copy}
                className="py-2 text-[0.68rem] font-medium tracking-wide uppercase border border-border hover:border-gold/40 text-fg-muted hover:text-fg transition-colors"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
              <button
                onClick={tg}
                className="py-2 text-[0.68rem] font-medium tracking-wide uppercase border border-[#0088cc]/30 bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 transition-colors"
              >
                Telegram
              </button>
              <button
                onClick={tw}
                className="py-2 text-[0.68rem] font-medium tracking-wide uppercase border border-border hover:border-white/20 text-fg-muted hover:text-fg transition-colors"
              >
                𝕏&thinsp;/&thinsp;Twitter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
