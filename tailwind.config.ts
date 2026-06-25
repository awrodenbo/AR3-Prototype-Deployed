import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#fbfaf6",
        ink: "#1f2430",
        analyze: "#7c3aed",
        review: "#2563eb",
        recommend: "#16a34a",
        rebuild: "#ea580c"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(31, 36, 48, 0.09)",
        card: "0 8px 28px rgba(31, 36, 48, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
