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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "custom-white": "#e8e8e8",
      },
      color: {
        "custom-white": "#e8e8e8",
      },
      fontFamily: {
        monoton: ["var(--font-monoton)"],
        bodoniModa: ["var(--font-bodoni-moda)"],
        permaMarker: ["var(--font-permanent-marker)"],
      },
    },
  },
  plugins: [],
};
export default config;
