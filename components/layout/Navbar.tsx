"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "/interviews", label: "Interviews" },
  { href: "/blog",       label: "Blog"       },
  { href: "/insights",   label: "Insights"   },
  { href: "/about",      label: "About"      },
];

export default function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/96 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">

        {/* Logo — styled text wordmark */}
        <Link href="/" className="group" aria-label="Disuness Bevelopment — home">
          <span className="font-serif tracking-widest text-sm text-fg font-bold group-hover:text-gold-light transition-colors duration-200">
            DISUNESS BEVELOPMENT
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link text-[0.78rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                  active ? "text-fg" : "text-fg-secondary hover:text-fg"
                }`}
                style={active ? { "--tw-content": `''` } as React.CSSProperties : {}}
              >
                {l.label}
                {active && (
                  <span className="absolute bottom-[-2px] left-0 w-full h-px bg-gold block" />
                )}
              </Link>
            );
          })}

          <Link
            href="/apply"
            className="ml-2 text-[0.78rem] font-semibold tracking-[0.08em] uppercase px-5 py-2 bg-gold text-black hover:bg-gold-light transition-colors duration-200"
          >
            Apply
          </Link>

          <a
            href="https://t.me/DisunessBevelopment"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="ml-1 text-fg-secondary hover:text-gold transition-colors duration-200"
          >
            <TelegramIcon />
          </a>

          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-fg-secondary hover:text-fg transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <svg width={20} height={20} className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width={20} height={20} className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-bg border-t border-border px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-[0.12em] uppercase text-fg-secondary hover:text-fg transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border flex items-center gap-5">
            <Link
              href="/apply"
              className="inline-block text-sm font-semibold tracking-[0.08em] uppercase px-5 py-2.5 bg-gold text-black hover:bg-gold-light transition-colors"
            >
              Apply for Interview
            </Link>
            <a
              href="https://t.me/DisunessBevelopment"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-fg-secondary hover:text-gold transition-colors"
            >
              <TelegramIcon />
            </a>

            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
