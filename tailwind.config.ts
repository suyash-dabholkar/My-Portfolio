import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens — map to CSS variables so they flip on theme change */
        bg:            "var(--bg)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card":     "var(--bg-card)",
        fg:            "var(--fg)",
        "fg-muted":    "var(--fg-muted)",
        accent:        "var(--accent)",
        "accent-alt":  "var(--accent-alt)",
        "accent-glow": "var(--accent-glow)",
        border:        "var(--border)",
        "border-accent": "var(--border-accent)",
      },
      boxShadow: {
        glow:    "0 0 14px var(--accent-glow)",
        "glow-lg": "0 0 32px var(--accent-glow), 0 0 8px var(--accent-glow)",
      },
      backgroundImage: {
        "grid-dark": `
          linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};
export default config;
