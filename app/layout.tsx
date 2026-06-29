import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Disuness Bevelopment", template: "%s | Disuness Bevelopment" },
  description: "Honest conversations with iGaming industry leaders. No fluff, no PR speak — just raw business development insights.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://disunessbevelopment.com"),
  openGraph: {
    siteName: "Disuness Bevelopment",
    type: "website",
  },
};

// Runs before first paint to apply the saved theme and avoid a flash.
// Default is dark (the :root values) when no preference is stored.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
