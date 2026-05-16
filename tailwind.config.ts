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
        ink: "#070914",
        panel: "#10131f",
        line: "#24293a",
        acid: "#67f8c4",
        shock: "#7c5cff",
        flare: "#ffbf47"
      },
      boxShadow: {
        glow: "0 0 45px rgba(103, 248, 196, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
