import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-content mx-auto px-6 md:px-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 md:py-20">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif font-semibold text-xl text-fg">Disuness</span>
              <span className="font-serif font-semibold text-xl text-gold"> B</span>
              <span className="font-serif font-semibold text-xl text-fg">evelopment</span>
            </Link>
            <p className="text-fg-muted text-[0.875rem] leading-relaxed max-w-xs">
              Honest conversations with the operators, builders, and strategists who make iGaming move. No PR speak. No agenda.
            </p>
            <a
              href="https://t.me/DisunessBevelopment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[0.78rem] font-medium tracking-[0.1em] uppercase text-fg-muted hover:text-gold transition-colors"
            >
              <TelegramIcon />
              Follow on Telegram
            </a>
          </div>

          {/* Content */}
          <div>
            <p className="text-2xs font-semibold tracking-[0.18em] uppercase text-fg-faint mb-5">Content</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/interviews", label: "Interviews" },
                { href: "/insights",   label: "Insights"   },
                { href: "/about",      label: "About"      },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Participate */}
          <div>
            <p className="text-2xs font-semibold tracking-[0.18em] uppercase text-fg-faint mb-5">Participate</p>
            <nav className="flex flex-col gap-3">
              <Link href="/apply" className="text-sm text-fg-muted hover:text-fg transition-colors">
                Apply for Interview
              </Link>
              <a
                href="https://t.me/DisunessBevelopment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-muted hover:text-fg transition-colors"
              >
                Telegram Channel
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-[0.75rem] text-fg-faint">
            © {year} DisunessBevelopment.com — All rights reserved
          </p>
          <p className="text-[0.75rem] text-fg-faint">
            iGaming × Business Development
          </p>
        </div>

      </div>
    </footer>
  );
}

function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
