import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:           "rgb(var(--bg-rgb) / <alpha-value>)",
        "bg-card":    "rgb(var(--bg-card-rgb) / <alpha-value>)",
        "bg-elevated":"rgb(var(--bg-elevated-rgb) / <alpha-value>)",
        "bg-hover":   "rgb(var(--bg-hover-rgb) / <alpha-value>)",
        gold:         "rgb(var(--gold-rgb) / <alpha-value>)",
        "gold-light": "rgb(var(--gold-light-rgb) / <alpha-value>)",
        "gold-dim":   "rgb(var(--gold-dim-rgb) / <alpha-value>)",
        border:       "rgb(var(--border-rgb) / <alpha-value>)",
        "border-mid": "rgb(var(--border-mid-rgb) / <alpha-value>)",
        fg:           "rgb(var(--fg-rgb) / <alpha-value>)",
        "fg-secondary":"rgb(var(--fg-secondary-rgb) / <alpha-value>)",
        "fg-muted":   "rgb(var(--fg-muted-rgb) / <alpha-value>)",
        "fg-faint":   "rgb(var(--fg-faint-rgb) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem", letterSpacing: "0.1em" }],
      },
      maxWidth: {
        "reading": "720px",
        "content": "1200px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
